import "./globals.css";
import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import ThemeToggle from "@/components/ThemeToggle";

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
        <div className="fixed right-5 top-6 z-50 sm:right-8 sm:top-7">
          <ThemeToggle />
        </div>
        {children}
      </body>
    </html>
  );
}
