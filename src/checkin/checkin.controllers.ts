import { Request, Response } from "express";
import { getSubscriptionByClientCi } from "../subscrption/subscription.service";
import {
  checkinRegister,
  findCurrentAttendances,
  findSuscriptionOnCheckin,
} from "./checkin.service";
import { getOffSet } from "../utilities/pagination";

export const checkin = async (req: Request, res: Response) => {
  const { ci, subscriptionId } = req.params;
  try {
    if (!subscriptionId) {
      return res
        .status(400)
        .json({ message: "El id de la suscripción es requerido" });
    }

    const belongingToClient = await getSubscriptionByClientCi({
      ci,
      subscripcionId: Number(subscriptionId),
    });

    const isMachineDiscipline =
      belongingToClient?.Discipline.name === "machine";

    if (!belongingToClient) {
      return res.status(409).json({
        message: "La suscripcion no pertenece a este cliente",
      });
    }

    const isAlreadyCheckinExists = await findSuscriptionOnCheckin(
      Number(subscriptionId)
    );

    if (isAlreadyCheckinExists && !isMachineDiscipline) {
      return res
        .status(401)
        .json({ message: "Ya se marcó la asistencia para esta suscripción." });
    }

    const newCheckin = await checkinRegister(Number(subscriptionId));

    return res.status(newCheckin.statuscode).json({
      message: newCheckin.message,
      Subscription: {
        dateOut: belongingToClient.dateOut,
      },
      Client: belongingToClient.Client,
      discipline: belongingToClient.Discipline.label,
    });
  } catch (error) {
    console.error("Error registro Checkin:", error);
    return res.status(500).json({ error: "Error en el Checkin" });
  }
};

export const currentAttendance = async (req: Request, res: Response) => {
  const take = req.query.take
    ? parseInt(req.query.take as string, 10)
    : undefined;
  const skip = req.query.skip
    ? parseInt(req.query.skip as string, 10)
    : undefined;
  try {
    const offSetBySkip = getOffSet({ skip, take });

    const currentAttendances = await findCurrentAttendances({
      take: take || 10,
      skip: offSetBySkip,
    });

    return res.json(currentAttendances);
  } catch (error) {
    console.error("Error al obtener datos de asistencia:", error);
    return res
      .status(500)
      .json({ error: "Error al obtener datos de asistencia" });
  }
};
