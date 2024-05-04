import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 10;

const RootPage = () => {
  return (
      <>
        {/*  Host, Connect, Celebrate: Your Events, Our Platform  */}
        <div className="w-full px-4 bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
          <div className="w-full max-w-7xl grid grid-cols-1 gap-5 md:grid-cols-2 md:px-10 md:space-x-8 lg:mx-auto 2xl:gap-0">
            <div className="flex flex-col justify-center space-y-8">
              <h1 className="h1-bold">Host, Connect, Celebrate: Your Events, Our Platform</h1>
              <p className="p-regular-20 md:p-regular-24">Book and learn helpful tips from 3,168+ mentors in world-class companies with our global
                community.</p>
              <Button size="lg" asChild className="w-full py-6 rounded-full text-center md:w-fit">
                <Link href="#events">
                  Explore Now
                </Link>
              </Button>
            </div>
            <Image src="/assets/images/hero.png" alt="Eventify Hero Image" width={1000} height={1000}
                   className="max-h-[70vh] p-4 object-contain object-center 2xl:max-h-[50vh]"/>
          </div>
        </div>

        {/*  Trust by Thousands of Events  */}
        <div className="w-full max-w-7xl my-8 px-4 flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-12 md:px-10 lg:mx-auto">
          <h2 className="h2-bold w-full">Trust by <br/> Thousands of Events</h2>
          <div className="w-full flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
            Search
            CategoryFilter
          </div>
        </div>
      </>
  );
}

export default RootPage;
