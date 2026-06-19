import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "@fontsource-variable/mona-sans";
import "./globals.css";
import Preloader from "@/components/layouts/Preloader";

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adent Fallah Amorisyah — Full Stack Developer",
  description:
    "Premium creative portfolio. Full Stack Developer specializing in Next.js, Three.js, and interactive web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-black">
        <Preloader>{children}</Preloader>
      </body>
    </html>
  );
}