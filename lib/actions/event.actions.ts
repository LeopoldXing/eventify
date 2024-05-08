"use server";

import {CreateEventParams} from "@/types";
import {handleError} from "@/lib/utils";
import {connectToDatabase} from "@/lib/database";
import User from "@/lib/database/models/user.model";
import Event from "@/lib/database/models/event.model";

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

export {createEvent};
