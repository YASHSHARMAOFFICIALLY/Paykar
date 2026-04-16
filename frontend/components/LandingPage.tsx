"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const features = [
  {
    title: "Instant Wallet Setup",
    description:
      "Create an account, receive a starting balance, and move into your wallet without extra setup.",
  },
  {
    title: "Focused Money Search",
    description:
      "Find people by username or first name before sending money, with clean receiver details.",
  },
  {
    title: "Protected Transfers",
    description:
      "JWT-secured balance checks and atomic account updates keep every payment flow deliberate.",
  },
];

const steps = ["Sign up", "Check balance", "Search receiver", "Send money"];

const testimonials = [
  {
    quote:
      "Paykar feels like the wallet flow every side project should have from day one.",
    name: "Fintech prototype builder",
  },
  {
    quote:
      "The search, balance, and transfer screens make the project easy to understand fast.",
    name: "Full-stack reviewer",
  },
  {
    quote:
      "A clean wallet demo with the right backend checks behind the simple interface.",
    name: "Payments engineering learner",
  },
  {
    quote:
      "It explains the product through the actual flow instead of a generic SaaS pitch.",
    name: "Project collaborator",
  },
];

export function LandingPage() {
  const marqueeItems = [...testimonials, ...testimonials];
  const shouldReduceMotion = useReducedMotion();
  const reveal: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };
  const transition: Transition = {
    duration: shouldReduceMotion ? 0 : 0.72,
    ease: [0.22, 1, 0.36, 1],
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#fdf6f9] text-[#1f1f1f] transition-colors duration-300 dark:bg-[#111111] dark:text-[#f6f1f3]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,180,198,0.34),_transparent_34%),linear-gradient(180deg,_#fffafb_0%,_#fdf6f9_52%,_#ffffff_100%)] dark:bg-[radial-gradient(circle_at_top,_rgba(248,180,198,0.13),_transparent_35%),linear-gradient(180deg,_#171214_0%,_#111111_55%,_#181818_100%)]" />
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[720px] w-full bg-[url('/assets/paykar-wallet-flow.svg')] bg-cover bg-center opacity-[0.18] mix-blend-multiply dark:opacity-[0.20] dark:mix-blend-screen"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1, 1.025, 1],
                  x: [0, -12, 0],
                }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,_rgba(244,114,158,0.2),_transparent_44%)] dark:bg-[radial-gradient(circle_at_top_center,_rgba(188,231,213,0.11),_transparent_44%)]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/60 backdrop-blur-md dark:border-white/10 dark:bg-[#111111]/70">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-8">
          <a href="#" className="text-xl font-bold text-[#242124] dark:text-white">
            Paykar
          </a>
          <div className="hidden items-center gap-8 text-sm font-semibold text-[#555555] md:flex dark:text-[#d5c9cd]">
            <a href="#features" className="transition hover:text-[#ec407a]">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-[#ec407a]">
              How It Works
            </a>
            <a href="#testimonials" className="transition hover:text-[#ec407a]">
              Testimonials
            </a>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              className="primary-button hidden px-5 py-3 text-sm sm:inline-flex"
              href="#get-started"
            >
              Explore Project
            </a>
          </div>
        </nav>
      </header>

      <section className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col items-center justify-center px-6 pb-14 pt-32 text-center lg:px-8">
        <motion.div
          className="max-w-5xl"
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={transition}
        >
          <p className="mx-auto mb-6 w-fit rounded-md border border-[#f8b4c6]/60 bg-white/70 px-4 py-2 text-sm font-semibold text-[#ec407a] shadow-[0_10px_30px_rgba(244,114,158,0.10)] dark:border-white/12 dark:bg-white/8 dark:text-[#f8b4c6]">
            Wallet transfer project
          </p>
          <h1 className="text-5xl font-extrabold leading-[1.06] text-[#1f1f1f] sm:text-6xl lg:text-7xl dark:text-white">
            Send Money Clearly. Move Fearlessly.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#555555] md:text-xl dark:text-[#d5c9cd]">
            Paykar is a focused wallet project for signup, balance checks, user
            search, and protected transfers.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.12 }}
        >
          <a className="primary-button w-full px-10 py-4 sm:w-auto" href="#get-started">
            Explore Project
          </a>
          <a
            href="#how-it-works"
            className="group inline-flex min-h-12 items-center justify-center px-3 text-base font-semibold text-[#333333] dark:text-[#f4edf0]"
          >
            See How It Works
            <span className="ml-2 h-px w-8 bg-[#ec407a] transition group-hover:w-12" />
          </a>
        </motion.div>

        <motion.p
          className="mt-8 text-sm font-medium text-[#666666] dark:text-[#c4b7bc]"
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.24 }}
        >
          Built as a practical full-stack payment flow, not a SaaS pricing page.
        </motion.p>

        <motion.div
          className="mt-14 w-full max-w-4xl rounded-lg border border-white/80 bg-white/72 p-4 shadow-[0_24px_70px_rgba(17,17,17,0.10)] backdrop-blur-md dark:border-white/10 dark:bg-white/8 dark:shadow-[0_24px_70px_rgba(0,0,0,0.36)]"
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.36 }}
          whileHover={shouldReduceMotion ? undefined : { y: -6 }}
        >
          <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-md bg-[#242124] p-6 text-left text-white dark:bg-[#f4edf0] dark:text-[#181314]">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70 dark:text-[#4d4447]">
                  Available balance
                </span>
                <span className="rounded-md bg-[#bce7d5] px-3 py-1 text-xs font-bold text-[#16392a]">
                  Live
                </span>
              </div>
              <p className="mt-8 text-5xl font-extrabold leading-none">Rs 7,500</p>
              <p className="mt-4 text-sm leading-6 text-white/68 dark:text-[#4d4447]">
                Protected by bearer-token auth and linked directly to your Paykar
                account.
              </p>
            </div>
            <div className="rounded-md bg-white p-6 text-left dark:bg-[#171717]">
              <p className="text-sm font-bold text-[#ec407a] dark:text-[#f8b4c6]">
                Quick transfer
              </p>
              <div className="mt-5 space-y-3">
                <div className="rounded-md border border-[#f8b4c6]/50 px-4 py-3 dark:border-white/10">
                  <p className="text-xs font-semibold text-[#777777] dark:text-[#c4b7bc]">
                    Receiver
                  </p>
                  <p className="mt-1 font-bold text-[#242124] dark:text-white">
                    @yashpay
                  </p>
                </div>
                <div className="rounded-md border border-[#f8b4c6]/50 px-4 py-3 dark:border-white/10">
                  <p className="text-xs font-semibold text-[#777777] dark:text-[#c4b7bc]">
                    Amount
                  </p>
                  <p className="mt-1 font-bold text-[#242124] dark:text-white">
                    Rs 1,200
                  </p>
                </div>
              </div>
              <button className="primary-button mt-5 w-full px-6 py-3" type="button">
                Send Money
              </button>
            </div>
          </div>
        </motion.div>

        <p className="mt-12 text-sm font-semibold text-[#777777] dark:text-[#c4b7bc]">
          Built for clear, reliable payment demos
        </p>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              className="rounded-lg border border-white/80 bg-white/68 p-7 shadow-[0_18px_48px_rgba(244,114,158,0.12)] backdrop-blur-md dark:border-white/10 dark:bg-white/8 dark:shadow-[0_18px_48px_rgba(0,0,0,0.22)]"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                ...transition,
                delay: shouldReduceMotion ? 0 : index * 0.08,
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -8 }}
            >
              <h2 className="text-2xl font-extrabold text-[#242124] dark:text-white">
                {feature.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-[#555555] dark:text-[#d5c9cd]">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-y border-[#f8b4c6]/25 bg-white/62 px-6 py-24 dark:border-white/10 dark:bg-white/5"
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase text-[#ec407a] dark:text-[#f8b4c6]">
            How It Works
          </p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#242124] md:text-5xl dark:text-white">
            Four steps from account to transfer.
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                className="rounded-lg border border-[#f8b4c6]/40 bg-white px-5 py-6 text-left shadow-[0_12px_36px_rgba(17,17,17,0.06)] dark:border-white/10 dark:bg-[#171717] dark:shadow-[0_12px_36px_rgba(0,0,0,0.24)]"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  ...transition,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                }}
              >
                <span className="text-sm font-bold text-[#f4729e]">
                  0{index + 1}
                </span>
                <p className="mt-4 text-lg font-extrabold text-[#242124] dark:text-white">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase text-[#ec407a] dark:text-[#f8b4c6]">
            Testimonials
          </p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#242124] md:text-5xl dark:text-white">
            Project feedback in motion.
          </h2>
        </div>
        <div className="testimonial-marquee mt-12 overflow-hidden">
          <div className="testimonial-track flex w-max gap-5">
            {marqueeItems.map((testimonial, index) => (
              <motion.figure
                key={`${testimonial.name}-${index}`}
                className="w-[280px] shrink-0 rounded-lg border border-white/80 bg-white/72 p-6 text-left shadow-[0_18px_48px_rgba(244,114,158,0.12)] backdrop-blur-md sm:w-[360px] dark:border-white/10 dark:bg-white/8 dark:shadow-[0_18px_48px_rgba(0,0,0,0.22)]"
                whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <blockquote className="text-lg font-extrabold leading-7 text-[#242124] dark:text-white">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <figcaption className="mt-5 text-sm font-semibold text-[#666666] dark:text-[#c4b7bc]">
                  {testimonial.name}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section id="get-started" className="px-6 pb-12">
        <div className="mx-auto max-w-5xl rounded-lg bg-[#242124] px-6 py-16 text-center text-white shadow-[0_24px_70px_rgba(17,17,17,0.16)] dark:bg-[#f4edf0] dark:text-[#181314]">
          <p className="text-sm font-bold uppercase text-[#f8b4c6] dark:text-[#a32756]">
            Open the wallet flow
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
            Explore signup, balance, search, and transfer in one project.
          </h2>
          <form className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="min-h-14 flex-1 rounded-md border border-white/20 bg-white px-4 text-base text-[#242124] outline-none transition placeholder:text-[#777777] focus:border-[#f8b4c6] dark:border-[#ded2d6]"
            />
            <button className="primary-button px-8 py-4" type="submit">
              Get Project Updates
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
