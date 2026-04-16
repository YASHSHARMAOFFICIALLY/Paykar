import prisma from "@/lib/prisma";

export const searchUsers = async (query: string) => {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          username: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          firstname: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },

    select: {
      id: true,
      username: true,
      firstname: true,
      lastname: true,
    },

    take: 10, 
  });

  return users;
};