"use server";

import {CreateEventParams, DeleteEventParams, GetAllEventsParams} from "@/types";
import {handleError} from "@/lib/utils";
import {connectToDatabase} from "@/lib/database";
import User from "@/lib/database/models/user.model";
import Event from "@/lib/database/models/event.model";
import Category from "@/lib/database/models/category.model";
import {revalidatePath} from "next/cache";

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

/**
 * get all events according to the params
 * @param query
 * @param limit
 * @param page
 * @param category
 */
const getAllEvents = async ({query, limit = 6, page, category}: GetAllEventsParams) => {
  try {
    await connectToDatabase();

    /*  defining the conditions  */
    let conditions = {};

    /*  get events  */
    const events = await Event.find(conditions).sort({createdAt: "descending"}).limit(limit).skip(0)
        .populate({path: "category", model: Category, select: "_id name"})
        .populate({path: "organizer", model: User, select: "_id firstName lastName"});
    const count = await Event.countDocuments(conditions);

    /*  return results  */
    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(events.length / count)
    }
  } catch (e) {
    handleError(e);
  }
}

/**
 * delete event by id
 * @param eventId
 * @param path the path that needs to be revalidated after event deletion.
 */
const deleteEvent = async ({eventId, path}: DeleteEventParams) => {
  try {
    await connectToDatabase();

    const conditions = {
      eventId: eventId,
      path: path
    }

    const deletedEvent = await Event.deleteOne(conditions);

    if (deletedEvent) {
      revalidatePath(path);
    }

    return JSON.parse(JSON.stringify(deletedEvent));
  } catch (e) {
    handleError(e);
  }
};

export {createEvent, getEventDetailsById, getAllEvents, deleteEvent};
