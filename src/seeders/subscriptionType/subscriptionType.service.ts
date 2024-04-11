import { prisma } from "../../db";
import { subsTypeCollection } from "./contants";

export const insertSubsTypeSeeders = async () => {
  return await prisma.subscription.createMany({
    data: subsTypeCollection,
    skipDuplicates: true,
  });
};
