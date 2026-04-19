"use client";

type AuthMode = "signin" | "signup";

type AuthPanelProps = {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  form: {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
  };
  onFieldChange: (field: string, value: string) => void;
  onSubmit: (mode: AuthMode) => void;
  loading: boolean;
  message: string | null;
  error: string | null;
  token: string;
  onTokenChange: (value: string) => void;
  onUseSavedSession: () => void;
  hasSavedSession: boolean;
};

export function AuthPanel({
  mode,
  onModeChange,
  form,
  onFieldChange,
  onSubmit,
  loading,
  message,
  error,
  token,
  onTokenChange,
  onUseSavedSession,
  hasSavedSession,
}: AuthPanelProps) {
  return (
    <section className="rounded-[28px] border border-white/80 bg-white/72 p-7 shadow-[0_18px_48px_rgba(244,114,158,0.12)] backdrop-blur-md dark:border-white/10 dark:bg-white/8 dark:shadow-[0_18px_48px_rgba(0,0,0,0.22)] lg:p-9">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ec407a] dark:text-[#f8b4c6]">
            Access
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] text-[#242124] dark:text-white md:text-4xl">
            Sign in
          </h2>
          <p className="mt-3 text-sm font-semibold text-[#7a6e72] dark:text-[#bfb2b7]">
            {mode === "signin" ? "Use an existing account." : "Create a new account."}
          </p>
        </div>
        <div className="inline-flex rounded-full border border-[#f8b4c6]/50 bg-[#fff6fa] p-1 dark:border-white/10 dark:bg-[#171717]">
          <button
            type="button"
            onClick={() => onModeChange("signin")}
            className={`rounded-full px-5 py-3 text-sm font-bold transition ${
              mode === "signin"
                ? "bg-[#242124] text-white dark:bg-[#f4edf0] dark:text-[#181314]"
                : "text-[#6d6266] dark:text-[#c4b7bc]"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => onModeChange("signup")}
            className={`rounded-full px-5 py-3 text-sm font-bold transition ${
              mode === "signup"
                ? "bg-[#242124] text-white dark:bg-[#f4edf0] dark:text-[#181314]"
                : "text-[#6d6266] dark:text-[#c4b7bc]"
            }`}
          >
            Sign up
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-[1.1fr_0.82fr]">
        <form
          className="grid gap-5 rounded-[24px] border border-[#f8b4c6]/35 bg-[#fffafb] p-6 dark:border-white/10 dark:bg-[#171717] lg:p-7"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(mode);
          }}
        >
          {mode === "signup" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6f6166] dark:text-[#cbbfc4]">
                First name
                <input
                  value={form.firstname}
                  onChange={(event) =>
                    onFieldChange("firstname", event.target.value)
                  }
                  className="min-h-14 rounded-2xl border border-[#f0d2db] bg-white px-4 text-base font-semibold text-[#242124] outline-none transition focus:border-[#ec407a] dark:border-white/10 dark:bg-[#111111] dark:text-white"
                />
              </label>
              <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6f6166] dark:text-[#cbbfc4]">
                Last name
                <input
                  value={form.lastname}
                  onChange={(event) =>
                    onFieldChange("lastname", event.target.value)
                  }
                  className="min-h-14 rounded-2xl border border-[#f0d2db] bg-white px-4 text-base font-semibold text-[#242124] outline-none transition focus:border-[#ec407a] dark:border-white/10 dark:bg-[#111111] dark:text-white"
                />
              </label>
            </div>
          ) : null}

          {mode === "signup" ? (
            <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6f6166] dark:text-[#cbbfc4]">
              Email
              <input
                type="email"
                value={form.email}
                onChange={(event) => onFieldChange("email", event.target.value)}
                className="min-h-14 rounded-2xl border border-[#f0d2db] bg-white px-4 text-base font-semibold text-[#242124] outline-none transition focus:border-[#ec407a] dark:border-white/10 dark:bg-[#111111] dark:text-white"
              />
            </label>
          ) : null}

          <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6f6166] dark:text-[#cbbfc4]">
            Username
            <input
              value={form.username}
              onChange={(event) => onFieldChange("username", event.target.value)}
              className="min-h-14 rounded-2xl border border-[#f0d2db] bg-white px-4 text-base font-semibold text-[#242124] outline-none transition focus:border-[#ec407a] dark:border-white/10 dark:bg-[#111111] dark:text-white"
            />
          </label>

          <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6f6166] dark:text-[#cbbfc4]">
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) => onFieldChange("password", event.target.value)}
              className="min-h-14 rounded-2xl border border-[#f0d2db] bg-white px-4 text-base font-semibold text-[#242124] outline-none transition focus:border-[#ec407a] dark:border-white/10 dark:bg-[#111111] dark:text-white"
            />
          </label>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <button className="primary-button px-8 py-4" disabled={loading} type="submit">
              {loading ? "Working..." : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
            {hasSavedSession ? (
              <button
                type="button"
                onClick={onUseSavedSession}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#efc4d0] bg-white/70 px-5 text-sm font-bold text-[#242124] shadow-[0_10px_30px_rgba(18,18,18,0.08)] transition hover:-translate-y-0.5 dark:border-white/12 dark:bg-white/8 dark:text-white"
              >
                Use Saved
              </button>
            ) : null}
          </div>

          {message ? (
            <p className="rounded-md border border-[#bce7d5] bg-[#edf9f3] px-4 py-3 text-sm font-semibold text-[#1a5a40] dark:border-[#315849] dark:bg-[#10261c] dark:text-[#bce7d5]">
              {message}
            </p>
          ) : null}

          {error ? (
            <p className="rounded-md border border-[#f7c4cd] bg-[#fff0f2] px-4 py-3 text-sm font-semibold text-[#a33a51] dark:border-[#5f2632] dark:bg-[#2b1218] dark:text-[#ffbecd]">
              {error}
            </p>
          ) : null}
        </form>

        <div className="rounded-[24px] bg-[#242124] p-6 text-white dark:bg-[#f4edf0] dark:text-[#181314] lg:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f8b4c6] dark:text-[#a32756]">
            Token
          </p>
          <p className="mt-4 text-sm font-semibold text-white/68 dark:text-[#5b5055]">
            Paste or reuse session token.
          </p>
          <textarea
            value={token}
            onChange={(event) => onTokenChange(event.target.value)}
            placeholder="Paste token"
            className="mt-6 min-h-52 w-full rounded-[22px] border border-white/10 bg-white/8 px-5 py-5 text-sm font-semibold text-white outline-none transition placeholder:text-white/35 focus:border-[#f8b4c6] dark:border-[#d7c7cc] dark:bg-white dark:text-[#181314] dark:placeholder:text-[#968b90]"
          />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-white/52 dark:text-[#786d72]">
            Required for balance and transfer
          </p>
        </div>
      </div>
    </section>
  );
}
