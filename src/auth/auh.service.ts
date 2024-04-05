import { PrismaClient } from "@prisma/client";
import { passwordHashado, correctPassword } from "./helper/bcrypt";
import { generateToken } from "./helper/jwt";

const prisma = new PrismaClient();

export const userRegister = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
) => {
  try {
    const encryptedPassword = await passwordHashado(password);

    const newUser = await prisma.person.create({
      data: {
        firstname,
        lastname,
        User: {
          create: {
            email,
            password: encryptedPassword,
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

export const userLogin = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        code: 404,
        error: true,
        message: "El usuario no fue encontrado",
      };
    }

    const passwordHash = user.password;

    const token = generateToken(user.email);

    const isCorrect = await correctPassword(password, passwordHash);

    if (isCorrect) {
    }

    return {
      token,
      user,
      code: 201,
      error: true,
      message: "Usuario encontrado",
    };
  } catch (error) {
    throw error;
  }
};
