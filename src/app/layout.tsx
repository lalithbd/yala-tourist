import type { Metadata } from "next";
import Script from "next/script";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://yala-tourist.vercel.app"),
  title: {
    default: "Yala Safari Tours — Explore Sri Lanka's Wild Southern Coast",
    template: "%s | Yala Safari Tours",
  },
  description:
    "Discover Yala National Park, Bundala, and more. Safari tours, wildlife experiences, and cultural adventures in southern Sri Lanka.",
  keywords: [
    "Yala National Park",
    "Sri Lanka safari",
    "wildlife tours",
    "Bundala",
    "Lunugamvehera",
    "Sri Lanka travel",
    "leopard safari",
    "birdwatching Sri Lanka",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Yala Safari Tours",
    title: "Yala Safari Tours — Explore Sri Lanka's Wild Southern Coast",
    description:
      "Discover Yala National Park, Bundala, and more. Safari tours, wildlife experiences, and cultural adventures in southern Sri Lanka.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-gray-900">
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <Navigation />
        <ErrorBoundary>
          <main className="flex-1">{children}</main>
        </ErrorBoundary>
        <Footer />
      </body>
    </html>
  );
}
