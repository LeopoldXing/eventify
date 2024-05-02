import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import React from "react";
import {ClerkProvider} from "@clerk/nextjs";

const poppins = Poppins({subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins"});

export const metadata: Metadata = {
  title: "Eventify",
  description: "Browse the events matter to you"
};

export default function ProjectLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
      <ClerkProvider>
        <html lang="en">
        <body className={poppins.className}>{children}</body>
        </html>
      </ClerkProvider>
  );
}
