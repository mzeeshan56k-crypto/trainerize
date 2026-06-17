import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FitForge — AI Fitness Coaching Platform",
  description:
    "FitForge is the all-in-one platform for personal trainers, gyms and online coaches to build workouts, track nutrition, message clients and grow their business.",
  keywords: [
    "personal training software",
    "online coaching platform",
    "workout builder",
    "fitness app",
    "nutrition tracking",
  ],
  openGraph: {
    title: "FitForge — AI Fitness Coaching Platform",
    description:
      "Build workouts, track progress, coach clients and grow your fitness business — all in one place.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
