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
    <section className="panel">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Balance</p>
          <h2 className="mt-3 text-4xl font-semibold">
            {loading ? "Loading..." : balance !== null ? `Rs ${balance}` : "Rs --"}
          </h2>
          <p className="muted mt-2 text-sm">Available to send.</p>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="button-secondary"
          disabled={loading || !hasToken}
        >
          Refresh
        </button>
      </div>

      {!hasToken ? (
        <p className="mt-4 text-sm text-neutral-600">Sign in to load balance.</p>
      ) : null}

      {error ? <p className="error-text mt-4">{error}</p> : null}
    </section>
  );
}
