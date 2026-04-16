import { searchUsers } from "@/service/user.service";

export async function GET(req:Request){
    try{
        const {searchParams} = new URL(req.url);
        const query = searchParams.get("query")

        if(!query || query.trim() === ""){
            return Response.json([],{status:200})
        }

        const user = await searchUsers(query);
        return Response.json(user,{status:200})
         }catch(error:any){
         return Response.json(
            {
                error:error.message || "something went wrong"
            },{
                status:500
            }
        );
    }
}