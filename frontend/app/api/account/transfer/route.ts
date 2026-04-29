import { proxyRequestToBackend } from "@/lib/backend";

export async function POST(req: Request) {
  return proxyRequestToBackend(req, "/api/account/transfer", {
    includeAuthorization: true,
  });
}
