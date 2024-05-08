"use server";

import {CreateEventParams} from "@/types";
import {handleError} from "@/lib/utils";
import {connectToDatabase} from "@/lib/database";
import User from "@/lib/database/models/user.model";
import Event from "@/lib/database/models/event.model";
import Category from "@/lib/database/models/category.model";

/**
 * create a new event
 * @param event
 * @param userId
 * @param path
 */
const createEvent = async ({event, userId, path}: CreateEventParams) => {
  try {
    await connectToDatabase();

    // find the organizer
    const organizer = await User.findById(userId);
    // organizer doesn't exist
    if (!organizer) {
      throw new Error("organizer not found");
    }

    const newEvent = await Event.create({...event, category: event.categoryId, organizer: userId});

    return JSON.parse(JSON.stringify(newEvent));
  } catch (e) {
    handleError(e);
  }
}

/**
 * get event details from database by eventId
 * @param eventId
 */
const getEventDetailsById = async (eventId: string) => {
  try {
    await connectToDatabase();

    const event = await Event.findById(eventId)
        .populate({path: "category", model: Category, select: "_id name"})
        .populate({path: "organizer", model: User, select: "_id firstName lastName"});

    return JSON.parse(JSON.stringify(event));
  } catch (e) {
    handleError(e);
  }
}

export {createEvent, getEventDetailsById};
