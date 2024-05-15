import { Decimal } from "@prisma/client/runtime/library";
import { prisma } from "../db";
import { getIsoDate } from "../utils";
import { IClientFilter } from "./types";
import { Person } from "@prisma/client";
import { IGenre } from "../seeders/genre/types";

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
  if (birthdate)
  {
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
    personId,
    weight,
    height,
    email,
    password,
  } = clientData;

  let isoBirthdate: string | undefined;
  if (birthdate)
  {
    isoBirthdate = getIsoDate(birthdate);
  }

  const updatedClient = await prisma.client.update({
    where: { id },
    data: {
      personId,
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
          phone,
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

// export const getClientByIdService = async (id: number) => {
//   const client = await prisma.client.findUnique({
//     where: { id },
//     include: {
//       Person: {
//         select: {
//           id: true,
//           firstname: true,
//           lastname: true,
//           birthdate: true,
//           ci: true,
//           phone: true,
//           photo: true,
//           Genre: true,
//           // genreId: true,
//         },
//       },
//     },
//   });

//   if (!client) throw new Error("Error cliente no encontrado");

//   const { Genre, } = client.Person || {};



//   // const genre = client.Person?.Genre

//   let genreValue: IGenre | undefined;
//   if (Genre)
//   {
//     genreValue = { ...Genre, value: Genre.id };
//   }

//   return {
//     client: {
//       ...client,
//       // ...personWithoutGenre,
//       ...genreValue,
//     }
//     // Person: {
//     // },
//   };
// };

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
          Genre: {
            select: {
              id: true,
              name: true,
              label: true,
              status: true,

            }
          }
        }
      }
    }
  });

  if (!client) throw new Error("Error cliente no encontrado");

  const { Person } = client;
  const { Genre, ...personWithoutGenre } = Person || {};

  let genreValue: IGenre | undefined;
  if (Genre)
  {
    genreValue = { ...Genre, value: Genre.id };
  }

  return {
    client: {
      id: client.id,
      weight: client.weight,
      height: client.height,
      status: client.status,
      email: client.email
    },
    person: personWithoutGenre,
    genre: genreValue
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
