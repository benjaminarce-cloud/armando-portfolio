import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SiteNav from "@/components/SiteNav";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Armando Aguilar",
  description: "Filmmaker and cinematographer. San Diego.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={sans.variable}>
        <div className="mx-auto min-h-screen w-full max-w-[1600px] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          <SiteNav />
          <main className="mt-16 lg:mt-24">{children}</main>
        </div>
      </body>
    </html>
  );
}
