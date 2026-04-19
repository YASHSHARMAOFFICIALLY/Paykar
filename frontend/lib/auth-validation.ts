export type AuthMode = "signin" | "signup";

export type AuthValues = {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
};

export type AuthErrors = Partial<Record<keyof AuthValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function passwordError(password: string) {
  if (password.length < 8) {
    return "Minimum 8 characters";
  }

  if (!/[A-Z]/.test(password)) {
    return "Add 1 uppercase letter";
  }

  if (!/[a-z]/.test(password)) {
    return "Add 1 lowercase letter";
  }

  if (!/[0-9]/.test(password)) {
    return "Add 1 number";
  }

  return "";
}

export function validateAuthValues(mode: AuthMode, values: AuthValues) {
  const errors: AuthErrors = {};

  if (mode === "signup" && values.firstname.trim().length < 2) {
    errors.firstname = "Minimum 2 characters";
  }

  if (mode === "signup" && values.lastname.trim().length < 2) {
    errors.lastname = "Minimum 2 characters";
  }

  if (mode === "signup" && !emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email";
  }

  if (values.username.trim().length < 4) {
    errors.username = "Minimum 4 characters";
  }

  const passwordIssue = passwordError(values.password);

  if (passwordIssue) {
    errors.password = passwordIssue;
  }

  return errors;
}
