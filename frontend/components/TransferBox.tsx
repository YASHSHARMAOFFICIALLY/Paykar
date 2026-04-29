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
    <section className="panel grid gap-5">
      <div>
        <p className="eyebrow">Transfer</p>
        <h2 className="mt-2 text-2xl font-semibold">Send money</h2>
        <p className="muted mt-1 text-sm">
          Search a receiver and enter the amount.
        </p>
      </div>

      <UserSearch
        query={query}
        onQueryChange={onQueryChange}
        results={results}
        selectedUser={selectedUser}
        onSelectUser={onSelectUser}
        loading={searchLoading}
        error={searchError}
      />

      <div className="grid gap-4">
        <div className="rounded-lg border border-[#ead8d0] bg-[#fff7f4] p-4">
          <p className="text-sm text-[#7a6d68]">Selected receiver</p>
          <p className="mt-1 font-medium">
            {selectedUser
              ? `@${selectedUser.username} (${selectedUser.firstname} ${selectedUser.lastname})`
              : "None"}
          </p>
        </div>

        <label className="grid gap-1.5">
          <span className="text-sm font-medium text-neutral-700">Amount</span>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(event) => onAmountChange(event.target.value)}
            className="input"
          />
        </label>

        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="button-primary"
        >
          {loading ? "Sending..." : "Send money"}
        </button>

        {message ? <p className="success-text">{message}</p> : null}
        {error ? <p className="error-text">{error}</p> : null}
      </div>
    </section>
  );
}
