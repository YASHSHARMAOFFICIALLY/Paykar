"use client";

type SearchUser = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
};

type UserSearchProps = {
  query: string;
  onQueryChange: (value: string) => void;
  results: SearchUser[];
  selectedUser: SearchUser | null;
  onSelectUser: (user: SearchUser) => void;
  loading: boolean;
  error: string | null;
};

export function UserSearch({
  query,
  onQueryChange,
  results,
  selectedUser,
  onSelectUser,
  loading,
  error,
}: UserSearchProps) {
  return (
    <div className="grid gap-5">
      <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6f6166] dark:text-[#cbbfc4]">
        Receiver
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search username"
          className="min-h-14 rounded-2xl border border-[#f0d2db] bg-white px-4 text-base font-semibold text-[#242124] outline-none transition focus:border-[#ec407a] dark:border-white/10 dark:bg-[#111111] dark:text-white"
        />
      </label>

      <div className="rounded-[24px] border border-[#f8b4c6]/35 bg-[#fffafb] p-3 dark:border-white/10 dark:bg-[#171717]">
        {loading ? (
          <p className="px-3 py-4 text-sm font-semibold text-[#666666] dark:text-[#c4b7bc]">
            Searching...
          </p>
        ) : null}

        {!loading && !query.trim() ? (
          <p className="px-3 py-4 text-sm font-semibold text-[#666666] dark:text-[#c4b7bc]">
            Start typing.
          </p>
        ) : null}

        {!loading && query.trim() && !results.length && !error ? (
          <p className="px-3 py-4 text-sm font-semibold text-[#666666] dark:text-[#c4b7bc]">
            No matching users found.
          </p>
        ) : null}

        {error ? (
          <p className="rounded-md border border-[#f7c4cd] bg-[#fff0f2] px-4 py-3 text-sm font-semibold text-[#a33a51] dark:border-[#5f2632] dark:bg-[#2b1218] dark:text-[#ffbecd]">
            {error}
          </p>
        ) : null}

        <div className="grid gap-2">
          {results.map((user) => {
            const isSelected = user.id === selectedUser?.id;

            return (
              <button
                key={user.id}
                type="button"
                onClick={() => onSelectUser(user)}
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  isSelected
                    ? "border-[#ec407a] bg-[#fff0f5] shadow-[0_12px_28px_rgba(244,114,158,0.12)] dark:border-[#f8b4c6] dark:bg-white/10"
                    : "border-transparent bg-white hover:border-[#f8b4c6]/60 dark:bg-[#111111] dark:hover:border-white/12"
                }`}
              >
                <p className="text-base font-extrabold text-[#242124] dark:text-white">
                  @{user.username}
                </p>
                <p className="mt-2 text-sm font-semibold text-[#666666] dark:text-[#c4b7bc]">
                  {user.firstname} {user.lastname}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
