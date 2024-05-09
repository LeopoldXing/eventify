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
        <Link href={`/events/${event._id}`} style={{backgroundImage: `url(${event.imageUrl})`}}
              className="flex items-center justify-between flex-grow bg-gray-50 bg-cover bg-center text-gray-500"/>

      </div>
  );
};

export default EventCard;
