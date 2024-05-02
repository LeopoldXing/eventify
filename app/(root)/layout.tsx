import React from 'react';
import Header from "@/components/generic-layout/Header";
import Footer from "@/components/generic-layout/Footer";

const RootLayout = ({children}: Readonly<{ children: React.ReactNode }>) => {
  return (
      <div className="flex flex-col h-screen">
        <main className="flex-1">
          <Header/>
          {children}
          <Footer/>
        </main>
      </div>
  );
};

export default RootLayout;
