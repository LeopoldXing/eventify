import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Collection from "@/components/Collection";
import {auth} from "@clerk/nextjs/server";
import {getEventsByUser} from "@/lib/actions/event.actions";
import {getOrdersByUser} from "@/lib/actions/order.actions";
import {IOrder} from "@/lib/database/models/order.model";
import {SearchParamProps} from "@/types";

const ProfilePage = async ({searchParams}: SearchParamProps) => {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const organizedEventList = await getEventsByUser({userId, page: eventsPage});
  const orderList = await getOrdersByUser({userId: userId, page: ordersPage});
  const orderedEventList = orderList?.data.map((order: IOrder) => order.event) || [];

  return (
      <>
        {/*  my tickets  */}
        <div className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <div className="wrapper flex items-center justify-center sm:justify-between">
            <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
            <Button asChild size="lg" className="button hidden sm:flex">
              <Link href="/#events">Explore More Events</Link>
            </Button>
          </div>
        </div>
        <div className="wrapper my-8">
          <Collection itemList={orderedEventList} collectionType="my_tickets" fallbackTitle="No event tickets purchased yet" urlParamName="orderPage"
                      fallbackSubText="No worries - plenty of exciting events to explore!" page={ordersPage} limit={6} totalPage={orderList?.totalPages}/>
        </div>

        {/*  event organized  */}
        <div className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <div className="wrapper flex items-center justify-center sm:justify-between">
            <h3 className='h3-bold text-center sm:text-left'>Event Organized</h3>
            <Button asChild size="lg" className="button hidden sm:flex">
              <Link href="/events/create">Create New Event</Link>
            </Button>
          </div>
        </div>
        <div className="wrapper my-8">
          <Collection itemList={organizedEventList?.data} collectionType="events_organized" fallbackTitle="No events have been created yet"
                      urlParamName="orderPage" fallbackSubText="Go create some now" page={eventsPage} limit={6} totalPage={orderedEventList?.totalPages}/>
        </div>
      </>
  );
};

export default ProfilePage;
