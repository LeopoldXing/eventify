import React from 'react';
import {SearchParamProps} from "@/types";
import {getEventDetailsById} from "@/lib/actions/event.actions";

const EventDetailsPage = async ({params: {id}}: SearchParamProps) => {
  const event = await getEventDetailsById(id);

  return (
      <div>
        EventDetailPage
      </div>
  );
};

export default EventDetailsPage;
