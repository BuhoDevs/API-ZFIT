import { prisma } from "../../db";
import { expenseCategoryCollection } from "./constants";

export const insertExpenseCategorySeeders = async () => {
  return await prisma.expenseCategory.createMany({
    data: expenseCategoryCollection,
    skipDuplicates: true,
  });
};
