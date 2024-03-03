import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Micro Transactions by Meroku",
  description:
    "Experience lightning-fast AI with micro transactions. Only via Meroku",
  openGraph: {
    images: "/meroku-full-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          height: "100dvh",
        }}
      >
        <Analytics />
        <Providers>
          <>
            <Nav />
            <div className="flex w-full h-full max-w-5xl mx-auto overflow-y-auto">
              {children}
            </div>
          </>
        </Providers>
      </body>
    </html>
  );
}
