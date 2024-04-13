import { Request, Response } from "express";

import { suscripcionService } from "../subscrption/subscription.service";

export async function suscripcion(req: Request, res: Response) {
  const { dateIn, dateOut, status, label, disciplineId, clientId, subsTypeId } =
    req.body;

  try {
    const suscripcion = await suscripcionService({
      dateIn,
      dateOut,
      status,
      label,
      disciplineId,
      clientId,
      subsTypeId,
    });
    return res.json(suscripcion);
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
