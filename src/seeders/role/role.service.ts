import { prisma } from "../../db";
import { rolesCollection } from "./contants";

export const insertRoleSeeders = async () => {
  return await prisma.role.createMany({
    data: rolesCollection,
    skipDuplicates: true,
  });
};
