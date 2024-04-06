import { PrismaClient } from "@prisma/client";
import { passwordHashado } from "../auth/helper/bcrypt";

const prisma = new PrismaClient();

export const clientRegister = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
) => {
  try {
    const encriptado = await passwordHashado(password);

    const newUser = await prisma.person.create({
      data: {
        firstname,
        lastname,
        User: {
          create: {
            email,
            password: encriptado,
          },
        },
      },
      include: {
        User: true,
      },
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};
