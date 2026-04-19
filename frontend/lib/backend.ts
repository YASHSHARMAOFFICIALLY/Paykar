const DEFAULT_BACKEND_URL = "http://localhost:3001";

export function getBackendUrl() {
  return (
    process.env.NEXT_PUBLIC_PAYKAR_BACKEND_URL ??
    process.env.PAYKAR_BACKEND_URL ??
    DEFAULT_BACKEND_URL
  );
}

export async function proxyToBackend(
  path: string,
  init?: RequestInit,
) {
  const response = await fetch(`${getBackendUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const text = await response.text();

  return new Response(text, {
    status: response.status,
    headers: {
      "Content-Type":
        response.headers.get("content-type") ?? "application/json",
    },
  });
}
