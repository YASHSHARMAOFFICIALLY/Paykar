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


export const transfer = async(
    fromUserId:string,
    toUserId:string,
    amount:number
)=>{
    
    if(fromUserId === toUserId){
        throw new Error("You cannot send money to your self")
    }

    if(amount <= 0){
        throw new Error("Amount cannot be greater or less than zero")
    }
    const Receiver = await prisma.user.findUnique({
        where:{id:toUserId}
    })

    if(!Receiver){
        throw new Error("Account not found")
    }

    const senderAccount = await prisma.account.findUnique({
        where:{userId:fromUserId}
    })
    if(!senderAccount){
        throw new Error("Sender Account Not found")
    }
    if(senderAccount.balance<amount){
        throw new Error("Insufficient balance")
    }

     await prisma.$transaction([
    // Deduct from sender
    prisma.account.update({
      where: { userId: fromUserId },
      data: {
        balance: {
          decrement: amount,
        },
      },
    }),

    // Add to receiver
    prisma.account.update({
      where: { userId: toUserId },
      data: {
        balance: {
          increment: amount,
        },
      },
    }),
  ]);

  // 7. Return success
  return {
    message: "Transfer successful",
  };
  
    
}