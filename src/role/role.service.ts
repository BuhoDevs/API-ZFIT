import { prisma } from "../db";
import { IRoles } from "./types";

export const findRoleByName = async ({ name }: Pick<IRoles, "name">) => {
  return prisma.role.findFirst({
    where: {
      name,
    },
  });
};
