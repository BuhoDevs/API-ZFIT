import { endOfDay, startOfDay } from "date-fns";
import { prisma } from "../db";

export const checkinRegister = async (subscriptionId: number) => {
  const newCheckin = await prisma.checkin.create({
    data: {
      subscriptionId,
      status: true,
    },
  });

  if (!newCheckin)
    return {
      message: "Error en el registro del checkin",
      statuscode: 409,
    };
  return { message: "Checkin éxitoso", statuscode: 200 };
};

export const findSuscriptionOnCheckin = async (subscriptionId: number) => {
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());
  return prisma.checkin.findFirst({
    where: {
      subscriptionId,
      createdAt: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
  });
};
