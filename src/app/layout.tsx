import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tourist Website",
  description:
    "Discover amazing travel destinations, explore stunning photos and videos, and plan your next adventure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-gray-900">
        <Navigation />
        <ErrorBoundary>
          <main className="flex-1">{children}</main>
        </ErrorBoundary>
        <Footer />
      </body>
    </html>
  );
}
