"use server";

import {CreateEventParams, DeleteEventParams, GetAllEventsParams, GetEventsByUserParams, GetRelatedEventsByCategoryParams, UpdateEventParams} from "@/types";
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
    await connectToDatabase()

    const titleCondition = query ? {title: {$regex: query, $options: 'i'}} : {}
    const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      $and: [titleCondition, categoryCondition ? {category: categoryCondition._id} : {}],
    }

    const skipAmount = (Number(page) - 1) * limit
    const events = await Event.find(conditions).sort({createdAt: 'desc'}).skip(skipAmount).limit(limit)
        .populate({path: "category", model: Category, select: "_id name"})
        .populate({path: "organizer", model: User, select: "_id firstName lastName"});

    const eventsCount = await Event.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

/**
 * update event by id
 * @param userId
 * @param event
 * @param path
 */
const updateEvent = async ({userId, event, path}: UpdateEventParams) => {
  try {
    await connectToDatabase();

    const eventToUpdate = await Event.findById(event._id)
    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error('Unauthorized or event not found')
    }

    const updatedEvent = await Event.findByIdAndUpdate(event._id, {...event, category: event.categoryId});
    if (!updatedEvent) {
      throw new Error("update failed");
    } else {
      revalidatePath(path);
    }

    return JSON.parse(JSON.stringify(updatedEvent));
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

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (deletedEvent) {
      revalidatePath(path);
    }

    return JSON.parse(JSON.stringify(deletedEvent));
  } catch (e) {
    handleError(e);
  }
};

const getCategoryByName = async (name: string) => {
  return Category.findOne({name: {$regex: name, $options: 'i'}})
}

// GET ALL EVENTS
const getAllEventsByConditions = async ({query, limit = 6, page, category}: GetAllEventsParams) => {
  try {
    await connectToDatabase()

    const titleCondition = query ? {title: {$regex: query, $options: 'i'}} : {}
    const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      $and: [titleCondition, categoryCondition ? {category: categoryCondition._id} : {}],
    }

    const skipAmount = (Number(page) - 1) * limit
    const events = await Event.find(conditions).sort({createdAt: 'desc'}).skip(skipAmount).limit(limit)
        .populate({path: "category", model: Category, select: "_id name"})
        .populate({path: "organizer", model: User, select: "_id firstName lastName"});

    const eventsCount = await Event.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
};

// GET EVENTS BY ORGANIZER
const getEventsByUser = async ({userId, limit = 6, page}: GetEventsByUserParams) => {
  try {
    await connectToDatabase()

    const conditions = {organizer: userId}
    const skipAmount = (page - 1) * limit

    const events = await Event.find(conditions).sort({createdAt: 'desc'}).skip(skipAmount).limit(limit)
        .populate({path: "category", model: Category, select: "_id name"})
        .populate({path: "organizer", model: User, select: "_id firstName lastName"});

    const eventsCount = await Event.countDocuments(conditions)

    return {data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit)}
  } catch (error) {
    handleError(error)
  }
};

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
const getRelatedEventsByCategory = async ({categoryId, eventId, limit = 3, page = 1}: GetRelatedEventsByCategoryParams) => {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = {$and: [{category: categoryId}, {_id: {$ne: eventId}}]}

    const events = await Event.find(conditions).sort({createdAt: 'desc'}).skip(skipAmount).limit(limit)
        .populate({path: "category", model: Category, select: "_id name"})
        .populate({path: "organizer", model: User, select: "_id firstName lastName"});

    const eventsCount = await Event.countDocuments(conditions)

    return {data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit)}
  } catch (error) {
    handleError(error)
  }
}

export {createEvent, getEventDetailsById, getAllEvents, deleteEvent, getRelatedEventsByCategory, getEventsByUser, getAllEventsByConditions, updateEvent};
