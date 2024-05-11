import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Collection from "@/components/Collection";
import {auth} from "@clerk/nextjs/server";
import {getEventsByUser} from "@/lib/actions/event.actions";

const ProfilePage = async () => {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;

  const organizedEventList = await getEventsByUser({userId, page: 1});

  return (
      <>
        {/*  my tickets  */}
        <div className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <div className="wrapper flex items-center justify-center sm:justify-between">
            <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
            <Button asChild size="lg" className="button hidden sm:flex">
              <Link href="/#events">
                Explore More Events
              </Link>
            </Button>
          </div>
        </div>
        <div className="">
          <Collection itemList={[]} collectionType="my_tickets" fallbackTitle="No event tickets purchased yet" urlParamName="orderPage"
                      fallbackSubText="No worries - plenty of exciting events to explore!" page={1} limit={6} totalPage={2}/>
        </div>
        {/*  event organized  */}
      </>
  );
};

export default ProfilePage;
