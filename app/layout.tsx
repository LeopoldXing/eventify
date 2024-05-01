import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import React from "react";

const poppins = Poppins({subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins"});

export const metadata: Metadata = {
  title: "Eventify",
  description: "Browse the events matter to you"
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="en">
      <body className={poppins.className}>{children}</body>
      </html>
  );
}
