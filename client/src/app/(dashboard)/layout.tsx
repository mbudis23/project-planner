import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Navbar from "@/components/global/Navbar";
import SideBar from "@/components/global/SideBar";
import ProtectedPage from "@/components/global/ProtectedLayout";
import { cookies } from "next/headers";
import Cookies from 'js-cookie';

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <Navbar/>
        <SideBar/>
        <ProtectedPage token={cookies().get('token')?.value || null}>
          <div className="pt-[69px] pl-[66px]">
            {children}
          </div>
        </ProtectedPage>

      </body>
    </html>
  );
}
