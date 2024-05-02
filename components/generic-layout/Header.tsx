import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";

const Header = () => {
  return (
      <header className="flex flex-row items-center justify-between px-6 py-4">
        {/*  左侧 logo  */}
        <Link href="/">
          <div className="flex flex-row items-center justify-center">
            <Image src="/assets/images/logo.svg" alt="Eventify Logo" height={38} width={128}></Image>
          </div>
        </Link>

        {/*  右侧 退出登录 | 登录  */}
        <SignedOut>
          <Button size="lg" asChild className="rounded-full">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/"/>
        </SignedIn>
      </header>
  );
};

export default Header;
