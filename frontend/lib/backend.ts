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

type ProxyRequestOptions = {
  includeAuthorization?: boolean;
};

export async function proxyRequestToBackend(
  req: Request,
  path: string,
  options: ProxyRequestOptions = {},
) {
  const init: RequestInit = {
    method: req.method,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.text();
  }

  if (options.includeAuthorization) {
    init.headers = {
      authorization: req.headers.get("authorization") ?? "",
    };
  }

  return proxyToBackend(path, init);
}
