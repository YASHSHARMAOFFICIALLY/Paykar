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
  const [requestError, setRequestError] = useState<string | null>(null);

  const errors = validateAuthValues(mode, values);
  const isSignin = mode === "signin";

  function updateValue(field: keyof AuthValues, value: string) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setRequestError(null);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const payload = isSignin
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

      const response = await fetch(`/api/auth/${isSignin ? "signin" : "signup"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error?.formErrors?.[0] ?? data?.error ?? "Request failed");
      }

      if (isSignin) {
        if (data?.token) {
          window.localStorage.setItem("paykar_token", data.token);
        }

        router.push("/wallet");
        return;
      }

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
    <form onSubmit={handleSubmit} className="panel grid gap-5">
      <div>
        <p className="eyebrow">{isSignin ? "Sign in" : "Sign up"}</p>
        <h1 className="mt-2 text-3xl font-semibold">
          {isSignin ? "Sign in" : "Create account"}
        </h1>
        <p className="muted mt-2 text-sm">
          {isSignin ? "Enter your Paykar account." : "Create your Paykar wallet."}
        </p>
      </div>

      {!isSignin ? (
        <div className="grid gap-4 sm:grid-cols-2">
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

      {!isSignin ? (
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

      <button className="button-primary w-full" type="submit" disabled={loading}>
        {loading ? "Please wait" : isSignin ? "Sign in" : "Create account"}
      </button>

      {requestError ? <p className="error-text">{requestError}</p> : null}

      <p className="muted text-sm">
        {isSignin ? "No account?" : "Already have an account?"}{" "}
        <Link className="font-semibold text-[#be3b24]" href={isSignin ? "/signup" : "/signin"}>
          {isSignin ? "Sign up" : "Sign in"}
        </Link>
      </p>
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
      <span className="text-sm font-medium text-neutral-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="input"
      />
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
