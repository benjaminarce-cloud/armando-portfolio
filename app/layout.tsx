import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MonitorChrome from "@/components/MonitorChrome";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Armando Aguilar",
  description: "Photographer and filmmaker. San Diego.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} antialiased`}>
        <MonitorChrome />
        {children}
      </body>
    </html>
  );
}
