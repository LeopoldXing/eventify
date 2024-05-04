import EventForm from "@/components/form/EventForm";
import {auth} from "@clerk/nextjs/server";

const CreateEventPage = () => {
  const userId = auth()?.userId as string;

  return (
      <>
        {/*  create event title  */}
        <div className="w-full bg-primary-50 bg-dotted-pattern bg-cover bg-center">
          <h3 className="w-full max-w-7xl p-5 h3-bold text-center md:text-left md:px-10 lg:mx-auto xl:px-0">Create Event</h3>
        </div>

        {/*  create event form  */}
        <div className="w-full max-w-7xl p-8 md:px-10 lg:mx-auto xl:px-0">
          <EventForm userId={userId} type="create"/>
        </div>
      </>
  );
};

export default CreateEventPage;
