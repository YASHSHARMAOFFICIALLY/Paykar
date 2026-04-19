"use client";

import { UserSearch } from "./UserSearch";

type SearchUser = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
};

type TransferBoxProps = {
  query: string;
  onQueryChange: (value: string) => void;
  results: SearchUser[];
  selectedUser: SearchUser | null;
  onSelectUser: (user: SearchUser) => void;
  searchLoading: boolean;
  searchError: string | null;
  amount: string;
  onAmountChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  message: string | null;
  error: string | null;
};

export function TransferBox({
  query,
  onQueryChange,
  results,
  selectedUser,
  onSelectUser,
  searchLoading,
  searchError,
  amount,
  onAmountChange,
  onSubmit,
  loading,
  message,
  error,
}: TransferBoxProps) {
  return (
    <section className="rounded-[34px] border border-white/80 bg-white/72 p-7 shadow-[0_18px_48px_rgba(244,114,158,0.12)] backdrop-blur-md lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ec407a]">
            Transfer
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.04] text-[#242124] md:text-4xl">
            Quick pay
          </h2>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <UserSearch
          query={query}
          onQueryChange={onQueryChange}
          results={results}
          selectedUser={selectedUser}
          onSelectUser={onSelectUser}
          loading={searchLoading}
          error={searchError}
        />

        <div className="rounded-[28px] bg-gradient-to-br from-[#35272e] via-[#403038] to-[#4b3942] p-6 text-white lg:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f8b4c6]">
            Details
          </p>

          <div className="mt-6 rounded-[22px] border border-white/10 bg-white/8 px-5 py-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/52">Receiver</p>
            <p className="mt-3 text-2xl font-extrabold">
              {selectedUser ? `@${selectedUser.username}` : "@yashpay"}
            </p>
            <p className="mt-2 text-sm font-semibold text-white/65">
              {selectedUser
                ? `${selectedUser.firstname} ${selectedUser.lastname}`
                : "Yash Sharma"}
            </p>
          </div>

          <label className="mt-6 grid gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/70">
            Amount
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(event) => onAmountChange(event.target.value)}
              className="min-h-14 rounded-2xl border border-white/10 bg-white px-4 text-base font-semibold text-[#181314] outline-none transition focus:border-[#f8b4c6]"
            />
          </label>

          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="primary-button mt-6 w-full px-6 py-3"
          >
            {loading ? "Sending..." : "Send"}
          </button>

          {message ? (
            <p className="mt-5 rounded-2xl border border-[#bce7d5] bg-[#edf9f3] px-4 py-4 text-sm font-semibold text-[#1a5a40]">
              {message}
            </p>
          ) : null}

          {error ? (
            <p className="mt-5 rounded-2xl border border-[#f7c4cd] bg-[#fff0f2] px-4 py-4 text-sm font-semibold text-[#a33a51]">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
