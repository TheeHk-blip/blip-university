import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar";
import { siteConfig } from "./config/site";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >    
      <Providers>   
        <div className="flex flex-col p-0.5 min-h-screen">
          <Navbar/>     
          <main className="container pt-5 pl-1.5 z-auto" >
            {children} 
          </main>     
        </div>        
      </Providers>     
      <footer className="flex gap-[24px] flex-wrap items-center justify-center">
        &copy; {new Date().getFullYear()} {siteConfig.description}
      </footer>                 
      </body>
    </html>
  );
}
