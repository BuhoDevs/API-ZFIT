import { Request, Response } from "express";

import {
  allSuscripcionService,
  suscripcionService,
} from "../subscrption/subscription.service";
import { getOffSet } from "../utilities/pagination";

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

export async function allSuscripcion(req: Request, res: Response) {
  const {
    disciplineId,
    ci,
    firstName,
    lastName,
    subsTypeId,
    subscriptorId,
    dateIn,
    dateOut,
    status,
    take,
    skip,
  } = req.body;

  try {
    const offSetBySkip = getOffSet({ skip, take });
    const allSuscripcion = await allSuscripcionService({
      disciplineId,
      ci,
      firstName,
      lastName,
      subsTypeId,
      subscriptorId,
      dateIn,
      dateOut,
      status,
      take,
      skip: offSetBySkip,
    });
    return res.json({
      code: 200,
      data: allSuscripcion,
    });
  } catch (error) {
    console.log("error al obtener la lista ", error);
    return res.status(500).json({ message: "Error al obtener la lista" });
  }
}
