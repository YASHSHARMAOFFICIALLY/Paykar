import { proxyToBackend } from "@/lib/backend";

export async function GET(req: Request) {
  return proxyToBackend("/api/account/balance", {
    method: "GET",
    headers: {
      authorization: req.headers.get("authorization") ?? "",
    },
  });
}
