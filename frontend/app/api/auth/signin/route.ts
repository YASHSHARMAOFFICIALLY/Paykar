import { proxyToBackend } from "@/lib/backend";

export async function POST(req: Request) {
  const body = await req.text();

  return proxyToBackend("/api/auth/signin", {
    method: "POST",
    body,
  });
}
