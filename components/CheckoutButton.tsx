"use client"

import React from 'react';
import {SignedIn, SignedOut, useUser} from "@clerk/nextjs";
import {IEvent} from "@/lib/database/models/event.model";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Checkout from "@/components/Checkout";

const CheckoutButton = ({event}: { event: IEvent }) => {
  const {user} = useUser();
  const userId = user?.publicMetadata.userId as string;
  const eventFinished = new Date(event.endDateTime) < new Date();

  return (
      <div className="flex items-center gap-3">
        {eventFinished ? (
            <p className="p-2 text-red-400">Sorry, tickets are no longer available.</p>
        ) : (
            <>
              <SignedOut>
                <Button className="button rounded-full" size="lg" asChild>
                  <Link href="/sign-in">Get Tickets</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Checkout event={event} userId={userId}></Checkout>
              </SignedIn>
            </>
        )}
      </div>
  );
};

export default CheckoutButton;
