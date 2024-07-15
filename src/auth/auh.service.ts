import { correctPassword } from "./helper/bcrypt";
import { generateToken } from "./helper/jwt";
import { prisma } from "../db";


export const userLogin = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    // TODO: validar el login con el estado del user
    where: { email },
    include: {
      Role: true,
      Person: true,
    },
  });

  if (!user)
  {
    return {
      code: 404,
      error: true,
      message: "El usuario no fue encontrado",
    };
  }

  const passwordHash = user.password;

  const isCorrect = await correctPassword(password, passwordHash);

  if (!isCorrect)
  {
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
