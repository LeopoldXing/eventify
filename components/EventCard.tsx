import React from 'react';
import {IEvent} from "@/lib/database/models/event.model";
import Link from "next/link";

type EventCardProps = {
  event: IEvent,
  hasOrderLink?: boolean,
  hidePrice?: boolean
}

const EventCard = ({event, hasOrderLink, hidePrice}: EventCardProps) => {

  return (
      <div className="group w-full min-h-[380px] max-w-[400px] flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all md:min-h-[438px]
                      hover:shadow-lg">
        {/*  event cover  */}
        <Link href={`/events/${event._id}`} style={{backgroundImage: `url(${event.imageUrl})`}}
              className="flex items-center justify-between flex-grow bg-gray-50 bg-cover bg-center text-gray-500"/>
        {/*  event info  */}
        <Link href={`/events/${event._id}`} className="p-5 min-h-[230px] flex flex-col space-y-3 md:space-y-4">
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
            {event.isFree ? 'FREE' : `$${event.price}`}
          </span>
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {event.category.name}
            </p>
          </div>
        </Link>
      </div>
  );
};

export default EventCard;
