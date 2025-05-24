"use client";
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Heder from "@/components/header/page";
import Footer from "@/components/Footer";
import VoiceRecorder from "@/components/VoiceRecorder";
import TrackMap from "@/components/TrackMap";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const metadata: Metadata = {
//   title: "Pronunciation Training App",
//   description: "Practice your English pronunciation",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <div className="text-base md:text-lg min-h-screen flex flex-col">
          <Heder />

          {/* Content */}
          <main className="flex-grow">
            {children}

            {/* Voice Recorder Section */}
            {/* <div className="flex justify-center items-center px-4 py-8 md:py-16"> */}
            <TrackMap />
            <VoiceRecorder />
            {/* </div> */}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
