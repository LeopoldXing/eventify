"use client";

import React from 'react';
import {headerLinks} from "@/constants";
import Link from "next/link";
import {usePathname} from "next/navigation";

const HeaderNavItems = () => {
  const pathname = usePathname();

  return (
      <ul className="flex flex-col space-x-0 space-y-6 justify-start items-start md:flex-row md:justify-between md:items-center md:space-y-0">
        {Array.isArray(headerLinks) && headerLinks.map(link => (
            <li key={link.label} className={`${pathname === link.route && "text-primary-500"} flex items-center justify-center whitespace-nowrap`}>
              <Link href={link.route}>{link.label}</Link>
            </li>
        ))}
      </ul>
  );
};

export default HeaderNavItems;
