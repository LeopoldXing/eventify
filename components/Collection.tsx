import {IEvent} from "@/lib/database/models/event.model";
import EventCard from "@/components/EventCard";

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

const Collection = async ({itemList, fallbackTitle, fallbackSubText, collectionType, limit, page, totalPage = 0, urlParamName}: CollectionProps) => {
  console.log("itemList -> ")
  console.log(itemList);

  return (
      <>
        {Array.isArray(itemList) && itemList.length > 1 && (
            <div className="flex flex-col items-center space-y-10">
              <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-7 xl:gap-10 2xl:max-w-7xl">
                {itemList.map(event => (
                    <li key={event._id}>
                      <EventCard event={event} hasOrderLink={collectionType === "events_organized"} hidePrice={collectionType === "my_tickets"}/>
                    </li>
                ))}
              </ul>
            </div>
        )}
        {(!Array.isArray(itemList) || itemList.length === 0) && (
            <div className="py-28 flex flex-col space-y-8 justify-center text-center bg-grey-50 min-h-72">
              <h3 className="p-bold-20 md:h5-bold">{fallbackTitle}</h3>
              <p className="p-regular-14">{fallbackSubText}</p>
            </div>
        )}
      </>
  );
};

export default Collection;
