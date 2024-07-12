import moment from "moment";
import { findPaymentBysubscriptionId } from "../Payment/payment.service";
import { prisma } from "../db";
import { getIsoDate } from "../utils";
import {
  IGetSubscription,
  IGetSubscriptionByCi as IOtherGetSubscription,
  ISubscriptionFilter,
  IncomeReport,
} from "./types";

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
      Client: { select: { Person: true, email: true } },
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

export const subscriptionLow = async (subscripcionId: number) => {
  const lowSubscription = await prisma.subscription.update({
    where: { id: subscripcionId },
    data: { status: false },
  });

  if (!lowSubscription)
    return {
      message: "Error Baja a la Suscripción",
      statuscode: 409,
    };
  return { message: "Baja de la Suscripción con éxito", statuscode: 200 };
};

export const subscriptionControl = async ({
  isManual = false,
}: {
  isManual: boolean;
}) => {
  try {
    const subsActives = await prisma.subscription.findMany({
      where: {
        status: true,
      },
    });

    if (!subsActives) return;

    let dateEjecutedShort, currentDateShort;
    do {
      const tableEjecuted = await prisma.dateEjecuted.findFirst();
      if (!tableEjecuted) return;
      const dateEjecuted = tableEjecuted?.date;
      dateEjecutedShort = moment
        .utc(tableEjecuted?.date)
        .locale("es")
        .format("YYYY-MM-DD");
      currentDateShort = moment().locale("es").format("YYYY-MM-DD");

      await prisma.subscription.updateMany({
        where: {
          dateOut: {
            lte: new Date(isManual ? currentDateShort : dateEjecutedShort),
          },
          status: true,
        },
        data: { status: false },
      });
      if (!isManual) {
        dateEjecuted?.setDate(dateEjecuted.getDate() + 1);
        await prisma.dateEjecuted.update({
          where: { id: 1 },
          data: { date: dateEjecuted },
        });
      }
    } while (new Date(dateEjecutedShort) < new Date(currentDateShort));
    return;
  } catch (error) {
    console.log("el error es:" + error);
  }
};
export async function getSubscriptionByClient(ci: string) {
  const currentDateTime = new Date();
  const subscriptions = await prisma.subscription.findMany({
    where: {
      status: true,
      Client: {
        Person: {
          ci,
        },
      },
      dateIn: {
        lte: currentDateTime,
      },
    },
    include: {
      Discipline: { select: { label: true, id: true } },
    },
  });
  return {
    // subscriptions,
    subscriptions: subscriptions?.map((ele) => ({
      id: ele.id,
      Discipline: {
        label: ele.Discipline.label,
      },
    })),
  };
}

export const getSubscriptionByClientCi = async ({
  subscripcionId,
  ci,
}: IOtherGetSubscription) => {
  return prisma.subscription.findFirst({
    where: {
      Client: {
        Person: {
          ci,
        },
      },
      id: subscripcionId,
    },
    include: {
      Discipline: true,
    },
  });
};

export const subscriptionBalanceService = async (
  startDate: Date,
  endDate: Date
): Promise<IncomeReport[]> => {
  const startDateUTC = moment(startDate).utc().startOf("day").toISOString();
  const endDateUTC = moment(endDate).utc().endOf("day").toISOString();
  const subscriptions = await prisma.subscription.findMany({
    where: {
      createdAt: {
        gte: startDateUTC,
        lte: endDateUTC,
      },
    },
    include: {
      Discipline: true,
      SubsType: true,
      Payment: true,
    },
  });

  const report = subscriptions.reduce<IncomeReport[]>((acc, subscription) => {
    const { Discipline, SubsType, Payment } = subscription;
    const totalAmount = Payment.reduce(
      (sum, payment) => sum + payment.totalAmmount,
      0
    );

    const existingReport = acc.find(
      (item) =>
        item.discipline === Discipline.label && item.subsType === SubsType.label
    );

    if (existingReport) {
      existingReport.totalAmount += totalAmount;
      existingReport.count += 1;
    } else {
      acc.push({
        discipline: Discipline.label,
        subsType: SubsType.label,
        totalAmount,
        count: 1,
      });
    }

    return acc;
  }, []);

  return report;
};

export const findTotalActiveMembers = async () => {
  return prisma.subscription.count({
    where: { status: true },
  });
};

export const findTotalNewMembersThisMonth = async () => {
  // Fechas en UTC para las consultas
  const startOfMonthUTC = moment().utc().startOf("month").toISOString();
  const endOfMonthUTC = moment().utc().endOf("month").toISOString();

  return prisma.subscription.count({
    where: {
      dateIn: {
        gte: startOfMonthUTC,
        lte: endOfMonthUTC,
      },
      status: true,
    },
  });
};

export const findMembershipsExpiringSoon = async ({
  take,
  skip,
}: {
  take: number;
  skip: number;
}) => {
  // Fechas en UTC para las consultas
  const today = moment().utc().startOf("day").toISOString();
  const sevenDaysFromNow = moment()
    .utc()
    .endOf("day")
    .add(7, "days")
    .toISOString();

  const membershipsExpiringSoon = await prisma.subscription.findMany({
    where: {
      dateOut: {
        gte: today,
        lte: sevenDaysFromNow,
      },
      status: true,
    },
    select: {
      Client: {
        select: {
          Person: {
            select: {
              firstname: true,
              lastname: true,
              photo: true,
            },
          },
        },
      },
      Discipline: {
        select: {
          label: true,
        },
      },
      dateIn: true,
      dateOut: true,
    },
    skip,
    take,
    orderBy: {
      dateOut: "asc",
    },
  });

  const totalLength = await prisma.subscription.count({
    where: {
      dateOut: {
        gte: today,
        lte: sevenDaysFromNow,
      },
      status: true,
    },
  });

  const membershipsExpiringSoonParsed = membershipsExpiringSoon.map(
    (membership) => {
      return {
        firstname: membership.Client.Person?.firstname,
        lastname: membership.Client.Person?.lastname,
        photo: membership.Client.Person?.photo,
        Discipline: {
          label: membership.Discipline.label,
        },
        dateIn: membership.dateIn,
        dateOut: membership.dateOut,
        display_name: `${membership.Client.Person?.firstname || ""}  ${
          membership.Client.Person?.lastname || ""
        } `,
      };
    }
  );

  return {
    membershipsExpiringSoon: membershipsExpiringSoonParsed,
    totalLength,
  };
};
