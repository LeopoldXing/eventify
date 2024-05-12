import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Collection from "@/components/Collection";
import {getAllEvents} from "@/lib/actions/event.actions";
import Search from "@/components/Search";
import {SearchParamProps} from "@/types";
import CategoryFilter from "@/components/CategoryFilter";

export const revalidate = 10;

const RootPage = async ({searchParams}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const events = await getAllEvents({
    query: searchText,
    category: category,
    page: page,
    limit: 6
  });

  return (
      <>
        {/*  Host, Connect, Celebrate: Your Events, Our Platform  */}
        <div className="w-full px-4 bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
          <div className="w-full max-w-7xl grid grid-cols-1 gap-5 md:grid-cols-2 md:px-10 md:space-x-8 lg:mx-auto 2xl:gap-0">
            <div className="flex flex-col justify-center space-y-8">
              <h1 className="h1-bold">Host, Connect, Celebrate: Your Events, Our Platform</h1>
              <p className="p-regular-20 md:p-regular-24">Book and learn helpful tips from 3,168+ mentors in world-class companies with our global
                community.
              </p>
              <Button size="lg" asChild className="w-full py-6 rounded-full text-center md:w-fit">
                <Link href="#events">Explore Now</Link>
              </Button>
            </div>
            <Image src="/assets/images/hero.png" alt="Eventify Hero Image" width={1000} height={1000}
                   className="max-h-[70vh] p-4 object-contain object-center 2xl:max-h-[50vh]"/>
          </div>
        </div>

        {/*  Trust by Thousands of Events  */}
        <div className="wrapper my-8 flex flex-col gap-8 md:gap-12">
          <h2 className="h2-bold">Trust by <br/> Thousands of Events</h2>
          <div className="w-full flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
            <Search placeholder="Search Title"/>
            <CategoryFilter/>
          </div>
          <Collection itemList={events?.data} fallbackTitle="Something is wrong" fallbackSubText="fallbackSubText" collectionType="all_event" limit={6}
                      page={page} totalPages={events?.totalPages}/>
        </div>
      </>
  );
}

export default RootPage;
