import { prisma } from "../../db";
import { disciCollection } from "./contants";

export const insertDisciSeeders = async () => {
  return await prisma.discipline.createMany({
    data: disciCollection,
    skipDuplicates: true,
  });
};
