import {IEvent} from "@/lib/database/models/event.model";
import {getAllEvents} from "@/lib/actions/event.actions";

type CollectionProps = {
  itemList: IEvent[],
  fallbackTitle: string,
  fallbackSubText: string,
  collectionType?: "all_event" | "events_organized" | "my_tickets",
  limit: number,
  page: number | string,
  totalPage?: number,
  urlParamName?: string
}

const EventCollection = async ({itemList, fallbackTitle, fallbackSubText, collectionType, limit, page, totalPage = 0, urlParamName}: CollectionProps) => {
  const allEventList = await getAllEvents({query: "", category: "", page: 1, limit: 6});

  console.log("allEventList -> ");
  console.log(allEventList);

  return (
      <div></div>
  );
};

export default EventCollection;
