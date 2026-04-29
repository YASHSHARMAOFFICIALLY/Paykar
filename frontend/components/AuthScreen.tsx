import Link from "next/link";
import { AuthForm } from "./AuthForm";

export function AuthScreen({ mode }: { mode: "signin" | "signup" }) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto grid min-h-screen max-w-5xl items-center gap-8 px-6 py-12 lg:grid-cols-[0.85fr_1fr]">
        <div className="hidden lg:block">
          <Link href="/" className="eyebrow">
            Paykar
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            {mode === "signin" ? "Welcome back." : "Create your wallet."}
          </h1>
          <p className="muted mt-4 max-w-sm leading-7">
            Sign in to view your wallet, check your balance, search receivers,
            and send money.
          </p>
        </div>

        <div>
          <Link href="/" className="mb-6 inline-flex text-sm font-semibold text-neutral-500 lg:hidden">
            Paykar
          </Link>
          <AuthForm mode={mode} />
        </div>
      </section>
    </main>
  );
}
