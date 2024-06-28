import moment from "moment";
import { prisma } from "../db";
import {
  CreateExpense,
  ExpenseReport,
  IExpenseFilters,
  IExpensePatch,
} from "./types";

export const createExpenseService = async (inputData: CreateExpense) => {
  const { createdAt, amount, description, categoryId } = inputData;

  const expense = await prisma.expense.create({
    data: {
      createdAt,
      amount,
      description,
      categoryId,
    },
  });
  return expense;
};

export const getExpenseService = async (
  startDate: Date,
  endDate: Date
): Promise<ExpenseReport[]> => {
  const expenses = await prisma.expense.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      category: true,
    },
  });

  const report = expenses.reduce<ExpenseReport[]>((acc, expense) => {
    const { category, amount } = expense;

    const existingReport = acc.find((item) => item.category === category.label);

    if (existingReport) {
      existingReport.totalAmount += amount.toNumber();
      existingReport.count += 1;
    } else {
      acc.push({
        category: category.label,
        totalAmount: amount.toNumber(),
        count: 1,
      });
    }

    return acc;
  }, []);

  return report;
};

export async function findExpenseByFilters({
  categoryId,
  description,
  startDate,
  endDate,
  take,
  skip,
}: IExpenseFilters) {
  const startDateUTC = moment(startDate).utc().startOf("day").toISOString();
  const endDateUTC = moment(endDate).utc().endOf("day").toISOString();

  const expenses = await prisma.expense.findMany({
    where: {
      createdAt: {
        gte: startDateUTC,
        lte: endDateUTC,
      },
      ...(categoryId && {
        categoryId,
      }),
      ...(description && {
        description: { contains: description, mode: "insensitive" },
      }),
    },
    skip,
    take,
    include: {
      category: true,
    },
  });

  const totalLength = await prisma.expense.count({
    where: {
      createdAt: {
        gte: startDateUTC,
        lte: endDateUTC,
      },
      ...(categoryId && {
        categoryId,
      }),
      ...(description && {
        description: { contains: description, mode: "insensitive" },
      }),
    },
  });

  return {
    totalLength,
    expenses,
  };
}

export const updateExpenseService = async ({
  id,
  amount,
  categoryId,
  description,
}: IExpensePatch) => {
  return prisma.expense.update({
    where: {
      id,
    },
    data: {
      amount,
      categoryId,
      description,
    },
  });
};

export const findAllExpenseCategories = async () => {
  const categories = await prisma.expenseCategory.findMany();
  return categories.map((cat) => {
    return {
      ...cat,
      value: cat.id,
    };
  });
};
