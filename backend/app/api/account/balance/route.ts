import { getbalance } from "@/service/account.service";
import { getUserFromToken } from "@/lib/auth";
import { getErrorMessage } from "@/lib/error";

export async function GET(req:Request){
    try{
        const userId = getUserFromToken(req)
        const result = await getbalance(userId)
         return Response.json(result, { status: 200 });

    }catch(error: unknown){
         return Response.json(
           {
             error: getErrorMessage(error),
           },
           { status: 401 }
         );
       }
}
