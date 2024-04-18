import { Request, Response } from "express";
import { prisma } from "../db";
import {
  deleteSubscriptionTypes,
  getAllSubscriptionTypes,
  subscriptiontype,
  updateSubscriptionType,
} from "./substype.service";

export const substypeRegister = async (req: Request, res: Response) => {
  const { name, label, montQuantity, price } = req.body;

  try {
    const existsSubstype = await prisma.subsType.findFirst({
      where: { name },
    });
    if (existsSubstype)
      return res.status(409).json({
        message: `Ya existe un tipo de suscripcion con ese Nombre: ${name}`,
      });

    const newSubstype = await subscriptiontype(
      name,
      label,
      montQuantity,
      price
    );

    return res.json({ message: newSubstype.message });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error registrar tipo de suscripcion" });
  }
};

export const substypeUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, label, montQuantity, price } = req.body;

  try {
    const updatedSubscriptionType = await updateSubscriptionType(+id, {
      name,
      label,
      montQuantity,
      price,
    });
    return res.json({
      message: `Tipo de suscripción con ID ${id} modificado correctamente`,
      updatedSubscriptionType,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error modificando tipo de suscripcion" });
  }
};

export const deleteSubsTypeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedSubscriptionType = await deleteSubscriptionTypes(+id);
    return res.json({
      message: `Tipo de suscripción con ID ${id} eliminado correctamente`,
      deletedSubscriptionType,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error eliminando tipo de suscripcion" });
  }
};

export const AllSubstype = async (_req: Request, res: Response) => {
  try {
    const subscriptionTypes = await getAllSubscriptionTypes();
    return res.json(subscriptionTypes);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al obtener todas los tipos de suscripcion" });
  }
};
