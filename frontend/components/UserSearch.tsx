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
    <div className="grid gap-3">
      <label className="grid gap-1.5">
        <span className="text-sm font-medium text-neutral-700">Receiver</span>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search username"
          className="input"
        />
      </label>

      {loading ? <p className="text-sm text-neutral-600">Searching...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}

      {!loading && query.trim() && !results.length && !error ? (
        <p className="text-sm text-neutral-600">No users found.</p>
      ) : null}

      <div className="grid gap-2">
        {results.map((user) => {
          const isSelected = user.id === selectedUser?.id;

          return (
            <button
              key={user.id}
              type="button"
              onClick={() => onSelectUser(user)}
              className={`rounded-md border px-4 py-3 text-left ${
                isSelected
                  ? "border-[#ef5b3f] bg-[#fff1ec]"
                  : "border-[#ead8d0] bg-white hover:border-[#d6b9ae]"
              }`}
            >
              <p className="font-medium">@{user.username}</p>
              <p className="mt-1 text-sm text-neutral-600">
                {user.firstname} {user.lastname}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
