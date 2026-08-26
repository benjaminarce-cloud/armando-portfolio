import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

/**
 * The reference face is Helvetica Neue, which every Mac already has. Inter is
 * loaded as the fallback for everything else — the closest grotesque on Google
 * Fonts, and near-indistinguishable at the sizes this site sets type. The
 * Didone that used to run here is gone.
 */
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mando — Armando Aguilar",
  description:
    "Armando Aguilar. Videographer, editor, photographer. San Diego.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
