"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { BalanceCard } from "./BalanceCard";
import { TransactionList } from "./TransactionList";
import { TransferBox } from "./TransferBox";

type SearchUser = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
};

const activity = [
  {
    id: "1",
    title: "Sent to @yashpay",
    description: "Rs 1,200",
    tone: "success" as const,
    timestamp: "09:24",
  },
  {
    id: "2",
    title: "Received from @sana.dev",
    description: "Rs 880",
    tone: "info" as const,
    timestamp: "Yesterday",
  },
  {
    id: "3",
    title: "Transfer failed",
    description: "Rs 5,000",
    tone: "error" as const,
    timestamp: "Apr 16",
  },
];

export function DashboardScreen() {
  const [token, setToken] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<SearchUser | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [amount, setAmount] = useState("1200");
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferMessage, setTransferMessage] = useState<string | null>(null);
  const [transferError, setTransferError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const savedToken = window.localStorage.getItem("paykar_token") ?? "";
    setToken(savedToken);
  }, []);

  useEffect(() => {
    if (!token) {
      setBalance(null);
      setBalanceError(null);
      return;
    }

    void loadBalance(token);
  }, [token]);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setResults([]);
      setSelectedUser(null);
      setSearchError(null);
      setSearchLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      void searchUsers(trimmedQuery, controller.signal);
    }, 300);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  async function loadBalance(authToken: string) {
    setBalanceLoading(true);
    setBalanceError(null);

    try {
      const response = await fetch(`/api/account/balance`, {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error ?? "Unable to load balance");
      }

      setBalance(typeof data?.balance === "number" ? data.balance : null);
    } catch (error) {
      setBalanceError(error instanceof Error ? error.message : "Unable to load balance");
    } finally {
      setBalanceLoading(false);
    }
  }

  async function searchUsers(searchQuery: string, signal: AbortSignal) {
    setSearchLoading(true);
    setSearchError(null);

    try {
      const response = await fetch(`/api/user/search?query=${encodeURIComponent(searchQuery)}`, {
        signal,
      });

      const data = await response.json().catch(() => []);

      if (!response.ok) {
        throw new Error("Unable to search users");
      }

      setResults(Array.isArray(data) ? data : []);
    } catch (error) {
      if (signal.aborted) {
        return;
      }

      setResults([]);
      setSearchError(error instanceof Error ? error.message : "Unable to search users");
    } finally {
      if (!signal.aborted) {
        setSearchLoading(false);
      }
    }
  }

  async function handleTransfer() {
    setTransferMessage(null);
    setTransferError(null);

    if (!token) {
      setTransferError("Sign in first so a token is available.");
      return;
    }

    if (!selectedUser) {
      setTransferError("Select a receiver first.");
      return;
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setTransferError("Enter a valid amount.");
      return;
    }

    setTransferLoading(true);

    try {
      const response = await fetch(`/api/account/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          toUserId: selectedUser.id,
          amount: numericAmount,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error ?? "Transfer failed");
      }

      setTransferMessage(data?.message ?? "Transfer successful");
      await loadBalance(token);
    } catch (error) {
      setTransferError(error instanceof Error ? error.message : "Transfer failed");
    } finally {
      setTransferLoading(false);
    }
  }

  const contacts = results.slice(0, 3).map((user) => ({
    username: user.username,
    name: `${user.firstname} ${user.lastname}`,
  }));

  return (
    <main className="min-h-screen overflow-hidden bg-[#fdf6f9] text-[#1f1f1f] transition-colors duration-300 dark:bg-[#111111] dark:text-[#f6f1f3]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,180,198,0.34),_transparent_34%),linear-gradient(180deg,_#fffafb_0%,_#fdf6f9_52%,_#ffffff_100%)] dark:bg-[radial-gradient(circle_at_top,_rgba(248,180,198,0.13),_transparent_35%),linear-gradient(180deg,_#171214_0%,_#111111_55%,_#181818_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,_rgba(244,114,158,0.18),_transparent_44%)] dark:bg-[radial-gradient(circle_at_top_center,_rgba(188,231,213,0.11),_transparent_44%)]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/60 backdrop-blur-md dark:border-white/10 dark:bg-[#111111]/70">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold text-[#242124] dark:text-white">
            Paykar
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/signin"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#efc4d0] bg-white/70 px-5 text-sm font-bold text-[#242124] shadow-[0_10px_30px_rgba(18,18,18,0.08)] transition hover:-translate-y-0.5 dark:border-white/12 dark:bg-white/8 dark:text-white"
            >
              Sign in
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-28 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-8">
            <div className="relative overflow-hidden rounded-[40px] bg-[#242124] p-8 text-white shadow-[0_28px_90px_rgba(18,18,18,0.16)] dark:bg-[#171315] lg:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(248,180,198,0.24),_transparent_36%),linear-gradient(135deg,_rgba(255,255,255,0.06),_transparent_45%)]" />
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f8b4c6]">
                  Dashboard
                </p>
                <h1 className="mt-5 text-5xl font-extrabold leading-[0.94] text-white lg:text-7xl">
                  Move money
                  <br />
                  without noise.
                </h1>
                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  <HeroStat label="Volume" value="Rs 32k" />
                  <HeroStat label="Success" value="98.4%" />
                  <HeroStat label="Contacts" value="124" />
                </div>
              </div>
            </div>

            <BalanceCard
              balance={balance}
              loading={balanceLoading}
              error={balanceError}
              hasToken={Boolean(token)}
              onRefresh={() => {
                if (token) {
                  void loadBalance(token);
                }
              }}
            />

            <TransferBox
              query={query}
              onQueryChange={(value) => {
                setQuery(value);
                setTransferMessage(null);
                setTransferError(null);
              }}
              results={results}
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
              searchLoading={searchLoading}
              searchError={searchError}
              amount={amount}
              onAmountChange={setAmount}
              onSubmit={() => {
                void handleTransfer();
              }}
              loading={transferLoading}
              message={transferMessage}
              error={transferError}
            />
          </div>

          <div className="grid gap-8">
            <div className="rounded-[34px] border border-white/80 bg-white/72 p-7 shadow-[0_20px_60px_rgba(18,18,18,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-white/8 lg:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ec407a] dark:text-[#f8b4c6]">
                    Contacts
                  </p>
                  <h2 className="mt-4 text-3xl font-extrabold text-[#242124] dark:text-white">
                    Frequent
                  </h2>
                </div>
              </div>
              <div className="mt-8 grid gap-3">
                {contacts.map((contact, index) => (
                  <div
                    key={contact.username}
                    className={`flex items-center justify-between rounded-[22px] border px-5 py-4 ${
                      index === 0
                        ? "border-[#ec407a]/25 bg-[#fff1f6] dark:border-[#f8b4c6]/20 dark:bg-[#22171b]"
                        : "border-[#f2d2dc] bg-[#fffafb] dark:border-white/10 dark:bg-[#171717]"
                    }`}
                  >
                    <div>
                      <p className="text-base font-extrabold text-[#242124] dark:text-white">
                        @{contact.username}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#7b6f73] dark:text-[#bfb2b7]">
                        {contact.name}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="rounded-full border border-[#efc4d0] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#242124] transition hover:bg-[#fff2f6] dark:border-white/10 dark:text-white dark:hover:bg-white/8"
                    >
                      Pay
                    </button>
                  </div>
                ))}
                {!contacts.length ? (
                  <p className="rounded-[22px] border border-[#f2d2dc] bg-[#fffafb] px-5 py-4 text-sm font-semibold text-[#7b6f73] dark:border-white/10 dark:bg-[#171717] dark:text-[#bfb2b7]">
                    Search for users to load live contacts from the backend.
                  </p>
                ) : null}
              </div>
            </div>

            <TransactionList items={activity} />
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-white/8 px-4 py-4 backdrop-blur-sm">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">
        {label}
      </p>
      <p className="mt-3 text-2xl font-extrabold text-white">{value}</p>
    </div>
  );
}
