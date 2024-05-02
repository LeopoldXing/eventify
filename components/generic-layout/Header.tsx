import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import MobileNav from "@/components/mobile/MobileNav";
import HeaderNavItems from "@/components/generic-layout/HeaderNavItems";

const Header = () => {
  return (
      <header className="w-full border-b">
        <div className="flex flex-row items-center justify-between w-full max-w-7xl p-5 md:px-10 xl:px-0 lg:mx-auto">
          {/*  left side logo  */}
          <Link href="/" className="w-36">
            <Image src="/assets/images/logo.svg" alt="Eventify Logo" height={38} width={128}></Image>
          </Link>

          {/*  middle nav  */}
          <SignedIn>
            <nav className="hidden md:flex-between w-full max-w-xs">
              <HeaderNavItems/>
            </nav>
          </SignedIn>

          {/*  right side  SignOut | Login  */}
          <div className="flex w-32 justify-end gap-3">
            <SignedOut>
              <Button size="lg" asChild className="rounded-full">
                <Link href="/sign-in">Login</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/"/>
              {/*  mobile navbar  */}
              <MobileNav/>
            </SignedIn>
          </div>
        </div>
      </header>
  );
};

export default Header;
