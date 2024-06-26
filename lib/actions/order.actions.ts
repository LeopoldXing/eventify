"use server"

import {CheckoutOrderParams, CreateOrderParams, GetOrdersByEventParams, GetOrdersByUserParams} from "@/types";
import {redirect} from "next/navigation";
import {handleError} from "@/lib/utils";
import {connectToDatabase} from "@/lib/database";
import Order from "@/lib/database/models/order.model";
import Event from '@/lib/database/models/event.model';
import {ObjectId} from 'mongodb';
import User from '@/lib/database/models/user.model';

const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const price = order.isFree ? 0 : Number(order.price) * 100;

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: order.eventTitle
            }
          },
          quantity: 1
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });
  } catch (e) {
    handleError(e);
  } finally {
    redirect(session.url!);
  }
}

const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();
    const newOrder = Order.create({...order, event: order.eventId, buyer: order.buyerId});

    return JSON.parse(JSON.stringify(newOrder));
  } catch (e) {
    handleError(e);
  }
}

// GET ORDERS BY EVENT
const getOrdersByEvent = async ({searchString, eventId}: GetOrdersByEventParams) => {
  try {
    await connectToDatabase()

    if (!eventId) throw new Error('Event ID is required')
    const eventObjectId = new ObjectId(eventId)

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyer',
        },
      },
      {
        $unwind: '$buyer',
      },
      {
        $lookup: {
          from: 'events',
          localField: 'event',
          foreignField: '_id',
          as: 'event',
        },
      },
      {
        $unwind: '$event',
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: '$event.title',
          eventId: '$event._id',
          buyer: {
            $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
          },
        },
      },
      {
        $match: {
          /*$and: [{eventId: eventObjectId}, {buyer: {$regex: RegExp(searchString, 'i')}}],*/
          $and: [{eventId: eventObjectId}],
        },
      },
    ])

    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    handleError(error)
  }
};

// GET ORDERS BY USER
const getOrdersByUser = async ({userId, limit = 3, page}: GetOrdersByUserParams) => {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = {buyer: userId}

    const orders = await Order.distinct('event._id')
        .find(conditions)
        .sort({createdAt: 'desc'})
        .skip(skipAmount)
        .limit(limit)
        .populate({
          path: 'event',
          model: Event,
          populate: {
            path: 'organizer',
            model: User,
            select: '_id firstName lastName',
          }
        })

    const ordersCount = await Order.distinct('event._id').countDocuments(conditions)

    return {data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit)}
  } catch (error) {
    handleError(error)
  }
};

export {checkoutOrder, createOrder, getOrdersByUser, getOrdersByEvent};
