import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spanish with Monica | Learn Real Mexican Spanish Online",
  description:
    "Personalized 1-on-1 Mexican Spanish lessons with Monica, a native tutor from Mexico. Practical conversation, culture, and fluency for English speakers.",
  openGraph: {
    title: "Spanish with Monica | Master Real Mexican Spanish",
    description:
      "Book a trial class and start speaking authentic Mexican Spanish with a native tutor.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-stone-900">{children}</body>
    </html>
  );
}
