import type { Metadata } from "next";
import { Space_Grotesk, Sora } from 'next/font/google';
import "./globals.css";
import "./variables.css"

import Navbar from '@/app/components/layout/navbar/Navbar'
import { useState } from "react";

import { ThemeProvider } from '@/app/providers/ThemeProvider';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-grotesk'
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-sora'
});

export const metadata: Metadata = {
  title: "Jordan Schulte",
  description: "Jordan Schulte's portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={`${sora.variable} ${spaceGrotesk.variable}`}>
      <body
        className={`content-wrapper`}
      >
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>
        {children}
      </body>
    </html>
  );
}
