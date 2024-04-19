import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "../db";
import { getIsoDate } from "../utils";
import { Person } from "@prisma/client";
import { IClientFilter } from "./types";

export const insertClient = async (
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
  let isoBirthdate: string | undefined;
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
          password,
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

export const allClientService = async ({
  ci,
  firstname,
  lastname,
  skip = 0,
  take = 10,
}: IClientFilter) => {
  const client = await prisma.client.findMany({
    where: {
      status: true,
      Person: {
        ...(ci && { ci }),
        ...(firstname && {
          firstname: { startsWith: firstname, mode: "insensitive" },
        }),
        ...(lastname && {
          lastname: { startsWith: lastname, mode: "insensitive" },
        }),
      },
    },
    skip,
    take,
    include: { Person: true },
  });
  console.log("CI:SERV", client);

  if (!client) throw new Error("Error clientes no encontrados");
  console.log(client);
  return client.map((elem) => {
    const { Person, password, ...resValues } = elem;
    const { id, genreId, ...resPersonValues } = Person as Person;
    return {
      ...resValues,
      ...resPersonValues,
    };
  });
};

export const deleteClientByIdService = async (clientId: number) => {
  const deletedClient = await prisma.person.update({
    where: { id: clientId },
    data: { status: false },
  });

  return deletedClient;
};
