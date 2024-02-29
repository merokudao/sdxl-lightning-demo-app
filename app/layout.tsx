import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SDXL Lightning - Crypto Features by Meroku",
  description:
    "Experience lightning-fast SDXL API demo with crypto features by Meroku",
  authors: [{ name: "fal.ai", url: "https://fal.ai" }],
  metadataBase: new URL("https://fastsdxl.ai"),
  openGraph: {
    images: "/og_thumbnail.jpeg",
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
          height: "100vh",
        }}
      >
        <Analytics />
        <Providers>
          <>
            <Nav />
            {children}
          </>
        </Providers>
      </body>
    </html>
  );
}
