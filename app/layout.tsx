import "./globals.css";
import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

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
  description: "Filmmaker and cinematographer. San Diego.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>
        <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-6 py-8 sm:px-10 lg:px-14">
          <SiteHeader />
          <main className="flex-1 pt-12 lg:pt-16">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
