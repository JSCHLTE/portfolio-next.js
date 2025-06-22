import { Space_Grotesk, Sora } from 'next/font/google';
import Script from "next/script";
import { AuthProvider } from '@/app/providers/AuthProvider'
import { UIProvider } from '@/app/providers/UIProvider'
import ScrollToTop from './utils/scroll-to-top/ScrollToTop'
import "./globals.css";
import "./variables.css"

import Navbar from '@/app/components/layout/navbar/Navbar'
import Bio from '@/app/components/layout/bio/Bio'
import Overlay from "./utils/overlay/Overlay";

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

export const Metadata = {
  title: "Jordan Schulte | Projects",
  icons: "images/blogpfp.webp",
  description: "Jordan Schulte's portfolio website",
};

export default function RootLayout({
  children,
}) {

  return (
    <html lang="en" className={`${sora.variable} ${spaceGrotesk.variable}`}>
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
      <link href="https://fonts.googleapis.com/css2?family=Mrs+Sheppards&display=swap" rel="stylesheet" />
      </head>
      <body className="content-wrapper">
        <AuthProvider>
          <UIProvider>
            <Overlay />
            <Navbar />
            <ScrollToTop />
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
          </UIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
