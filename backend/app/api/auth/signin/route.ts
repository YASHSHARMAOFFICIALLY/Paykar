import { SigninSchema } from "@/utils/zodSchema";
import { signin } from "@/service/auth.service";



export async function POST(req:Request){
    try{
        const body = await req.json()

        const result = SigninSchema.safeParse(body)

         if (!result.success) {
      return Response.json(
        {
          error: result.error.flatten(),
        },
        { status: 400 }
      );
    }
     const data = result.data;
     const response = await signin(data);
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
         
    