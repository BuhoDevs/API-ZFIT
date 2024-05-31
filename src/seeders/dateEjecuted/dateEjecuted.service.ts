import { prisma } from "../../db";
import { dateEjecCollection } from "./contants";

export const insertDateEjecutedSeeders = async () => {
  return await prisma.dateEjecuted.createMany({
    data: dateEjecCollection,
    skipDuplicates: true,
  });
};
