import { Request, Response } from "express";

import {
  allSubscriptionService,
  subscriptionService,
} from "../subscrption/subscription.service";
import { getOffSet } from "../utilities/pagination";

export async function subscription(req: Request, res: Response) {
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
    const subscription = await subscriptionService({
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
      .status(subscription.statuscode)
      .json({ message: subscription.message });
  } catch (error) {
    console.log("error de registro es ", error);
    return res.status(500).json({ message: "Error de registro interno" });
  }
}

export async function allSubscription(req: Request, res: Response) {
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
    const allSubscription = await allSubscriptionService({
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
    return res.json(allSubscription);
  } catch (error) {
    console.log("error al obtener la lista ", error);
    return res.status(500).json({ message: "Error al obtener la lista" });
  }
}
