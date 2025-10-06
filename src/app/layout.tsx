import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import dynamic from "next/dynamic";
const PageTransition = dynamic(() => import("@/components/PageTransition"), { ssr: false });
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Click2Drive — Compare, Book, Manage Rentals",
  description: "Hourly and monthly car rentals with instant booking and provider tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[--color-background] text-[--color-foreground]`}>
        <header className="sticky top-0 z-40 border-b border-[--color-border] bg-[--color-card]/80 backdrop-blur">
          <nav className="container-px mx-auto flex h-14 items-center justify-between">
            <Link href="/" className="text-lg font-semibold tracking-wide">
              <span className="text-[--color-accent]">Click</span>2Drive
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/cars" className="hover:text-[--color-accent] transition-colors">Cars</Link>
              <Link href="/providers" className="hover:text-[--color-accent] transition-colors">Providers</Link>
              <Link href="/bookings" className="hover:text-[--color-accent] transition-colors">Bookings</Link>
              <Link href="/contact" className="hover:text-[--color-accent] transition-colors">Contact</Link>
            </div>
          </nav>
        </header>
        <main className="container-px mx-auto py-8"><PageTransition>{children}</PageTransition></main>
        <footer className="mt-12 border-t border-[--color-border]">
          <div className="container-px mx-auto py-6 text-xs text-neutral-400 flex items-center justify-between">
            <p>© {new Date().getFullYear()} Click2Drive</p>
            <p className="hover:text-[--color-accent] transition-colors"><Link href="/providers">Become a Provider</Link></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
