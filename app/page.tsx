"use client";

import { useState } from "react";
import {
  BookOpen,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock,
  Globe2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#why-mexican-spanish", label: "Why Mexican Spanish" },
  { href: "#packages", label: "Packages" },
  { href: "#faq", label: "FAQ" },
] as const;

const TRUST_BADGES = [
  { icon: MapPin, label: "Native Speaker from Mexico" },
  { icon: Users, label: "1-on-1 Personalized" },
  { icon: CalendarCheck, label: "Instant Google Calendar Booking" },
] as const;

const PACKAGES = [
  {
    name: "Trial Session",
    duration: "30 min",
    price: "$15",
    description:
      "A friendly level assessment and goal-setting session so we can map the fastest path to the Spanish you actually need.",
    features: [
      "Speaking comfort check",
      "Personalized learning goals",
      "Lesson plan preview",
    ],
    highlighted: false,
  },
  {
    name: "1-on-1 Conversational Spanish",
    duration: "60 min",
    price: "$35",
    description:
      "A standard single lesson focused on real conversation, Mexican phrases, and the grammar blockers holding you back.",
    features: [
      "Active speaking practice",
      "Practical slang & phrases",
      "Instant feedback & correction",
    ],
    highlighted: true,
  },
  {
    name: "Immersion Bundle",
    duration: "5 × 60 min",
    price: "$150",
    description:
      "A complete practice package for students ready to build momentum—save $25 versus booking lessons one by one.",
    features: [
      "Five full private lessons",
      "Progress tracking between sessions",
      "Custom vocab for your life & travel",
    ],
    highlighted: false,
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "Why focus specifically on Mexican Spanish?",
    answer:
      "Mexican Spanish is one of the most widely spoken varieties in the Americas—and the one you’ll hear across film, music, travel, and everyday life with Mexican communities. Monica teaches the rhythms, vocabulary, and cultural cues native speakers actually use, so you sound natural instead of textbook-generic.",
  },
  {
    question: "How do I join our online classes?",
    answer:
      "When you book, the calendar automatically syncs with Google Calendar and generates a Google Meet link for your session. You’ll get the invite by email—just click the Meet link at class time. No extra software to install.",
  },
  {
    question: "What is your cancellation/rescheduling policy?",
    answer:
      "Life happens. Please reschedule or cancel at least 12 hours before your lesson so Monica can free the slot for another student. Late cancellations may forfeit the session. Bundles remain flexible as long as you give that advance notice.",
  },
  {
    question: "Do I need to buy textbooks?",
    answer:
      "Nope. Monica shares digital materials, phrase lists, and practice prompts tailored to your goals. If you already love a textbook or app, we can weave it in—but nothing extra is required to start speaking with confidence.",
  },
] as const;

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition-shadow hover:shadow-sm"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
            >
              <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900 sm:text-xl">
                {item.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-amber-600 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-base leading-relaxed text-stone-600 sm:px-6 sm:pb-6">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-full flex-col bg-stone-50 text-stone-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-stone-50/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#top"
            className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-stone-900 sm:text-xl"
          >
            Spanish with{" "}
            <span className="text-amber-600">Monica</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-600 transition-colors hover:text-amber-700"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              className="inline-flex items-center justify-center rounded-2xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              Book a Trial Class
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl p-2 text-stone-700 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-stone-200/80 bg-stone-50 px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-stone-700 hover:bg-stone-100"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-2xl bg-amber-600 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"
              >
                Book a Trial Class
              </a>
            </nav>
          </div>
        )}
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="hero-mesh absolute inset-0" aria-hidden />
          <div className="texture-dots absolute inset-0 opacity-60" aria-hidden />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-full max-w-2xl bg-cover bg-center opacity-40 mix-blend-multiply sm:opacity-50 lg:opacity-60"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1400&q=80)",
              maskImage:
                "linear-gradient(90deg, transparent 0%, black 35%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, black 35%, black 100%)",
            }}
            aria-hidden
          />

          <div className="relative mx-auto flex max-w-6xl flex-col px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
            <p className="animate-fade-up mb-4 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-amber-700 sm:text-3xl md:text-4xl">
              Spanish with Monica
            </p>
            <h1 className="animate-fade-up-delay-1 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              Master Real Mexican Spanish with Monica
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl">
              Personalized 1-on-1 lessons with a native Mexican tutor. Designed for
              English speakers who want practical, real-world conversational fluency.
            </p>

            <div className="animate-fade-up-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#booking"
                className="inline-flex items-center justify-center rounded-2xl bg-amber-600 px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-amber-600/20 transition hover:bg-orange-600 hover:shadow-lg"
              >
                Book Your Trial ($15)
              </a>
              <a
                href="#packages"
                className="inline-flex items-center justify-center rounded-2xl border border-stone-300 bg-white/70 px-6 py-3.5 text-base font-semibold text-stone-800 backdrop-blur-sm transition hover:border-amber-600/40 hover:bg-white"
              >
                View Packages
              </a>
            </div>

            <ul className="animate-fade-up-delay-3 mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm font-medium text-stone-700 sm:text-base">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600/10 text-amber-700">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* About Monica */}
        <section id="about" className="scroll-mt-20 border-t border-stone-200/60 bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
            <div className="relative">
              <div className="animate-soft-float absolute -left-4 -top-4 h-24 w-24 rounded-full bg-amber-400/30 blur-2xl" aria-hidden />
              <div className="absolute -bottom-6 -right-4 h-32 w-32 rounded-full bg-orange-500/20 blur-2xl" aria-hidden />
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-200 shadow-lg"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                role="img"
                aria-label="Warm, lively conversation — the energy of learning Spanish with Monica"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:left-6 sm:right-auto sm:max-w-xs">
                <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-stone-900">
                  ¡Hola! I&apos;m Monica
                </p>
                <p className="mt-1 text-sm text-stone-600">
                  28 · Native Mexican Spanish · Online from Mexico
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
                About Monica
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                Warm energy. Real Mexican Spanish. Lessons that feel like conversation—not homework.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-600">
                ¡Qué gusto conocerte! I&apos;m Monica, a 28-year-old native Spanish speaker
                from Mexico who lives for that &ldquo;wait—I just understood that&rdquo; moment.
                My classes are high-energy, encouraging, and built around the Spanish you&apos;ll
                actually use with friends, coworkers, and on your next trip south.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-stone-600">
                We prioritize active speaking from minute one: practical Mexican slang and
                phrases, cultural context that makes the language click, and clear breakdowns
                of the grammar hurdles English speakers hit hardest—so hesitation turns into
                fluency, one conversation at a time.
              </p>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: MessageCircle, title: "Speak first", body: "Less drills, more real dialogue" },
                  { icon: Sparkles, title: "Mexican flavor", body: "Slang, humor & everyday phrases" },
                  { icon: BookOpen, title: "Grammar that sticks", body: "Clear fixes for English-speaker traps" },
                  { icon: Globe2, title: "Culture included", body: "Context that makes Spanish feel alive" },
                ].map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="font-semibold text-stone-900">{title}</p>
                      <p className="text-sm text-stone-600">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Why Mexican Spanish */}
        <section
          id="why-mexican-spanish"
          className="scroll-mt-20 border-t border-stone-200/60 bg-stone-50 py-20 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
                Why Mexican Spanish
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                Learn the Spanish you&apos;ll hear in real life
              </h2>
              <p className="mt-4 text-lg text-stone-600">
                Generic &ldquo;neutral&rdquo; Spanish can leave you stranded the moment someone
                says ¿qué onda? Monica trains your ear—and your mouth—for authentic Mexican
                Spanish.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Widely useful",
                  body: "From the U.S. to Mexico City, Mexican Spanish opens doors at work, travel, and community life.",
                },
                {
                  title: "Sound natural",
                  body: "Pick up rhythm, fillers, and phrases natives actually use—not stiff textbook lines.",
                },
                {
                  title: "Culture as curriculum",
                  body: "Food, festivals, humor, and etiquette woven into lessons so language sticks with meaning.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-8">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-stone-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-stone-600">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="scroll-mt-20 border-t border-stone-200/60 bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
                Packages
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                Simple pricing. Clear next steps.
              </h2>
              <p className="mt-4 text-lg text-stone-600">
                Start with a low-commitment trial, book a single lesson, or lock in the
                Immersion Bundle for steady progress.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {PACKAGES.map((pkg) => (
                <article
                  key={pkg.name}
                  className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 ${
                    pkg.highlighted
                      ? "border-amber-500 bg-gradient-to-b from-amber-50 to-white shadow-md shadow-amber-600/10"
                      : "border-stone-200/80 bg-stone-50/50"
                  }`}
                >
                  {pkg.highlighted && (
                    <span className="absolute -top-3 left-6 rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                      Most popular
                    </span>
                  )}
                  <div className="flex items-center gap-2 text-sm font-medium text-stone-500">
                    <Clock className="h-4 w-4" aria-hidden />
                    {pkg.duration}
                  </div>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-stone-900">
                    {pkg.name}
                  </h3>
                  <p className="mt-4 flex items-baseline gap-1">
                    <span className="font-[family-name:var(--font-display)] text-4xl font-semibold text-amber-700">
                      {pkg.price}
                    </span>
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-stone-600">
                    {pkg.description}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-stone-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#booking"
                    className={`mt-8 inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                      pkg.highlighted
                        ? "bg-amber-600 text-white hover:bg-orange-600"
                        : "border border-stone-300 bg-white text-stone-800 hover:border-amber-600/50 hover:text-amber-800"
                    }`}
                  >
                    Book Now
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Booking */}
        <section id="booking" className="scroll-mt-20 border-t border-stone-200/60 bg-stone-50 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
                Booking
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                Schedule Your Lesson
              </h2>
              <p className="mt-4 text-lg text-stone-600">
                Select a time below. Bookings automatically sync with Google Calendar and
                generate a Google Meet link.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-2 shadow-sm sm:p-4">
              <iframe
                title="Book a Spanish lesson with Monica"
                src="https://cal.com/monica-ramirez-l3dppw/spanish-lessons"
                className="h-[700px] w-full border-0 rounded-2xl shadow-sm"
              />
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-stone-500">
              Replace <code className="rounded bg-stone-200/80 px-1.5 py-0.5 text-stone-700">your-handle/spanish-lesson</code> with
              Monica&apos;s Cal.com username and event slug when you&apos;re ready to go live.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 border-t border-stone-200/60 bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
                FAQ
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                Questions, answered
              </h2>
            </div>
            <div className="mt-12">
              <FaqAccordion />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200/80 bg-stone-900 text-stone-300">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
              Spanish with <span className="text-amber-400">Monica</span>
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-400">
              Authentic Mexican Spanish for English speakers—warm, practical, and built for
              real conversation.
            </p>
            <a
              href="mailto:hola@spanishwithmonica.com"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-amber-300 transition hover:text-amber-200"
            >
              <Mail className="h-4 w-4" aria-hidden />
              hola@spanishwithmonica.com
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-stone-500">
              Quick links
            </p>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-stone-300 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#booking" className="text-sm text-stone-300 hover:text-white">
                  Book a Trial Class
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800">
          <p className="mx-auto max-w-6xl px-4 py-5 text-center text-sm text-stone-500 sm:px-6 lg:px-8 lg:text-left">
            © {new Date().getFullYear()} Spanish with Monica. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
