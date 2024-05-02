import React from 'react';

import Image from 'next/image';
import Link from "next/link";

const Footer = () => {
  return (
      <footer className="w-full border-t">
        <div className="max-w-7xl p-5 md:px-10 xl:px-0 lg:mx-auto flex flex-col justify-center items-center space-x-0 space-y-4 md:flex-row md:justify-between">
          <Link href="/">
            <Image src="/assets/images/logo.svg" alt="Eventify Logo" width={128} height={38}/>
          </Link>
          <p>&copy; 2024 Eventify. All Rights Reserved</p>
        </div>
      </footer>
  );
};

export default Footer;
