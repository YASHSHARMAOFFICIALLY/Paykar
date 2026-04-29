import prisma from "@/lib/prisma"


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



export const transfer = async (
  fromUserId: string,
  toUserId: string,
  amount: number
) => {
  if (fromUserId === toUserId) {
    throw new Error("You cannot send money to yourself");
  }

  if (amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }

  const receiver = await prisma.user.findUnique({
    where: { id: toUserId },
  });


  if (!receiver) {
    throw new Error("Receiver not found");
  }

  
  await prisma.$transaction(async (tx) => {
   
    const senderUpdate = await tx.account.updateMany({
      where: {
        userId: fromUserId,
        balance: {
          gte: amount,
        },
      },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    if (senderUpdate.count === 0) {
      await tx.transactions.create({
        data: {
          fromUserId,
          toUserId,
          amount,
          status: "FAILED",
        },
      });

      throw new Error("Insufficient balance");
    }

    
    await tx.account.update({
      where: { userId: toUserId },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    
    await tx.transactions.create({
      data: {
        fromUserId,
        toUserId,
        amount,
        status: "SUCCESS",
      },
    });
  });
  return {
    message: "Transfer successful",
  };
};