import { findPaymentBysubscriptionId } from "../Payment/payment.service";
import { prisma } from "../db";
import { getIsoDate } from "../utils";
import { IGetSubscription, ISubscriptionFilter } from "./types";

export async function subscriptionService({
  dateIn,
  dateOut,
  disciplineId,
  clientId,
  subsTypeId,
  subscriptorId,
  transactionAmmount,
  outstanding = 0,
  totalAmmount,
}: {
  dateIn: string;
  dateOut: string;
  disciplineId: number;
  clientId: number;
  subsTypeId: number;
  subscriptorId: number;
  transactionAmmount: number;
  outstanding: number;
  totalAmmount: number;
}) {
  let isoDateIn = getIsoDate(dateIn);
  let isoDateOut = getIsoDate(dateOut);

  const subscription = await prisma.subscription.create({
    data: {
      dateIn: isoDateIn,
      dateOut: isoDateOut,
      status: true,
      disciplineId: disciplineId,
      clientId: clientId,
      subsTypeId: subsTypeId,
      subscriptorId: subscriptorId,
      Payment: {
        create: {
          transactionAmmount: transactionAmmount,
          totalAmmount: totalAmmount,
          outstanding: outstanding,
          status: true,
        },
      },
    },
    include: {
      Payment: true,
    },
  });
  if (!subscription)
    return {
      message: "Error en el registro de la Suscripción",
      statuscode: 409,
    };
  return { message: "Registro de Suscripción con éxito", statuscode: 200 };
}

export async function allSubscriptionService({
  disciplineId,
  ci,
  firstname,
  lastname,
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
          ...(firstname && {
            firstname: { startsWith: firstname, mode: "insensitive" },
          }),
          ...(lastname && {
            lastname: { startsWith: lastname, mode: "insensitive" },
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
          ...(firstname && {
            firstname: { startsWith: firstname, mode: "insensitive" },
          }),
          ...(lastname && {
            lastname: { startsWith: lastname, mode: "insensitive" },
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

export const findSuscriptionById = async ({
  subscripcionId,
}: IGetSubscription) => {
  const subscriptionFounded = await prisma.subscription.findUnique({
    where: { id: subscripcionId },
    include: {
      Client: { select: { Person: true } },
      Discipline: true,
      Payment: true,
      SubsType: true,
    },
  });

  if (!subscriptionFounded) {
    return {
      code: 404,
      message: "La suscripcion no fue encontrada",
      error: true,
    };
  }

  return {
    code: 200,
    data: {
      ...subscriptionFounded,
      Discipline: {
        ...subscriptionFounded.Discipline,
        value: subscriptionFounded.Discipline.id,
      },
      SubsType: {
        ...subscriptionFounded.SubsType,
        value: subscriptionFounded.SubsType.id,
      },
    },
  };
};

export const subscriptionEdit = async ({
  id,
  dateIn,
  dateOut,
  disciplineId,
  clientId,
  subsTypeId,
  subscriptorId,
  transactionAmmount,
  outstanding,
  totalAmmount,
}: {
  id: number;
  dateIn: string;
  dateOut: string;
  disciplineId: number;
  clientId: number;
  subsTypeId: number;
  subscriptorId: number;
  transactionAmmount: number;
  outstanding: number;
  totalAmmount: number;
}) => {
  let isoDateIn = getIsoDate(dateIn);
  let isoDateOut = getIsoDate(dateOut);

  const paymentBySubscriptionId = await findPaymentBysubscriptionId(id);
  if (!paymentBySubscriptionId) {
    return null;
  }

  const subscripUpdate = await prisma.subscription.update({
    where: { id },
    data: {
      dateIn: isoDateIn,
      dateOut: isoDateOut,
      disciplineId,
      clientId,
      subsTypeId,
      subscriptorId,
      Payment: {
        update: {
          where: {
            id: paymentBySubscriptionId.id,
          },
          data: {
            transactionAmmount,
            totalAmmount,
            outstanding,
          },
        },
      },
    },
    include: {
      Payment: true,
    },
  });
  return subscripUpdate;
};
