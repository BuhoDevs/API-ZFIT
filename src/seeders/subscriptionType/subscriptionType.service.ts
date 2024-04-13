import { prisma } from "../../db";
import { subsTypeCollection } from "./contants";

export const insertSubsTypeSeeders = async () => {
  return await prisma.subsType.createMany({
    data: subsTypeCollection,
    skipDuplicates: true,
  });
};
