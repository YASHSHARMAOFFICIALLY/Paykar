import { proxyToBackend } from "@/lib/backend";

export async function POST(req: Request) {
  const body = await req.text();

  return proxyToBackend("/api/account/transfer", {
    method: "POST",
    body,
    headers: {
      authorization: req.headers.get("authorization") ?? "",
    },
  });
}
