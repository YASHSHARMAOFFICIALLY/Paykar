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
      <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6f6166]">
        Receiver
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search username"
          className="min-h-14 rounded-2xl border border-[#f0d2db] bg-white px-4 text-base font-semibold text-[#242124] outline-none transition focus:border-[#ec407a]"
        />
      </label>

      <div className="rounded-[24px] border border-[#f8b4c6]/35 bg-[#fffafb] p-3">
        {loading ? (
          <p className="px-3 py-4 text-sm font-semibold text-[#666666]">
            Searching...
          </p>
        ) : null}

        {!loading && !query.trim() ? (
          <p className="px-3 py-4 text-sm font-semibold text-[#666666]">
            Start typing.
          </p>
        ) : null}

        {!loading && query.trim() && !results.length && !error ? (
          <p className="px-3 py-4 text-sm font-semibold text-[#666666]">
            No matching users found.
          </p>
        ) : null}

        {error ? (
          <p className="rounded-md border border-[#f7c4cd] bg-[#fff0f2] px-4 py-3 text-sm font-semibold text-[#a33a51]">
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
                    ? "border-[#ec407a] bg-[#fff0f5] shadow-[0_12px_28px_rgba(244,114,158,0.12)]"
                    : "border-transparent bg-white hover:border-[#f8b4c6]/60"
                }`}
              >
                <p className="text-base font-extrabold text-[#242124]">
                  @{user.username}
                </p>
                <p className="mt-2 text-sm font-semibold text-[#666666]">
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
