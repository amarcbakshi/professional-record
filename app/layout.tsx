import type { Metadata } from "next";
import { Libre_Baskerville, Figtree } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const display = Libre_Baskerville({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Professional Record — Institutional Integrity Ratings",
  description: "Holding institutions to the standards of their own profession. Ratings across law, tech, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body
        className="min-h-full"
        style={{
          fontFamily: 'var(--font-body), system-ui, sans-serif',
          background: 'var(--bg-primary)',
          color: 'var(--text-secondary)',
        }}
      >
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
