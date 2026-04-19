import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

type AuthShowcaseProps = {
  mode: "signin" | "signup";
};

export function AuthShowcase({ mode }: AuthShowcaseProps) {
  return (
    <div className="relative overflow-hidden rounded-[36px] bg-[#242124] p-6 text-white shadow-[0_30px_90px_rgba(18,18,18,0.18)] dark:bg-[#161214] lg:min-h-[680px] lg:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(248,180,198,0.26),_transparent_34%),linear-gradient(180deg,_rgba(255,255,255,0.06),_transparent)]" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold text-white">
            Paykar
          </Link>
          <ThemeToggle />
        </div>

        <div className="mt-14 max-w-md lg:mt-16">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f8b4c6]">
            Resume Wallet Project
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.02] text-white lg:text-4xl">
            {mode === "signin" ? "Money UI with a sharp first impression." : "A signup flow that looks hired, not generated."}
          </h2>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
            Same type, same palette, cleaner structure.
          </p>
        </div>

        <div className="mt-auto pt-10">
          <div className="grid gap-4">
            <div className="rounded-[28px] border border-white/10 bg-white/8 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/52">
                  Balance
                </span>
                <span className="rounded-full bg-[#bce7d5] px-3 py-1 text-[11px] font-bold text-[#143528]">
                  Live Feel
                </span>
              </div>
              <p className="mt-6 text-4xl font-extrabold leading-none lg:text-5xl">Rs 7,500</p>
              <div className="mt-6 flex gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/14 px-4 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">
                    Sent
                  </p>
                  <p className="mt-2 text-lg font-extrabold">18</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/14 px-4 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">
                    Contacts
                  </p>
                  <p className="mt-2 text-lg font-extrabold">124</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <MiniCard label="Receiver" value="@yashpay" />
              <MiniCard label="Amount" value="Rs 1200" />
              <MiniCard label="Status" value="Ready" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">
        {label}
      </p>
      <p className="mt-2.5 text-sm font-extrabold text-white">{value}</p>
    </div>
  );
}
