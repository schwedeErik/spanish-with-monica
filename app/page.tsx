"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock,
  Mail,
  Menu,
  MessageCircle,
  RotateCcw,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const NAV_LINKS = [
  { href: "#booking", label: "Book" },
  { href: "#about", label: "About" },
  { href: "#levels", label: "Levels" },
  { href: "#practice", label: "Practice" },
  { href: "#packages", label: "Packages" },
  { href: "#faq", label: "FAQ" },
] as const;

const PRACTICE_QUESTIONS = [
  {
    level: "A1",
    prompt: "How do you say “My name is Ana” in Spanish?",
    options: [
      { text: "Me llamo Ana", correct: true },
      { text: "Yo es Ana", correct: false },
    ],
    tip: "Me llamo… is the standard A1 way to introduce yourself.",
  },
  {
    level: "A2",
    prompt: "Which sentence correctly uses ser vs estar?",
    options: [
      { text: "Estoy cansado hoy", correct: true },
      { text: "Soy cansado hoy", correct: false },
    ],
    tip: "Temporary states like tiredness use estar. Ser is for lasting identity.",
  },
  {
    level: "A2",
    prompt: "You want to say you went to the store yesterday. Which is correct?",
    options: [
      { text: "Ayer fui a la tienda", correct: true },
      { text: "Ayer voy a la tienda", correct: false },
    ],
    tip: "Fui is the preterite of ir—right for a finished past action.",
  },
  {
    level: "B1",
    prompt: "Which option best expresses a polite request?",
    options: [
      { text: "¿Podrías ayudarme, por favor?", correct: true },
      { text: "Ayúdame ahora mismo", correct: false },
    ],
    tip: "Conditional forms like podrías sound more polite and natural at B1.",
  },
  {
    level: "B1",
    prompt: "Which sentence correctly talks about something you used to do?",
    options: [
      { text: "Cuando era niño, jugaba al fútbol", correct: true },
      { text: "Cuando era niño, jugué al fútbol siempre", correct: false },
    ],
    tip: "The imperfect (jugaba) describes habits and ongoing past situations.",
  },
] as const;

const CEFR_LEVELS = [
  {
    code: "A1",
    name: "Beginner",
    body: "Greetings, introductions, everyday words, and simple present-tense sentences.",
  },
  {
    code: "A2",
    name: "Elementary",
    body: "Describe routines, past events, plans, and handle short social conversations.",
  },
  {
    code: "B1",
    name: "Intermediate",
    body: "Express opinions, tell stories, and manage most travel and work situations.",
  },
  {
    code: "B2",
    name: "Upper Intermediate",
    body: "Speak with more fluency, argue a point, and follow complex conversations.",
  },
  {
    code: "C1–C2",
    name: "Advanced",
    body: "Nuanced discussion, professional Spanish, and near-native precision.",
  },
] as const;

const TRUST_BADGES = [
  { icon: BookOpen, label: "CEFR Levels A1–C2" },
  { icon: Users, label: "1-on-1 Personalized" },
  { icon: CalendarCheck, label: "Instant Calendar Booking" },
] as const;

const PACKAGES = [
  {
    name: "Trial Session",
    duration: "30 min",
    price: "$15",
    description:
      "A friendly CEFR level check and goal-setting session so we know whether you’re starting at A1, A2, or beyond.",
    features: [
      "Official-level placement feel",
      "Personalized learning goals",
      "Clear next-step lesson plan",
    ],
    highlighted: false,
  },
  {
    name: "1-on-1 Spanish Lesson",
    duration: "60 min",
    price: "$35",
    description:
      "A full private lesson aligned to your CEFR level—speaking, listening, grammar, and vocabulary that move you forward.",
    features: [
      "Level-based lesson plan",
      "Active speaking practice",
      "Instant feedback & correction",
    ],
    highlighted: true,
  },
  {
    name: "Progress Bundle",
    duration: "5 × 60 min",
    price: "$150",
    description:
      "Five lessons for steady progress through your current level—save $25 versus booking one by one.",
    features: [
      "Five full private lessons",
      "Progress tracking by level",
      "Materials matched to your CEFR goals",
    ],
    highlighted: false,
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "What Spanish levels do you teach?",
    answer:
      "Monica teaches standard Spanish across the official CEFR levels: A1, A2, B1, B2, and C1–C2. Your trial includes a light placement conversation so lessons match where you are—and where you want to go.",
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
      "Nope. Monica shares digital materials and practice prompts matched to your level. If you’re preparing for an official exam or already use a coursebook, we can align lessons with that too.",
  },
] as const;

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
      {children}
    </p>
  );
}

function PracticeGame() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const question = PRACTICE_QUESTIONS[index];
  const answered = selected !== null;
  const progressPct =
    ((index + (answered ? 1 : 0)) / PRACTICE_QUESTIONS.length) * 100;

  function choose(optionIndex: number) {
    if (answered) return;
    setSelected(optionIndex);
    if (question.options[optionIndex].correct) {
      setScore((s) => s + 1);
    }
  }

  function next() {
    if (index >= PRACTICE_QUESTIONS.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  function reset() {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="glass rounded-3xl p-6 sm:p-10">
        <SectionLabel>// Result</SectionLabel>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
          You got {score}/{PRACTICE_QUESTIONS.length}
        </h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          {score >= 4
            ? "Strong start—Monica can help you turn this into steady progress through your CEFR level."
            : score >= 2
              ? "Nice baseline. Live lessons will lock in grammar and speaking for your official level."
              : "Totally normal starting point. A placement trial will show exactly where to begin."}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#booking"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-teal-300"
          >
            Book your trial ($15)
          </a>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-accent/50 hover:text-accent"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Play again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-3xl p-6 sm:p-10">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-500">
          Question {index + 1} / {PRACTICE_QUESTIONS.length}
        </p>
        <p className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs font-medium text-accent">
          {question.level}
        </p>
      </div>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <h3 className="mt-8 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {question.prompt}
      </h3>

      <div className="mt-6 grid gap-3">
        {question.options.map((option, optionIndex) => {
          const isSelected = selected === optionIndex;
          const showCorrect = answered && option.correct;
          const showWrong = answered && isSelected && !option.correct;

          return (
            <button
              key={option.text}
              type="button"
              onClick={() => choose(optionIndex)}
              disabled={answered}
              className={`rounded-2xl border px-4 py-4 text-left text-base font-medium transition sm:px-5 ${
                showCorrect
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : showWrong
                    ? "border-white/10 bg-white/[0.02] text-zinc-500 line-through"
                    : "border-white/10 bg-white/[0.02] text-zinc-200 hover:border-white/25"
              } ${answered ? "cursor-default" : "cursor-pointer"}`}
            >
              <span className="flex items-center justify-between gap-3">
                <span>{option.text}</span>
                {showCorrect && <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden />}
              </span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-zinc-400">{question.tip}</p>
          <button
            type="button"
            onClick={next}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-teal-300"
          >
            {index >= PRACTICE_QUESTIONS.length - 1 ? "See results" : "Next"}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left sm:py-6"
            >
              <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-white sm:text-xl">
                {item.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${
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
                <p className="pb-5 text-base leading-relaxed text-zinc-400 sm:pb-6">
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
    <div className="noise dot-grid relative flex min-h-full flex-col overflow-x-hidden text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="animate-float absolute -left-60 -top-60 h-[700px] w-[700px] rounded-full bg-accent/[0.08] blur-[150px]" />
        <div className="animate-float-delayed absolute -right-40 top-[35%] h-[520px] w-[520px] rounded-full bg-cyan-400/[0.05] blur-[140px]" />
        <div className="animate-float absolute bottom-[8%] left-[25%] h-[420px] w-[420px] rounded-full bg-teal-500/[0.04] blur-[120px]" />
      </div>

      <header className="fixed top-0 z-50 w-full px-4 pt-4 sm:px-8 sm:pt-5">
        <div className="glass mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full px-4 sm:px-5">
          <a
            href="#top"
            className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight text-white sm:text-base"
          >
            Spanish with <span className="text-accent">Monica</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="glow-line relative text-xs font-medium uppercase tracking-[0.15em] text-white/55 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-950 transition hover:bg-teal-300"
            >
              Book a Trial
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-white md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="glass mx-auto mt-2 max-w-7xl rounded-3xl px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-zinc-300 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-accent px-4 py-3 text-sm font-semibold text-zinc-950"
              >
                Book a Trial
              </a>
            </nav>
          </div>
        )}
      </header>

      <main id="top" className="flex-1">
        <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32">
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-[90%] max-w-3xl sm:w-[70%] lg:w-[55%]"
            aria-hidden
          >
            <Image
              src="/monica.png"
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 85vw, 40rem"
              className="object-cover object-[center_12%] opacity-40 saturate-[0.7] contrast-[1.05] sm:opacity-50 lg:opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080c] via-[#07080c]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-transparent to-[#07080c]/50" />
          </div>

          <div className="relative mx-auto w-full max-w-7xl">
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-300">
                Trial open · $15 · Instant calendar booking
              </span>
            </div>

            <h1 className="animate-fade-up-delay-1 mt-8 max-w-4xl font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-[5.2rem]">
              Learn Spanish
              <br />
              that <span className="gradient-text">actually sticks.</span>
            </h1>

            <div className="animate-fade-up-delay-2 mt-8 flex max-w-5xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg">
                Book a 1-on-1 lesson with Monica in seconds. Pick a time below—your Google
                Calendar and Meet link sync automatically.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#booking"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-teal-300"
                >
                  Book Your Trial ($15)
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href="#packages"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-accent/40 hover:text-accent"
                >
                  View Packages
                </a>
              </div>
            </div>

            <ul className="animate-fade-up-delay-3 mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:flex-wrap sm:gap-x-10">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 text-sm font-medium text-zinc-400"
                >
                  <Icon className="h-4 w-4 text-accent" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="booking" className="scroll-mt-24 px-4 pb-24 sm:px-8 sm:pb-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <SectionLabel>// Book a lesson</SectionLabel>
                <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Pick a time. Start speaking.
                </h2>
                <p className="mt-5 text-lg text-zinc-400">
                  Choose a slot in the calendar. Confirmations sync to Google Calendar and
                  include a Google Meet link—no extra setup.
                </p>
              </div>
              <div className="glass flex flex-wrap gap-4 rounded-2xl px-5 py-4 text-sm text-zinc-300">
                <span className="font-mono text-accent">$15</span>
                <span className="text-zinc-600">·</span>
                <span>30-min trial</span>
                <span className="text-zinc-600">·</span>
                <span>Google Meet included</span>
              </div>
            </div>

            <div className="glass mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-accent/20 p-2 shadow-[0_0_80px_-24px_rgba(45,212,191,0.45)] sm:p-4">
              <iframe
                title="Book a Spanish lesson with Monica"
                src="https://cal.com/monica-ramirez-l3dppw/spanish-lessons"
                className="h-[700px] w-full rounded-2xl border-0 bg-white"
              />
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 px-4 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <SectionLabel>// About</SectionLabel>
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Structured Spanish.
                <br />
                Human conversation.
              </h2>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-zinc-400">
                ¡Hola! I&apos;m Monica, a native Spanish speaker who helps English learners
                move confidently through the official CEFR levels—from first words at A1
                to advanced fluency at C1–C2.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-zinc-400">
                Every lesson balances speaking practice with the grammar and vocabulary
                expected at your level, so you always know what you&apos;re working toward
                and why it matters.
              </p>

              <ul className="mt-12 grid gap-6 sm:grid-cols-3">
                {[
                  { icon: MessageCircle, title: "Speak first", body: "Active conversation from minute one" },
                  { icon: BookOpen, title: "Level-aligned", body: "Lessons mapped to A1–C2 goals" },
                  { icon: Sparkles, title: "Clear progress", body: "Know exactly what “next level” means" },
                ].map(({ icon: Icon, title, body }) => (
                  <li key={title} className="border-t border-white/10 pt-5">
                    <Icon className="h-4 w-4 text-accent" aria-hidden />
                    <p className="mt-3 font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm text-zinc-500">{body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="levels" className="scroll-mt-24 px-4 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>// Levels</SectionLabel>
            <h2 className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Official CEFR path. A1 to C2.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-zinc-400">
              The same scale used by schools, employers, and official exams worldwide—
              turned into practical 1-on-1 lessons.
            </p>

            <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
              {CEFR_LEVELS.map((level, i) => (
                <div
                  key={level.code}
                  className="grid gap-4 py-8 sm:grid-cols-[5rem_10rem_1fr] sm:items-start sm:gap-8"
                >
                  <p className="font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                      {level.code}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                      {level.name}
                    </p>
                  </div>
                  <p className="text-base leading-relaxed text-zinc-400">{level.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="practice" className="scroll-mt-24 px-4 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-3xl">
            <SectionLabel>// Practice</SectionLabel>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Try a few level-based questions.
            </h2>
            <p className="mt-5 text-lg text-zinc-400">
              Five quick choices from A1 to B1. No account—just a taste of the Spanish
              Monica teaches in real lessons.
            </p>
            <div className="mt-12">
              <PracticeGame />
            </div>
          </div>
        </section>

        <section id="packages" className="scroll-mt-24 px-4 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>// Packages</SectionLabel>
            <h2 className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Simple pricing. Clear next steps.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-zinc-400">
              Start with a placement-style trial, book a single level-based lesson, or
              lock in the Progress Bundle for steady CEFR gains.
            </p>

            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {PACKAGES.map((pkg, i) => (
                <article
                  key={pkg.name}
                  className={`flex flex-col rounded-3xl border p-6 sm:p-8 ${
                    pkg.highlighted
                      ? "border-accent/40 bg-accent/[0.08]"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    {pkg.highlighted && (
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm text-zinc-500">
                    <Clock className="h-4 w-4" aria-hidden />
                    {pkg.duration}
                  </div>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                    {pkg.name}
                  </h3>
                  <p className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-white">
                    {pkg.price}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">
                    {pkg.description}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-zinc-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#booking"
                    className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                      pkg.highlighted
                        ? "bg-accent text-zinc-950 hover:bg-teal-300"
                        : "border border-white/15 text-white hover:border-accent/40 hover:text-accent"
                    }`}
                  >
                    Book Now
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 px-4 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-3xl">
            <SectionLabel>// FAQ</SectionLabel>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Questions, answered.
            </h2>
            <div className="mt-12">
              <FaqAccordion />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-14 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:justify-between">
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
              Spanish with <span className="text-accent">Monica</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-500">
              Standard Spanish for English speakers—structured by CEFR levels A1–C2, with
              real conversation at the center.
            </p>
            <a
              href="mailto:hola@spanishwithmonica.com"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition hover:text-accent"
            >
              <Mail className="h-4 w-4" aria-hidden />
              hola@spanishwithmonica.com
            </a>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-600">
              Quick links
            </p>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-zinc-400 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#booking" className="text-sm text-zinc-400 hover:text-white">
                  Book a Trial Class
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-7xl font-mono text-xs text-zinc-600">
          © {new Date().getFullYear()} Spanish with Monica. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
