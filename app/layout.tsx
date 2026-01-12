import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Bodoni_Moda, Inter } from "next/font/google";

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
    <html lang="en" data-theme="dark">
      <head>
        {/* Set theme before paint to avoid flashing */}
        <Script id="theme-init" strategy="beforeInteractive">{`
(function () {
  try {
    var t = localStorage.getItem("theme");
    if (t !== "light" && t !== "dark") {
      var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      t = prefersDark ? "dark" : "light";
    }
    document.documentElement.dataset.theme = t;
  } catch (e) {}
})();
        `}</Script>
      </head>

      <body className={`${sans.variable} ${serif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
