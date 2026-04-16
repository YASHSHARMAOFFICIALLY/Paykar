import { getbalance } from "@/service/account.service";
import { getUserFromToken } from "@/lib/auth";

export async function GET(req:Request){
    try{
        const userId = getUserFromToken(req)
        const result = await getbalance(userId)
         return Response.json(result, { status: 200 });

    }catch(error:any){
         return Response.json(
           {
             error: error.message || "Something went wrong",
           },
           { status: 401 }
         );
       }
}