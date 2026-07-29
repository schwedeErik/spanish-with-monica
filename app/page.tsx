"use client";

import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
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
  Phone,
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

type PracticeOption = { text: string; correct: boolean };

const PRACTICE_QUESTIONS: {
  level: string;
  prompt: string;
  options: PracticeOption[];
  tip: string;
}[] = [
  {
    level: "A1",
    prompt: "How do you say “My name is Ana” in Spanish?",
    options: [
      { text: "Me llamo Ana", correct: true },
      { text: "Yo es Ana", correct: false },
      { text: "Mi nombre soy Ana", correct: false },
      { text: "Yo llamo Ana", correct: false },
    ],
    tip: "Me llamo… is the standard A1 way to introduce yourself.",
  },
  {
    level: "A2",
    prompt: "Which sentence correctly uses ser vs estar?",
    options: [
      { text: "Estoy cansado hoy", correct: true },
      { text: "Soy cansado hoy", correct: false },
      { text: "Estoy profesor hoy", correct: false },
      { text: "Soy en casa ahora", correct: false },
    ],
    tip: "Temporary states like tiredness use estar. Ser is for lasting identity.",
  },
  {
    level: "A2",
    prompt: "You want to say you went to the store yesterday. Which is correct?",
    options: [
      { text: "Ayer fui a la tienda", correct: true },
      { text: "Ayer voy a la tienda", correct: false },
      { text: "Ayer iba a la tienda ahora", correct: false },
      { text: "Ayer iré a la tienda", correct: false },
    ],
    tip: "Fui is the preterite of ir—right for a finished past action.",
  },
  {
    level: "B1",
    prompt: "Which option best expresses a polite request?",
    options: [
      { text: "¿Podrías ayudarme, por favor?", correct: true },
      { text: "Ayúdame ahora mismo", correct: false },
      { text: "Tú ayudas a mí", correct: false },
      { text: "Quiero que ayudas", correct: false },
    ],
    tip: "Conditional forms like podrías sound more polite and natural at B1.",
  },
  {
    level: "B1",
    prompt: "Which sentence correctly talks about something you used to do?",
    options: [
      { text: "Cuando era niño, jugaba al fútbol", correct: true },
      { text: "Cuando era niño, jugué al fútbol siempre", correct: false },
      { text: "Cuando era niño, juego al fútbol", correct: false },
      { text: "Cuando era niño, he jugado al fútbol cada día", correct: false },
    ],
    tip: "The imperfect (jugaba) describes habits and ongoing past situations.",
  },
];

function shuffleOptions(options: PracticeOption[]): PracticeOption[] {
  const copy = [...options];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

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
    code: "C1",
    name: "Advanced",
    body: "Discuss nuanced topics, use precise vocabulary, and sound natural in demanding situations.",
  },
] as const;

const TRUST_BADGES = [
  { icon: BookOpen, label: "CEFR Levels A1–C1" },
  { icon: Users, label: "1-on-1 Personalized" },
  { icon: CalendarCheck, label: "Instant Calendar Booking" },
] as const;

const PACKAGES = [
  {
    name: "Single Lesson",
    duration: "60 min",
    price: "$350",
    priceNote: "MXN per lesson",
    description:
      "One private 1-on-1 Spanish lesson aligned to your CEFR level—speaking, listening, grammar, and vocabulary that move you forward.",
    features: [
      "Level-based lesson plan",
      "Active speaking practice",
      "Instant feedback & correction",
    ],
    highlighted: false,
    cta: "Book your lesson",
    ctaNote: "",
  },
  {
    name: "5-Lesson Pack",
    duration: "5 × 60 min",
    price: "$300",
    priceNote: "MXN per lesson · $1,500 total",
    description:
      "Five private lessons at a lower per-lesson rate—ideal for steady progress through your current CEFR level.",
    features: [
      "Save $50 per lesson vs single",
      "Progress tracking by level",
      "Materials matched to your CEFR goals",
    ],
    highlighted: true,
    cta: "Book pack & choose 5 slots",
    ctaNote: "",
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "What Spanish levels do you teach?",
    answer:
      "A1 through C1. Your first lesson includes a quick placement chat so we start at the right level.",
  },
  {
    question: "How do I join online classes?",
    answer:
      "Booking syncs to Google Calendar with a Google Meet link. Just click the Meet link at class time.",
  },
  {
    question: "How does payment work?",
    answer:
      "Nothing is charged online. After you book, Monica confirms on WhatsApp—payment is by transfer or in person.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Please reschedule or cancel at least 12 hours ahead. Late cancellations may forfeit the session.",
  },
] as const;

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-sm font-semibold tracking-[0.14em] text-accent uppercase">
      {children}
    </p>
  );
}

function CalBooking() {
  useEffect(() => {
    void (async () => {
      const cal = await getCalApi();
      cal("ui", {
        hideEventTypeDetails: true,
        layout: "month_view",
        theme: "light",
        colorScheme: "light",
      });
    })();
  }, []);

  return (
    <Cal
      calLink="monica-ramirez-l3dppw/spanish-lessons"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
      config={{
        layout: "month_view",
        theme: "light",
        "ui.color-scheme": "light",
        useSlotsViewOnSmallScreen: "true",
      }}
    />
  );
}

function PracticeGame() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  // Stable initial order for SSR; shuffle after mount to avoid hydration mismatch
  const [shuffledOptions, setShuffledOptions] = useState(
    () => PRACTICE_QUESTIONS[0].options,
  );

  useEffect(() => {
    setShuffledOptions(shuffleOptions(PRACTICE_QUESTIONS[0].options));
  }, []);

  const question = PRACTICE_QUESTIONS[index];
  const answered = selected !== null;
  const progressPct =
    ((index + (answered ? 1 : 0)) / PRACTICE_QUESTIONS.length) * 100;

  function choose(optionIndex: number) {
    if (answered) return;
    setSelected(optionIndex);
    if (shuffledOptions[optionIndex].correct) {
      setScore((s) => s + 1);
    }
  }

  function next() {
    if (index >= PRACTICE_QUESTIONS.length - 1) {
      setFinished(true);
      return;
    }
    const nextIndex = index + 1;
    setIndex(nextIndex);
    setShuffledOptions(shuffleOptions(PRACTICE_QUESTIONS[nextIndex].options));
    setSelected(null);
  }

  function reset() {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setShuffledOptions(shuffleOptions(PRACTICE_QUESTIONS[0].options));
  }

  if (finished) {
    return (
      <div className="soft-card rounded-[2rem] p-6 sm:p-10">
        <SectionLabel>Result</SectionLabel>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          You got {score}/{PRACTICE_QUESTIONS.length}
        </h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--foreground-secondary)] sm:text-lg">
          {score >= 4
            ? "Strong start—Monica can help you turn this into steady progress through your CEFR level."
            : score >= 2
              ? "Nice baseline. Live lessons will lock in grammar and speaking for your official level."
              : "Totally normal starting point. A first lesson with Monica will show exactly where to begin."}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#booking"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-deep)]"
          >
            Book your lesson
          </a>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white/60 px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-accent/40"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Play again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="soft-card rounded-[2rem] p-6 sm:p-10">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[var(--foreground-muted)]">
          Question {index + 1} / {PRACTICE_QUESTIONS.length}
        </p>
        <p className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-accent">
          {question.level}
        </p>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--surface-2)]">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <h3 className="mt-8 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {question.prompt}
      </h3>

      <div className="mt-6 grid gap-3">
        {shuffledOptions.map((option, optionIndex) => {
          const isSelected = selected === optionIndex;
          const showCorrect = answered && option.correct;
          const showWrong = answered && isSelected && !option.correct;

          return (
            <button
              key={`${question.prompt}-${option.text}`}
              type="button"
              onClick={() => choose(optionIndex)}
              disabled={answered}
              className={`rounded-2xl border px-4 py-4 text-left text-base font-medium transition sm:px-5 ${
                showCorrect
                  ? "border-accent/40 bg-[var(--accent-soft)] text-accent"
                  : showWrong
                    ? "border-[var(--border)] bg-[var(--surface-2)] text-[var(--foreground-muted)] line-through"
                    : "border-[var(--border)] bg-white/70 text-foreground hover:border-accent/30"
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
        <div className="mt-6 flex flex-col gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-[var(--foreground-secondary)]">
            {question.tip}
          </p>
          <button
            type="button"
            onClick={next}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-deep)]"
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
    <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
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
              <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground sm:text-xl">
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
                <p className="pb-5 text-base leading-relaxed text-[var(--foreground-secondary)] sm:pb-6">
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
    <div className="organic-wash relative flex min-h-full flex-col overflow-x-hidden text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="animate-float absolute -left-40 -top-32 h-[520px] w-[520px] rounded-full bg-[var(--blush)]/40 blur-[100px]" />
        <div className="animate-float-delayed absolute -right-32 top-[30%] h-[460px] w-[460px] rounded-full bg-[var(--accent-soft)]/80 blur-[110px]" />
        <div className="animate-float absolute bottom-[6%] left-[20%] h-[380px] w-[380px] rounded-full bg-[var(--blush)]/30 blur-[90px]" />
      </div>

      <header className="fixed top-0 z-50 w-full px-4 pt-4 sm:px-8 sm:pt-5">
        <div className="soft-card mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full px-4 sm:px-5">
          <a
            href="#top"
            className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight text-foreground sm:text-base"
          >
            Spanish with <span className="text-accent">Monica</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--foreground-secondary)] transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-deep)]"
            >
              Book your lesson
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-foreground md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="soft-card mx-auto mt-2 max-w-7xl rounded-[1.75rem] px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-[var(--foreground-secondary)] hover:bg-[var(--accent-soft)] hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white"
              >
                Book your lesson
              </a>
            </nav>
          </div>
        )}
      </header>

      <main id="top" className="flex-1">
        <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32">
          <div className="relative mx-auto w-full max-w-7xl">
            <h1 className="animate-fade-up max-w-4xl font-[family-name:var(--font-display)] text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-7xl lg:text-[5rem]">
              Learn Spanish
              <br />
              that <span className="gradient-text">actually sticks.</span>
            </h1>

            <div className="animate-fade-up-delay-1 mt-8 flex max-w-5xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-md text-base leading-relaxed text-[var(--foreground-secondary)] sm:text-lg">
                Book a 1-on-1 lesson with Monica in seconds. Pick a time below—your Google
                Calendar and Meet link sync automatically.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#booking"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--accent-deep)]"
                >
                  Book your lesson
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <a
                  href="#packages"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/70 px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-accent/40"
                >
                  View Packages
                </a>
              </div>
            </div>

            <ul className="animate-fade-up-delay-2 mt-12 flex flex-col gap-4 border-t border-[var(--border)] pt-8 sm:flex-row sm:flex-wrap sm:gap-x-10">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 text-sm font-medium text-[var(--foreground-secondary)]"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-accent">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="booking" className="scroll-mt-24 px-4 pb-28 sm:px-8 sm:pb-32">
          <div className="mx-auto max-w-5xl">
            <SectionLabel>Book a lesson</SectionLabel>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Pick a time. Start speaking.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-[var(--foreground-secondary)]">
              Choose a slot below. You’ll get a Google Calendar invite and Google Meet
              link automatically.
            </p>
            <p className="mt-4 max-w-2xl rounded-2xl border border-[var(--border)] bg-white/60 px-4 py-3 text-sm leading-relaxed text-[var(--foreground-secondary)]">
              After you book, Monica will confirm on WhatsApp. Payment is by transfer or
              in person—nothing is charged online.
            </p>

            <div className="soft-card mt-10 overflow-hidden rounded-[2rem] p-2 sm:p-3">
              <div className="w-full overflow-visible rounded-[1.5rem] bg-white">
                <CalBooking />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 px-4 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <SectionLabel>About</SectionLabel>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Structured Spanish.
                <br />
                Human conversation.
              </h2>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-[var(--foreground-secondary)]">
                ¡Hola! I&apos;m Monica. I help English speakers move from A1 to C1 with
                conversation-first lessons—grammar when you need it, always tied to real
                speaking goals.
              </p>

              <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: MessageCircle, title: "Speak first", body: "Real dialogue from minute one" },
                  { icon: BookOpen, title: "Level-aligned", body: "Mapped to A1–C1 goals" },
                  { icon: Sparkles, title: "Clear progress", body: "You always know what’s next" },
                ].map(({ icon: Icon, title, body }) => (
                  <li key={title} className="rounded-3xl border border-[var(--border)] bg-white/50 p-5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-accent">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <p className="mt-4 font-semibold text-foreground">{title}</p>
                    <p className="mt-1 text-sm text-[var(--foreground-muted)]">{body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="levels" className="scroll-mt-24 px-4 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionLabel>Levels</SectionLabel>
            <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Official CEFR path. A1 to C1.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-[var(--foreground-secondary)]">
              CEFR stands for the Common European Framework of Reference for Languages—
              the same scale used by schools, employers, and official exams worldwide,
              turned into practical 1-on-1 lessons.
            </p>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {CEFR_LEVELS.map((level) => (
                <div
                  key={level.code}
                  className="soft-card rounded-[1.75rem] p-5 sm:p-6"
                >
                  <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-accent">
                    {level.code}
                  </p>
                  <h3 className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                    {level.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--foreground-secondary)]">
                    {level.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="practice" className="scroll-mt-24 px-4 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-3xl">
            <SectionLabel>Practice</SectionLabel>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Try a few level-based questions.
            </h2>
            <p className="mt-5 text-lg text-[var(--foreground-secondary)]">
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
            <SectionLabel>Packages</SectionLabel>
            <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Simple pricing. Clear next steps.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-[var(--foreground-secondary)]">
              Book one lesson anytime, or save with a pack of five—prices in Mexican pesos.
            </p>

            <div className="mt-14 grid gap-4 lg:grid-cols-2 lg:max-w-4xl">
              {PACKAGES.map((pkg) => (
                <article
                  key={pkg.name}
                  className={`flex flex-col rounded-[2rem] border p-6 sm:p-8 ${
                    pkg.highlighted
                      ? "border-accent/30 bg-accent text-white shadow-lg shadow-accent/15"
                      : "soft-card"
                  }`}
                >
                  {pkg.highlighted && (
                    <span className="mb-4 inline-flex w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                      Best value
                    </span>
                  )}
                  <div
                    className={`flex items-center gap-2 text-sm ${
                      pkg.highlighted ? "text-white/75" : "text-[var(--foreground-muted)]"
                    }`}
                  >
                    <Clock className="h-4 w-4" aria-hidden />
                    {pkg.duration}
                  </div>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold">
                    {pkg.name}
                  </h3>
                  <p className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
                    {pkg.price}
                    <span
                      className={`ml-2 text-base font-medium ${
                        pkg.highlighted ? "text-white/75" : "text-[var(--foreground-muted)]"
                      }`}
                    >
                      MXN
                    </span>
                  </p>
                  <p
                    className={`mt-1 text-sm ${
                      pkg.highlighted ? "text-white/70" : "text-[var(--foreground-muted)]"
                    }`}
                  >
                    {pkg.priceNote}
                  </p>
                  <p
                    className={`mt-4 flex-1 text-sm leading-relaxed ${
                      pkg.highlighted ? "text-white/80" : "text-[var(--foreground-secondary)]"
                    }`}
                  >
                    {pkg.description}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-2 text-sm ${
                          pkg.highlighted ? "text-white/90" : "text-foreground"
                        }`}
                      >
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            pkg.highlighted ? "text-white" : "text-accent"
                          }`}
                          aria-hidden
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#booking"
                    className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                      pkg.highlighted
                        ? "bg-white text-accent hover:bg-[var(--accent-soft)]"
                        : "bg-accent text-white hover:bg-[var(--accent-deep)]"
                    }`}
                  >
                    {pkg.cta}
                  </a>
                  {pkg.ctaNote && (
                    <p
                      className={`mt-3 text-center text-xs leading-relaxed ${
                        pkg.highlighted ? "text-white/70" : "text-[var(--foreground-muted)]"
                      }`}
                    >
                      {pkg.ctaNote}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 px-4 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Quick answers.
            </h2>
            <div className="mt-10">
              <FaqAccordion />
            </div>
          </div>
        </section>
      </main>

      {/* Sticky mobile booking bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-background/95 px-4 py-3 backdrop-blur-md md:hidden">
        <a
          href="#booking"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-white shadow-sm"
        >
          Book your lesson
          <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
      </div>

      <footer className="border-t border-[var(--border)] px-4 py-14 pb-28 sm:px-8 md:pb-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:justify-between">
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground">
              Spanish with <span className="text-accent">Monica</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--foreground-muted)]">
              Standard Spanish for English speakers—structured by CEFR levels A1–C1, with
              real conversation at the center.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href="mailto:hola@spanishwithmonica.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground-secondary)] transition hover:text-accent"
              >
                <Mail className="h-4 w-4" aria-hidden />
                psi.monicaramirezp@gmail.com
              </a>
              <a
                href="tel:+529511451717"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground-secondary)] transition hover:text-accent"
              >
                <Phone className="h-4 w-4" aria-hidden />
                +52 951 145 1717
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--foreground-muted)]">
              Quick links
            </p>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--foreground-secondary)] hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#booking"
                  className="text-sm text-[var(--foreground-secondary)] hover:text-accent"
                >
                  Book your lesson
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-7xl text-xs text-[var(--foreground-muted)]">
          © {new Date().getFullYear()} Spanish with Monica. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
