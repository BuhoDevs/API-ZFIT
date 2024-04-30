import { Request, Response } from "express";

import {
  findSuscriptionById,
  allSubscriptionService,
  subscriptionService,
  subscriptionEdit,
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

export const getSubscriptionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ message: "El id de suscripcion es requerido" });
    }

    const subscription = await findSuscriptionById({ subscripcionId: +id });
    if (subscription.error) {
      return res
        .status(subscription.code)
        .json({ message: subscription.message });
    }

    return res.status(subscription.code).json(subscription.data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "No se pudo obtener la Suscipción", error });
  }
};

export const editSubscription = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
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
    if (!id) {
      return res
        .status(400)
        .json({ message: "El ID de suscripción es requerdio" });
    }
    const existingSubscription = findSuscriptionById({ subscripcionId: +id });
    if (!existingSubscription)
      return res.status(404).json({ message: "La suscripción no existe" });

    const subscripEdit = await subscriptionEdit({
      id,
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

    return res.json({
      message: "Suscripción actualizado correctamente",
      subscripEdit,
    });
  } catch (error) {
    console.error("Error modificar Suscripción:", error);
    return res.status(500).json({ error: "Error al modificar la Suscripción" });
  }
};
