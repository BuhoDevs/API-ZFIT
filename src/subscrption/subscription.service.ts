import { prisma } from "../db";
import { getIsoDate } from "../utils";
import { ISubscriptionFilter } from "./types";

export async function suscripcionService(data: {
  dateIn: string;
  dateOut: string;
  disciplineId: number;
  clientId: number;
  subsTypeId: number;
  subscriptorId: number;
  transactionAmmount: number;
  discount: number | undefined;
}) {
  let isoDateIn = getIsoDate(data.dateIn);
  let isoDateOut = getIsoDate(data.dateOut);
  let total = 0;
  const subsType = await prisma.subsType.findFirst({
    where: { id: data.subsTypeId },
  });
  if (subsType) total = subsType.price;
  else total = 0;

  const suscripcion = await prisma.subscription.create({
    data: {
      dateIn: isoDateIn,
      dateOut: isoDateOut,
      status: true,
      disciplineId: data.disciplineId,
      clientId: data.clientId,
      subsTypeId: data.subsTypeId,
      subscriptorId: data.subscriptorId,
      Payment: {
        create: {
          transactionAmmount: data.transactionAmmount,
          totalAmmount: total,
          outstanding: total - data.transactionAmmount,
          discount: data.discount,
          status: true,
        },
      },
    },
    include: {
      Payment: true,
    },
  });
  if (!suscripcion)
    return {
      message: "Error en el registro de la Suscripción",
      statuscode: 409,
    };
  return { message: "Registro de Suscripción con éxito", statuscode: 200 };
}

export async function allSuscripcionService({
  disciplineId,
  ci,
  firstName,
  lastName,
  subsTypeId,
  subscriptorId,
  dateIn,
  dateOut,
  status,
  take,
  skip,
}: ISubscriptionFilter) {
  let isoDateIn;
  let isoDateOut;
  if (dateIn) isoDateIn = getIsoDate(dateIn);
  if (dateOut) isoDateOut = getIsoDate(dateOut);

  const subscriptions = await prisma.subscription.findMany({
    where: {
      status: status === undefined ? true : status,
      ...(disciplineId && {
        disciplineId,
      }),
      Client: {
        Person: {
          ...(ci && { ci }),
          ...(firstName && {
            firstName: { startsWith: firstName, mode: "insensitive" },
          }),
          ...(lastName && {
            lastName: { startsWith: lastName, mode: "insensitive" },
          }),
        },
      },
      ...(subsTypeId && { subsTypeId }),
      ...(subscriptorId && { subscriptorId }),
      ...(isoDateIn && { dateIn: { gte: isoDateIn } }),
      ...(isoDateOut && { dateOut: { gte: isoDateOut } }),
    },
    skip,
    take,
    include: {
      Client: { select: { Person: true } },
      SubsType: true,
      User: { select: { Person: true } },
      Discipline: { select: { label: true } },
    },
  });

  const totalLength = await prisma.subscription.count({
    where: {
      status: status === undefined ? true : status,
      ...(disciplineId && {
        disciplineId,
      }),
      Client: {
        Person: {
          ...(ci && { ci }),
          ...(firstName && {
            firstName: { startsWith: firstName, mode: "insensitive" },
          }),
          ...(lastName && {
            lastName: { startsWith: lastName, mode: "insensitive" },
          }),
        },
      },
      ...(subsTypeId && { subsTypeId }),
      ...(subscriptorId && { subscriptorId }),
      ...(isoDateIn && { dateIn: { gte: isoDateIn } }),
      ...(isoDateOut && { dateOut: { gte: isoDateOut } }),
    },
  });

  return {
    totalLength,
    subscriptions,
  };
}
