import { proxyRequestToBackend } from "@/lib/backend";

export async function GET(req: Request) {
  return proxyRequestToBackend(req, "/api/account/balance", {
    includeAuthorization: true,
  });
}
