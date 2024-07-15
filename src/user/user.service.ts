import { passwordHashado } from "../auth/helper/bcrypt";
import { getIsoDate } from "../utils";
import { prisma } from "../db";


export const userRegister = async (
  firstname: string,
  lastname: string,
  birthdate: string | undefined,
  ci: string,
  phone: number | undefined,
  photo: string | undefined,
  genreId: number,
  email: string,
  password: string
) => {

  const encriptado = await passwordHashado(password);
  let isoBirthdate: string | undefined;
  if (birthdate)
  {
    isoBirthdate = getIsoDate(birthdate)
  }
  const newUser = await prisma.person.create({
    data: {
      firstname,
      lastname,
      ...(isoBirthdate && { birthdate: isoBirthdate }),
      ci,
      phone,
      photo,
      genreId,
      User: {
        create: {
          email,
          password: encriptado,
          status: true,
        },
      },
    },
    include: {
      User: true,
    },
  });

  if (!newUser)
    return { message: "Error en el registro de Usuario", statuscode: 409 };

  return { message: "Usuario de registro con éxito", statuscode: 200 };
};
