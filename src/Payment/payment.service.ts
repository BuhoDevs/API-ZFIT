import { Payment } from "@prisma/client";
import { prisma } from "../db";

export const findPaymentBysubscriptionId = async (
  subscriptionId: number
): Promise<Payment | null> => {
  return prisma.payment.findFirst({
    where: { subscriptionId },
  });
};

export const findMonthlyRevenue = async ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) => {
  const totalRevenue = await prisma.payment.aggregate({
    _sum: {
      transactionAmmount: true,
    },
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
      status: true,
    },
  });

  return totalRevenue._sum.transactionAmmount || 0;
};
