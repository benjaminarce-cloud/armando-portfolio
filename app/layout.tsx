import "./globals.css";
import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";

const serif = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Armando Aguilar",
  description: "Sports filmmaker • San Diego",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} antialiased`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
