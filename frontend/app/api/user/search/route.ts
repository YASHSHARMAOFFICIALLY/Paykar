import { proxyRequestToBackend } from "@/lib/backend";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") ?? "";

  return proxyRequestToBackend(
    req,
    `/api/user/search?query=${encodeURIComponent(query)}`,
  );
}
