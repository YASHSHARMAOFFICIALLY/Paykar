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
  const balanceTone =
    balance === null
      ? "from-[#fff7fa] via-white to-[#fff2f6] text-[#242124] border-[#f3d8e1]"
      : balance >= 5000
        ? "from-[#fff7fb] via-[#fff3f8] to-[#eefaf4] text-[#242124] border-[#f3d8e1]"
        : "from-[#fff8f2] via-white to-[#fff1f4] text-[#242124] border-[#f1ddd2]";

  return (
    <section
      className={`rounded-[34px] border bg-gradient-to-br p-8 shadow-[0_24px_70px_rgba(17,17,17,0.10)] ${balanceTone} lg:p-10`}
    >
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#c34372]">
            Wallet
          </p>
          <h2 className="mt-6 text-4xl font-extrabold leading-[0.95] sm:text-5xl">
            {loading ? "Loading..." : balance !== null ? `Rs ${balance}` : "Rs --"}
          </h2>
          <p className="mt-3 text-sm font-semibold text-[#6b5f63]">
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
        <p className="mt-8 rounded-2xl border border-[#edd6dd] bg-white/75 px-4 py-4 text-sm font-semibold text-[#6b5f63]">
          Add token to unlock balance.
        </p>
      ) : null}

      {error ? (
        <p className="mt-8 rounded-2xl border border-[#f7c4cd] bg-[#fff0f2] px-4 py-4 text-sm font-semibold text-[#a33a51]">
          {error}
        </p>
      ) : null}

      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        <Stat label="Sent" value="18" accent="rose" />
        <Stat label="Received" value="27" accent="mint" />
        <Stat label="Monthly" value="Rs 32k" accent="amber" />
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "rose" | "mint" | "amber";
}) {
  const accentClasses = {
    rose: "from-[#fff4f8] to-white",
    mint: "from-[#f2fbf6] to-white",
    amber: "from-[#fff8ef] to-white",
  };

  return (
    <div
      className={`rounded-[24px] border border-white/60 bg-gradient-to-br px-4 py-4 shadow-[0_10px_30px_rgba(17,17,17,0.05)] ${accentClasses[accent]}`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8d7d83]">
        {label}
      </p>
      <p className="mt-2 text-lg font-extrabold text-[#242124]">
        {value}
      </p>
    </div>
  );
}
