import { Request, Response } from "express";
import { createExpenseService } from "./expense.service";
import { getIsoDate } from "../utils";

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
