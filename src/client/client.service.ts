import { Decimal } from "@prisma/client/runtime/library";
import { passwordHashado } from "../auth/helper/bcrypt";
import { prisma } from "../db";
import { getIsoDate } from "../utils";

export const clientRegister = async (
  firstname: string,
  lastname: string,
  birthdate: string | undefined,
  ci: string,
  phone: number | undefined,
  photo: string | undefined,
  genreId: number,
  weight: Decimal | undefined,
  height: Decimal | undefined,
  email: string | undefined,
  password: string | undefined
) => {
  let encriptado = "";
  let isoBirthdate: string | undefined;
  if (password) encriptado = await passwordHashado(password);
  if (birthdate) {
    isoBirthdate = getIsoDate(birthdate);
  }
  const newClient = await prisma.person.create({
    data: {
      firstname,
      lastname,
      ...(isoBirthdate && { birthdate: isoBirthdate }),
      ci,
      phone,
      photo,
      genreId,
      Client: {
        create: {
          weight,
          height,
          status: true,
          email,
          password: encriptado,
        },
      },
    },
    include: {
      Client: true,
    },
  });

  if (!newClient)
    return { message: "Error en el registro de Cliente", statuscode: 409 };

  return {
    message: "Registro de Cliente con éxito",
    statuscode: 200,
    newClient,
  };
};

export const updateClientService = async (id: number, clientData: any) => {
  const updatedClient = await prisma.person.update({
    where: { id },
    data: clientData,
  });
  return updatedClient;
};

export const getClientByIdService = async (id: number) => {
  const client = await prisma.person.findUnique({
    where: { id },
    include: { Client: true },
  });

  if (!client) throw new Error("Error cliente no encontrado");

  return client;
};

export const allClientService = async () => {
  const client = await prisma.person.findMany({
    where: { status: true },
  });

  if (!client) throw new Error("Error clientes no encontrados");

  return client;
};

export const deleteClientByIdService = async (clientId: number) => {
  const deletedClient = await prisma.person.update({
    where: { id: clientId },
    data: { status: false },
  });

  return deletedClient;
};
