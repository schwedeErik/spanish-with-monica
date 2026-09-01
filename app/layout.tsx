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
  title: "Spanish with Mónica | Learn Spanish. Live it.",
  description:
    "¡Hola! I'm Mónica, psychologist and Spanish teacher. Personalized 1-on-1 lessons from A1 to C1 that feel natural, practical, and connected to real life.",
  openGraph: {
    title: "Learn Spanish with Mónica",
    description:
      "Personalized Spanish with Mónica, psychologist, teacher, and lifelong learner. Book a lesson and start speaking with confidence.",
    type: "website",
    url: "https://schwedeerik.github.io/spanish-with-monica/",
    images: [
      {
        url: "https://schwedeerik.github.io/spanish-with-monica/og.jpg?v=10",
        width: 1200,
        height: 630,
        alt: "Learn Spanish with Mónica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Spanish with Mónica",
    description:
      "Personalized Spanish with Mónica, psychologist, teacher, and lifelong learner. Book a lesson and start speaking with confidence.",
    images: ["https://schwedeerik.github.io/spanish-with-monica/og.jpg?v=10"],
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
