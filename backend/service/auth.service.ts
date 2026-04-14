import bcrypt from "bcrypt"
import prisma from "@/lib/prisma";

export const signup = async(data:{
firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
})=>{
    const {firstname,lastname,email,username,password} = data;

    const existingUser = await prisma.user.findFirst({
        where: {
      OR: [{ email }, { username }],
    },
  });

  if(existingUser){
    throw new Error("User already existed")
  }
  const hashedPassword = await bcrypt.hash(password,12)

  
   const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        firstname,
        lastname,
        email,
        username,
        password: hashedPassword,
      },
    });
    const balance = Math.floor(Math.random() * 10000);

    await tx.account.create({
      data: {
        userId: user.id,
        balance,
      },
    });

    return user;
  });

  // 5. Return result
  return {
    message: "User created successfully",
    userId: result.id,
  };
};




