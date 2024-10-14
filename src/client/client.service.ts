import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "../db";
import { getIsoDate } from "../utils";
import { IClientFilter } from "./types";
import { Person } from "@prisma/client";
import { IGenre } from "../seeders/genre/types";
// import { IGenre } from "../seeders/genre/types";

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
      ...(phone && { phone: Number(phone) }),
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
    return {
      message: "Error en el registro de Cliente",
      statuscode: 409,
    };

  return {
    message: "Registro de Cliente con éxito",
    statuscode: 200,
    newClient,
  };
};

export const updateClientService = async (id: number, clientData: any) => {
  const {
    genreId,
    firstname,
    lastname,
    birthdate,
    ci,
    phone,
    photo,
    // personId,
    weight,
    height,
    email,
    password,
  } = clientData;

  let isoBirthdate: string | undefined;
  if (birthdate) {
    isoBirthdate = getIsoDate(birthdate);
  }

  const updatedClient = await prisma.client.update({
    where: { id },
    data: {
      // personId,
      weight,
      height,
      email,
      password,
      Person: {
        update: {
          genreId,
          firstname,
          lastname,
          ...(isoBirthdate && { birthdate: isoBirthdate }),
          ci,
          ...(phone && { phone: Number(phone) }),
          photo,
        },
      },
    },
    include: {
      Person: true,
    },
  });
  return updatedClient;
};

export const getClientByIdService = async (id: number) => {
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      Person: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
          birthdate: true,
          ci: true,
          phone: true,
          photo: true,
          genreId: true,
          Genre: true,
        },
      },
    },
  });

  if (!client) throw new Error("Error cliente no encontrado");

  const { Genre, ...personWithoutGenre } = client.Person || {};

  const genre = client.Person?.Genre;

  let genreValue: IGenre | undefined;
  if (genre) {
    genreValue = { ...genre, value: genre.id };
  }

  const respta = {
    ...personWithoutGenre,
    id: client.id,
    height: client.height,
    weight: client.weight,
    status: client.status,
    email: client.email,
    password: client.password,
    Genre: genreValue,
  };
  return respta;
};

export const getClientByCI = async (ci: string | undefined) => {
  const client = await prisma.person.findUnique({
    where: { ci },
    include: {
      Client: true,
    },
  });
  return {
    ...client,
    Client: client?.Client[0],
  };
};

export const allClientService = async ({
  ci,
  firstname,
  lastname,
  skip,
  take,
  banClieSubs,
}: IClientFilter) => {
  const client = await prisma.client.findMany({
    where: {
      status: true,
      Person: {
        ...(ci && {
          ci: {
            startsWith: ci,
            mode: "insensitive",
          },
        }),
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
    include: {
      Person: true,
      ...(banClieSubs
        ? {
            Subscription: {
              where: { status: true },
              select: { Discipline: true },
            },
          }
        : {}),
    },
  });

  const totalLength = await prisma.client.count({
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
  });

  return {
    totalLength,
    clients: client.map((elem) => {
      const { Person, password, Subscription, ...resValues } = elem;
      const { id, genreId, ...resPersonValues } = Person as Person;

      return {
        ...resValues,
        ...resPersonValues,
        ...(banClieSubs && {
          Subscription: Subscription?.map((ele: any) => ele.Discipline.label),
        }),
      };
    }),
  };
};

export const deleteClientByIdService = async (clientId: number) => {
  const deletedClient = await prisma.client.update({
    where: { id: clientId },
    data: { status: false },
  });

  return deletedClient;
};
