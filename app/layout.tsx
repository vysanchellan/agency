import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CursorGlow from "@/components/animations/CursorGlow";
import ScrollProgress from "@/components/animations/ScrollProgress";
import AppProviders from "@/components/providers/AppProviders";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kassora Labs — We build the internet's most alive websites",
  description:
    "Kassora Labs is a Durban-based studio building brand identity, web experience, and product design for ambitious clients.",
  openGraph: {
    title: "Kassora Labs",
    description: "We build the internet's most alive websites.",
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-base font-sans text-zinc-100 antialiased">
        <AppProviders>
          <ScrollProgress />
          <CursorGlow />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
