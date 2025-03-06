import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Heder from "@/components/header/page";
import Footer from "@/components/Footer";
import VoiceRecorder from "@/components/VoiceRecorder";
// import Home from "./page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="text-2xl"></div>
        <Heder />
        {children}
        <main className="flex justify-center items-center min-h-screen ">
          <VoiceRecorder />
        </main>
        {/* <Home /> */}
        <Footer />
      </body>
    </html>
  );
}
