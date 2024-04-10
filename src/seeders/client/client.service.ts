import { prisma } from "../../db";

export const insertClientSeeder = async () => {
  const isNotClientEmpty = await prisma.client.count();
  if (isNotClientEmpty) {
    return undefined;
  }

  const staticClientData = {
    firstname: "Juan",
    lastname: "Gomez",
    ci: "123456789",
    genreId: 1,
    phone: 1234567890,
    photo: "",
  };

  return prisma.client.create({
    data: {
      Person: {
        create: staticClientData,
      },
      weight: 70,
      height: 1.75,
      status: true,
      email: "juang@gmail.com",
      password: "",
    },
  });
};
