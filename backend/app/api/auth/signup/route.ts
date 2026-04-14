import { SignupSchema } from "@/utils/zodSchema";
import { signup } from "@/service/auth.service";

export async function POST(req:Request){
    try {
        const body = await req.json()

        const result = SignupSchema.safeParse(body)

         if (!result.success) {
      return Response.json(
        {
          error: result.error.flatten(),
        },
        { status: 400 }
      );
    }
     const data = result.data;
    const response = await signup(data);
    return Response.json(response, { status: 201 });
}catch(error:any){
    return Response.json(
      {
        error: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }

}
    
