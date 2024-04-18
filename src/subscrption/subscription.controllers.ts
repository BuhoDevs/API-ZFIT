import { Request, Response } from "express";

import { suscripcionService } from "../subscrption/subscription.service";

export async function suscripcion(req: Request, res: Response) {
  const {
    dateIn,
    dateOut,
    disciplineId,
    clientId,
    subsTypeId,
    subscriptorId,
    transactionAmmount,
    discount,
  } = req.body;

  try {
    const suscripcion = await suscripcionService({
      dateIn,
      dateOut,
      disciplineId,
      clientId,
      subsTypeId,
      subscriptorId,
      transactionAmmount,
      discount,
    });
    return res
      .status(suscripcion.statuscode)
      .json({ message: suscripcion.message });
  } catch (error) {
    console.log("error de registro es ", error);
    return res.status(500).json({ message: "Error de registro interno" });
  }
}
