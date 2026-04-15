import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Professional Record — Institutional Integrity Ratings",
  description: "Holding institutions to the standards of their own profession. Ratings across law, tech, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-950 text-slate-200" style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
