import Link from "next/link";

type AuthShowcaseProps = {
  mode: "signin" | "signup";
};

export function AuthShowcase({ mode }: AuthShowcaseProps) {
  return (
    <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#2f2329] via-[#3d2c34] to-[#523842] p-6 text-white shadow-[0_30px_90px_rgba(18,18,18,0.18)] lg:min-h-[380px] lg:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(248,180,198,0.26),_transparent_34%),linear-gradient(180deg,_rgba(255,255,255,0.06),_transparent)]" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold text-white">
            Paykar
          </Link>
          <span className="rounded-full border border-white/16 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
            Wallet Flow
          </span>
        </div>

        <div className="mt-14 max-w-md lg:mt-16">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f8b4c6]">
Paykar
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.02] text-white lg:text-4xl">
            {mode === "signin" ? "Welcome Back Log in to continue" : "Create Account on Paykar to send money"}
          </h2>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
           
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
