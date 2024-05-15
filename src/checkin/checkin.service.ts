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
