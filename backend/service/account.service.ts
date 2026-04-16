import prisma from "@/lib/prisma"

// export const balance = (userId:string)=>{
//     userId = userId prisma.user.findUnique({
//          where: { username },
//     })
// }


export const getbalance = async(userId:string)=>{


    const account = await  prisma.account.findUnique({
        where:{userId}
    })
    if(!account){
        throw new Error("Account not found")
    }

    return {
        "balance":account.balance
    }
}


