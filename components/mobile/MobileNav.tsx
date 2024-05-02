import React from 'react';

import {Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet";
import Image from "next/image";
import {Separator} from "@/components/ui/separator";
import HeaderNavItems from "@/components/generic-layout/HeaderNavItems";

const MobileNav = () => {
  return (
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <Image src="/assets/icons/menu.svg" alt="menu" width={24} height={24} className="cursor-pointer"/>
          </SheetTrigger>
          <SheetContent className="flex flex-col space-y-4 justify-start items-start bg-white">
            <Image src="/assets/images/logo.svg" alt="logo" height={38} width={128}/>
            <Separator className="border border-gray-50"/>
            <HeaderNavItems/>
          </SheetContent>
        </Sheet>

      </div>
  );
};

export default MobileNav;
