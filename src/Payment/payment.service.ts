import { Payment } from "@prisma/client";
import { prisma } from "../db";

export const findPaymentBysubscriptionId = async (
  subscriptionId: number
): Promise<Payment | null> => {
  return prisma.payment.findFirst({
    where: { subscriptionId },
  });
};
