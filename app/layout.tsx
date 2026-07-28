import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://schwedeerik.github.io/spanish-with-monica"),
  title: "Spanish with Monica | Learn Spanish Online · A1–B2",
  description:
    "1-on-1 Spanish classes with Monica. Official CEFR levels from A1 to B2—clear progress, real conversation, and lessons that stick.",
  openGraph: {
    title: "Spanish with Monica | Online Spanish Classes A1–B2",
    description:
      "Book a lesson and learn Spanish with structured CEFR levels—from beginner A1 to upper-intermediate B2.",
    type: "website",
    url: "https://schwedeerik.github.io/spanish-with-monica/",
    images: [
      {
        url: "https://schwedeerik.github.io/spanish-with-monica/og.jpg?v=4",
        width: 1200,
        height: 630,
        alt: "Spanish with Monica — Learn Spanish A1 to B2",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spanish with Monica | Online Spanish Classes A1–B2",
    description:
      "Book a lesson and learn Spanish with structured CEFR levels—from beginner A1 to upper-intermediate B2.",
    images: ["https://schwedeerik.github.io/spanish-with-monica/og.jpg?v=4"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
