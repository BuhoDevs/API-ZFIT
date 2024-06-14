import { prisma } from "../db";
import { CreateExpense, ExpenseReport } from "./types";

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
