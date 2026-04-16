import { getUserFromToken } from "@/lib/auth";
import { TransferSchema } from "@/utils/zodSchema";
import { transfer } from  "@/service/account.service"


export async function POST(req: Request) {
  try {
    // 1. Get sender from JWT
    const fromUserId = getUserFromToken(req);

    // 2. Parse body
    const body = await req.json();

    // 3. Validate
    const data = TransferSchema.safeParse(body);

    if (!data.success) {
      return Response.json(
        { error: data.error.flatten() },
        { status: 400 }
      );
    }

    // 4. Extract fields
    const { toUserId, amount } = data.data;

    // 5. Call service
    const response = await transfer(fromUserId, toUserId, amount);

    // 6. Return success
    return Response.json(response, { status: 200 });

  } catch (error: any) {
    return Response.json(
      {
        error: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}