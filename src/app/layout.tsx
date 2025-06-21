import { useState } from "react";
import type { Metadata } from "next";
import { Space_Grotesk, Sora } from 'next/font/google';
import Script from "next/script";
import "./globals.css";
import "./variables.css"

import Navbar from '@/app/components/layout/navbar/Navbar'
import Bio from '@/app/components/layout/bio/Bio'

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
      <body className="content-wrapper">
          <Navbar />
          <main className='layout-wrapper'>
          <div className='layout-left'>
            <Bio />
          </div>
          <div className="layout-right">
            {children}
          </div>
        </main>
        <Script
          src="https://kit.fontawesome.com/ad03dfc62c.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
