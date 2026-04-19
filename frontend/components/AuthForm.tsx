"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AuthMode, AuthValues } from "@/lib/auth-validation";
import { validateAuthValues } from "@/lib/auth-validation";

type AuthFormProps = {
  mode: AuthMode;
};

const initialValues: AuthValues = {
  username: "",
  password: "",
  firstname: "",
  lastname: "",
  email: "",
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);

  const errors = validateAuthValues(mode, values);

  function updateValue(field: keyof AuthValues, value: string) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setMessage(null);
    setRequestError(null);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const payload =
        mode === "signin"
          ? {
              username: values.username.trim(),
              password: values.password,
            }
          : {
              firstname: values.firstname.trim(),
              lastname: values.lastname.trim(),
              email: values.email.trim(),
              username: values.username.trim(),
              password: values.password,
            };

      const response = await fetch(
        `/api/auth/${mode === "signin" ? "signin" : "signup"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error?.formErrors?.[0] ?? data?.error ?? "Request failed");
      }

      if (mode === "signin") {
        if (typeof window !== "undefined" && data?.token) {
          window.localStorage.setItem("paykar_token", data.token);
        }

        router.push("/wallet");
        return;
      }

      setMessage(data?.message ?? "Account created successfully");
      setValues(initialValues);
      setSubmitted(false);
      router.push("/signin");
    } catch (error) {
      setRequestError(
        error instanceof Error ? error.message : "Unable to complete request",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[32px] border border-white/80 bg-white/74 p-6 shadow-[0_24px_70px_rgba(18,18,18,0.10)] backdrop-blur-md dark:border-white/10 dark:bg-white/8 lg:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ec407a] dark:text-[#f8b4c6]">
            {mode === "signin" ? "Welcome Back" : "Create Account"}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-[1.02] text-[#242124] dark:text-white lg:text-[2rem]">
            {mode === "signin" ? "Sign in" : "Sign up"}
          </h1>
        </div>
        <div className="inline-flex rounded-full border border-[#f2d2dc] bg-[#fff6fa] p-1 dark:border-white/10 dark:bg-[#171717]">
          <Link
            href="/signin"
            className={`rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition ${
              mode === "signin"
                ? "bg-[#242124] text-white dark:bg-[#f4edf0] dark:text-[#181314]"
                : "text-[#74696d] dark:text-[#c4b7bc]"
            }`}
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className={`rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition ${
              mode === "signup"
                ? "bg-[#242124] text-white dark:bg-[#f4edf0] dark:text-[#181314]"
                : "text-[#74696d] dark:text-[#c4b7bc]"
            }`}
          >
            Sign up
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4">
        {mode === "signup" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="First name"
              value={values.firstname}
              onChange={(value) => updateValue("firstname", value)}
              error={submitted ? errors.firstname : undefined}
            />
            <Field
              label="Last name"
              value={values.lastname}
              onChange={(value) => updateValue("lastname", value)}
              error={submitted ? errors.lastname : undefined}
            />
          </div>
        ) : null}

        {mode === "signup" ? (
          <Field
            label="Email"
            type="email"
            value={values.email}
            onChange={(value) => updateValue("email", value)}
            error={submitted ? errors.email : undefined}
          />
        ) : null}

        <Field
          label="Username"
          value={values.username}
          onChange={(value) => updateValue("username", value)}
          error={submitted ? errors.username : undefined}
        />

        <Field
          label="Password"
          type="password"
          value={values.password}
          onChange={(value) => updateValue("password", value)}
          error={submitted ? errors.password : undefined}
        />
      </div>

      <button
        className="primary-button mt-7 w-full px-8 py-3.5 text-sm"
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Working..."
          : mode === "signin"
            ? "Enter Wallet"
            : "Create Wallet"}
      </button>

      {message ? (
        <p className="mt-4 rounded-md border border-[#bce7d5] bg-[#edf9f3] px-4 py-3 text-sm font-semibold text-[#1a5a40] dark:border-[#315849] dark:bg-[#10261c] dark:text-[#bce7d5]">
          {message}
        </p>
      ) : null}

      {requestError ? (
        <p className="mt-4 rounded-md border border-[#f7c4cd] bg-[#fff0f2] px-4 py-3 text-sm font-semibold text-[#a33a51] dark:border-[#5f2632] dark:bg-[#2b1218] dark:text-[#ffbecd]">
          {requestError}
        </p>
      ) : null}

      <div className="mt-5 flex items-center justify-between gap-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8f8186] dark:text-[#a89ca0]">
        <span>
          {mode === "signin"
            ? "Username + password"
            : "Schema-ready fields"}
        </span>
        <Link
          href={mode === "signin" ? "/signup" : "/signin"}
          className="text-[#ec407a] dark:text-[#f8b4c6]"
        >
          {mode === "signin" ? "Create account" : "Have an account"}
        </Link>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
};

function Field({ label, value, onChange, error, type = "text" }: FieldProps) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6e6266] dark:text-[#ccbfc4]">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`min-h-13 rounded-[18px] border bg-white px-4 text-sm font-semibold text-[#242124] outline-none transition dark:bg-[#111111] dark:text-white ${
          error
            ? "border-[#ec407a]"
            : "border-[#f0d2db] focus:border-[#ec407a] dark:border-white/10"
        }`}
      />
      <span className="min-h-4 text-[11px] font-bold text-[#b03b56] dark:text-[#ffbfd0]">
        {error ?? ""}
      </span>
    </label>
  );
}
