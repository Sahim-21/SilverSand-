import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";

import { Providers } from "@/components/providers";

import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://silversandhomestay.com",
  ),
  title: {
    default: "Silver Sand Beach Homestay | Homestay in Murudeshwar",
    template: "%s | Silver Sand Beach Homestay",
  },
  description:
    "Homestay in Murudeshwar, Karnataka. Deluxe AC Room with occupancy-based pricing. Book direct on WhatsApp or phone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${sourceSans.variable} ${sourceSerif.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
