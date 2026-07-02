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
  title: "Kassora — Market Beyond Limits",
  description:
    "Kassora is a Durban-based studio giving ambitious companies the intelligence to dominate their market — brand strategy, web development, mobile apps, and conversion architecture.",
  openGraph: {
    title: "Kassora",
    description:
      "Market beyond limits. Brand, web, and product experiences built in Durban, South Africa.",
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
