import { Request, Response } from "express";
import {
  createExpenseService,
  findAllExpenseCategories,
  findExpenseByFilters,
  updateExpenseService,
} from "./expense.service";
import { getDefaultDates, getIsoDate } from "../utils";
import { getOffSet } from "../utilities/pagination";
import { parseISO } from "date-fns";

export const createExpenseController = async (req: Request, res: Response) => {
  try {
    const { createdAt, amount, description, categoryId } = req.body;
    if (!amount || !description || !categoryId) {
      return res
        .status(400)
        .json({ message: "Campos obligatorios son requeridos" });
    }

    await createExpenseService({
      ...(createdAt && { createdAt: getIsoDate(createdAt) }),
      amount,
      description,
      categoryId,
    });
    return res.status(201).json({ message: "Gasto registrado exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al registrar el Gasto" });
  }
};

export const getExpensesByFilters = async (req: Request, res: Response) => {
  try {
    const {
      categoryId,
      description,
      take,
      skip,
      startDate: startDateQuery,
      endDate: endDateQuery,
    } = req.body;
    const offSetBySkip = getOffSet({ skip, take });
    let startDate: Date;
    let endDate: Date;

    if (startDateQuery && typeof startDateQuery === "string") {
      startDate = parseISO(startDateQuery);
    } else {
      startDate = getDefaultDates().startDate;
    }

    if (endDateQuery && typeof endDateQuery === "string") {
      endDate = parseISO(endDateQuery);
    } else {
      endDate = getDefaultDates().endDate;
    }

    const expensesByFilters = await findExpenseByFilters({
      categoryId,
      description,
      startDate,
      endDate,
      take,
      skip: offSetBySkip,
    });

    return res.json(expensesByFilters);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener Gastos" });
  }
};

export const patchingExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, description, categoryId } = req.body;

  if (!id) {
    return res.status(400).json({ message: "El id del gasto es requerido" });
  }

  try {
    await updateExpenseService({
      id: Number(id),
      amount,
      categoryId,
      description,
    });
    return res.json({ message: "Gasto actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al Actualizar el Gasto" });
  }
};

export const getAllExpenseCategories = async (_req: Request, res: Response) => {
  try {
    const expenseCategories = await findAllExpenseCategories();
    return res.json(expenseCategories);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al Obtener categorias de Gastos" });
  }
};
