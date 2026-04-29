import Link from "next/link";

export function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="eyebrow">Paykar wallet</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
            Send money with Paykar.
          </h1>
          <p className="muted mt-5 max-w-2xl text-lg leading-8">
            Create an account, check your balance, find a receiver, and complete
            transfers from one simple wallet.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="button-primary" href="/signup">
              Create account
            </Link>
            <Link className="button-secondary" href="/signin">
              Sign in
            </Link>
          </div>
        </div>

        <div className="panel bg-white/90">
          <div className="flex items-center justify-between border-b border-[#ead8d0] pb-5">
            <div>
              <p className="text-sm text-[#7a6d68]">Wallet</p>
              <p className="mt-1 text-3xl font-semibold text-[#221b19]">
                Paykar
              </p>
            </div>
            <span className="rounded-md border border-[#f1c9bb] bg-[#fff1ec] px-3 py-1 text-sm font-medium text-[#be3b24]">
              Ready
            </span>
          </div>

          <div className="mt-8 grid gap-4">
            <div className="rounded-lg border border-[#ead8d0] bg-[#fff7f4] p-5">
              <p className="text-sm text-[#7a6d68]">Pay</p>
              <p className="mt-2 text-xl font-semibold text-[#221b19]">
                Sign in, search receiver, send money
              </p>
            </div>
            <div className="rounded-lg border border-[#d6eadf] bg-[#f2fbf6] p-5">
              <p className="text-sm text-[#66766e]">Wallet</p>
              <p className="mt-2 text-xl font-semibold text-[#1f3d31]">
                Balance and transfers in one place
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
