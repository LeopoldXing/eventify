import {IEvent} from "@/lib/database/models/event.model";
import EventCard from "@/components/EventCard";
import Pagination from "@/components/Pagination";

type CollectionProps = {
  itemList: IEvent[],
  fallbackTitle: string,
  fallbackSubText: string,
  collectionType?: "all_event" | "events_organized" | "my_tickets",
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string
}

const Collection = async ({itemList, fallbackTitle, fallbackSubText, collectionType, limit, page, totalPages = 0, urlParamName}: CollectionProps) => {
  return (
      <>
        {(Array.isArray(itemList) && itemList.length > 0) ? (
            <div className="flex flex-col items-center gap-10">
              <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                {itemList.map(event => (
                    <li key={event._id} className="flex justify-center">
                      <EventCard event={event} hasOrderLink={collectionType === "events_organized"} hidePrice={collectionType === "my_tickets"}/>
                    </li>
                ))}
              </ul>
              {totalPages > 1 && (<Pagination page={Number(page)} totalPages={totalPages} urlParamName={urlParamName}/>)}
            </div>
        ) : (
            <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
              <h3 className="p-bold-20 md:h5-bold">{fallbackTitle}</h3>
              <p className="p-regular-14">{fallbackSubText}</p>
            </div>
        )}
      </>
  );
};

export default Collection;
