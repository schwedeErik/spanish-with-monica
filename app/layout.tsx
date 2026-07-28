import type { Metadata } from "next";
import { JetBrains_Mono, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://schwedeerik.github.io/spanish-with-monica"),
  title: "Spanish with Monica | Learn Spanish Online · A1–C2",
  description:
    "1-on-1 Spanish classes with Monica. Official CEFR levels from A1 to C2—clear progress, real conversation, and lessons that stick.",
  openGraph: {
    title: "Spanish with Monica | Online Spanish Classes A1–C2",
    description:
      "Book a trial lesson and learn Spanish with structured CEFR levels—from beginner A1 to advanced C2.",
    type: "website",
    url: "https://schwedeerik.github.io/spanish-with-monica/",
    images: [
      {
        url: "https://schwedeerik.github.io/spanish-with-monica/og.jpg",
        width: 1200,
        height: 630,
        alt: "Spanish with Monica — Learn Spanish A1 to C2",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spanish with Monica | Online Spanish Classes A1–C2",
    description:
      "Book a trial lesson and learn Spanish with structured CEFR levels—from beginner A1 to advanced C2.",
    images: ["https://schwedeerik.github.io/spanish-with-monica/og.jpg"],
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
      className={`${display.variable} ${body.variable} ${mono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
