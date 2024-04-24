import { Request, Response } from "express";

import {
  allSuscriptionService,
  suscriptionService,
} from "../subscrption/subscription.service";
import { getOffSet } from "../utilities/pagination";

export async function suscription(req: Request, res: Response) {
  const {
    dateIn,
    dateOut,
    disciplineId,
    clientId,
    subsTypeId,
    subscriptorId,
    transactionAmmount,
    outstanding,
    totalAmmount,
  } = req.body;

  try {
    const suscription = await suscriptionService({
      dateIn,
      dateOut,
      disciplineId,
      clientId,
      subsTypeId,
      subscriptorId,
      transactionAmmount,
      outstanding,
      totalAmmount,
    });
    return res
      .status(suscription.statuscode)
      .json({ message: suscription.message });
  } catch (error) {
    console.log("error de registro es ", error);
    return res.status(500).json({ message: "Error de registro interno" });
  }
}

export async function allSuscription(req: Request, res: Response) {
  const {
    disciplineId,
    ci,
    firstname,
    lastname,
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
    const allSuscription = await allSuscriptionService({
      disciplineId,
      ci,
      firstname,
      lastname,
      subsTypeId,
      subscriptorId,
      dateIn,
      dateOut,
      status,
      take,
      skip: offSetBySkip,
    });
    return res.json(allSuscription);
  } catch (error) {
    console.log("error al obtener la lista ", error);
    return res.status(500).json({ message: "Error al obtener la lista" });
  }
}
