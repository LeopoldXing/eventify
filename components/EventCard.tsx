import React from 'react';
import {IEvent} from "@/lib/database/models/event.model";
import Link from "next/link";
import {formatDateTime} from "@/lib/utils";
import Image from 'next/image';
import {auth} from "@clerk/nextjs/server";

type EventCardProps = {
  event: IEvent,
  hasOrderLink?: boolean,
  hidePrice?: boolean
}

const EventCard = ({event, hasOrderLink, hidePrice}: EventCardProps) => {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = userId === event.organizer._id.toString();

  return (
      <div className="group w-full min-h-[380px] max-w-[400px] flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all md:min-h-[438px]
                      hover:shadow-lg">
        {/*  event cover  */}
        <Link href={`/events/${event._id}`} style={{backgroundImage: `url(${event.imageUrl})`}}
              className="flex items-center justify-between flex-grow bg-gray-50 bg-cover bg-center text-gray-500"/>

        {isEventCreator && !hidePrice && (
            <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
              <Link href={`/events/${event._id}/update`}>
                <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20}/>
              </Link>
            </div>
        )}

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

          <p className="p-medium-16 p-medium-18 text-grey-500">
            {formatDateTime(event.startDateTime).dateTime}
          </p>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{event.title}</p>
          <div className="flex-between w-full">
            <p className="p-medium-14 md:p-medium-16 text-grey-600">
              {event.organizer.firstName} {event.organizer.lastName}
            </p>

            {hasOrderLink && (
                <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
                  <p className="text-primary-500">Order Details</p>
                  <Image src="/assets/icons/arrow.svg" alt="search" width={10} height={10}/>
                </Link>
            )}
          </div>
        </Link>
      </div>
  );
};

export default EventCard;
