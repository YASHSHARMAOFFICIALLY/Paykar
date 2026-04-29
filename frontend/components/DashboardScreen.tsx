"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BalanceCard } from "./BalanceCard";
import { TransferBox } from "./TransferBox";

type SearchUser = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
};

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
  const [amount, setAmount] = useState("");
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferMessage, setTransferMessage] = useState<string | null>(null);
  const [transferError, setTransferError] = useState<string | null>(null);

  useEffect(() => {
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
      const response = await fetch("/api/account/balance", {
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
      setTransferError("Sign in first.");
      return;
    }

    if (!selectedUser) {
      setTransferError("Select a receiver.");
      return;
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setTransferError("Enter a valid amount.");
      return;
    }

    setTransferLoading(true);

    try {
      const response = await fetch("/api/account/transfer", {
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
      setAmount("");
      await loadBalance(token);
    } catch (error) {
      setTransferError(error instanceof Error ? error.message : "Transfer failed");
    } finally {
      setTransferLoading(false);
    }
  }

  function signOut() {
    window.localStorage.removeItem("paykar_token");
    setToken("");
    setBalance(null);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-[#ead8d0] bg-white/75 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="font-semibold">
            Paykar
          </Link>
          {token ? (
            <button type="button" onClick={signOut} className="button-secondary">
              Sign out
            </button>
          ) : (
            <Link href="/signin" className="button-secondary">
              Sign in
            </Link>
          )}
        </nav>
      </header>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 py-8">
        <div className="panel bg-white/90">
          <p className="eyebrow">
            Dashboard
          </p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
            <div>
              <h1 className="text-4xl font-semibold text-[#221b19]">Wallet</h1>
              <p className="muted mt-3 max-w-xl text-sm leading-6">
                Check your balance, find a receiver, and send money from one
                place.
              </p>
            </div>
            <div className="rounded-lg border border-[#d6eadf] bg-[#f2fbf6] px-4 py-3">
              <p className="text-xs text-[#66766e]">Session</p>
              <p className="mt-1 font-semibold text-[#1f3d31]">
                {token ? "Signed in" : "Signed out"}
              </p>
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
      </section>
    </main>
  );
}
