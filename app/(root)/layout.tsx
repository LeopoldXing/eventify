import React from 'react';
import Header from "@/components/generic-layout/Header";
import Footer from "@/components/generic-layout/Footer";

const RootLayout = ({children}: Readonly<{ children: React.ReactNode }>) => {
  return (
      <main className="flex flex-col min-h-screen justify-start items-center">
        <Header/>
        {children}
        <Footer/>
      </main>
  );
};

export default RootLayout;
