"use client";

type BalanceCardProps = {
  balance: number | null;
  loading: boolean;
  error: string | null;
  hasToken: boolean;
  onRefresh: () => void;
};

export function BalanceCard({
  balance,
  loading,
  error,
  hasToken,
  onRefresh,
}: BalanceCardProps) {
  return (
    <section className="rounded-[34px] bg-[#242124] p-8 text-white shadow-[0_24px_70px_rgba(17,17,17,0.18)] dark:bg-[#f4edf0] dark:text-[#181314] lg:p-10">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f8b4c6] dark:text-[#a32756]">
            Wallet
          </p>
          <h2 className="mt-8 text-6xl font-extrabold leading-none sm:text-7xl">
            {loading ? "Loading..." : balance !== null ? `Rs ${balance}` : "Rs --"}
          </h2>
          <p className="mt-4 text-sm font-semibold text-white/68 dark:text-[#544b4f]">
            Available balance
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="primary-button px-6 py-3"
          disabled={loading || !hasToken}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {!hasToken ? (
        <p className="mt-8 rounded-2xl border border-white/10 bg-white/8 px-4 py-4 text-sm font-semibold text-white/78 dark:border-[#d7c7cc] dark:bg-white dark:text-[#544b4f]">
          Add token to unlock balance.
        </p>
      ) : null}

      {error ? (
        <p className="mt-8 rounded-2xl border border-[#f7c4cd] bg-[#fff0f2] px-4 py-4 text-sm font-semibold text-[#a33a51] dark:border-[#5f2632] dark:bg-[#2b1218] dark:text-[#ffbecd]">
          {error}
        </p>
      ) : null}

      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        <Stat label="Sent" value="18" />
        <Stat label="Received" value="27" />
        <Stat label="Monthly" value="Rs 32k" />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/8 px-4 py-4 dark:border-[#d7c7cc] dark:bg-white">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45 dark:text-[#7d6f75]">
        {label}
      </p>
      <p className="mt-3 text-xl font-extrabold text-white dark:text-[#181314]">
        {value}
      </p>
    </div>
  );
}
