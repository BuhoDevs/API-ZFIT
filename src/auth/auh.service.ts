import { Request, Response } from "express";
import { passwordHashado, correctPassword } from "./helper/bcrypt";
import { generateToken } from "./helper/jwt";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userRegister = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body;

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
        User: true, // Incluye la información del usuario creado
      },
    });

    if (newUser) {
      res.status(400).json({ message: "Usuario Creeado con exito", newUser });
    }
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

export const userLogin = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    // TODO: validar el login con el estado del user
    where: { email },
    include: {
      Role: true,
      Person: true,
    },
  });

  if (!user) {
    return {
      code: 404,
      error: true,
      message: "El usuario no fue encontrado",
    };
  }

  const passwordHash = user.password;

  const isCorrect = await correctPassword(password, passwordHash);

  if (!isCorrect) {
    return {
      code: 409,
      error: true,
      message: "Usuario y/o contraseña inválidos.",
    };
  }

  const token = generateToken(user.email);

  const { password: passwordCopy, ...restUserValues } = user;
  return {
    token,
    user: {
      ...restUserValues,
    },
  };
};
