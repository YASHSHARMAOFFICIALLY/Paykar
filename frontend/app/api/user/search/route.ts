import { getBackendUrl } from "@/lib/backend";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") ?? "";
  const response = await fetch(
    `${getBackendUrl()}/api/user/search?query=${encodeURIComponent(query)}`,
    {
      cache: "no-store",
    },
  );
  const text = await response.text();

  return new Response(text, {
    status: response.status,
    headers: {
      "Content-Type":
        response.headers.get("content-type") ?? "application/json",
    },
  });
}
