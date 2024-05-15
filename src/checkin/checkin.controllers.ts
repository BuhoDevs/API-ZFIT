import { Request, Response } from "express";
import { checkinRegister } from "./checkin.service";
import { getSubscriptionByClient } from "../subscrption/subscription.service";
import { getClientByCI } from "../client/client.service";

export const verifySubsClient = async (req: Request, res: Response) => {
  const { clientCI } = req.body;
  try {
    const infoCliente = await getClientByCI(clientCI);
    if (!infoCliente)
      return res.status(404).json({ message: "Cliente no encontrado" });

    const clientIdInfoSubs = await getSubscriptionByClient(clientCI);
    if (!clientIdInfoSubs)
      return res
        .status(404)
        .json({ message: "El cliente no tiene suscripción activa" });

    return res.status(200).json({ infoCliente, clientIdInfoSubs });
  } catch (error) {
    console.error("Error buscar Cliente:", error);
    return res.status(500).json({ error: "Error al buscar Cliente" });
  }
};

export const checkin = async (req: Request, res: Response) => {
  const { subscriptionId } = req.body;
  try {
    const newCheckin = await checkinRegister(subscriptionId);

    return res
      .status(newCheckin.statuscode)
      .json({ message: newCheckin.message });
  } catch (error) {
    console.error("Error registro Checkin:", error);
    return res.status(500).json({ error: "Error en el Checkin" });
  }
};
