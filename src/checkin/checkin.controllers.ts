import { Request, Response } from "express";
import { getSubscriptionByClientCi } from "../subscrption/subscription.service";
import { checkinRegister, findSuscriptionOnCheckin } from "./checkin.service";

// export const verifySubsClient = async (req: Request, res: Response) => {
//   const { ci } = req.params;
//   try {
//     if (!ci) {
//       return res.status(400).json({ message: "El ci es requerido" });
//     }
//     const infoCliente = await getClientByCI(ci);
//     if (!infoCliente)
//       return res.status(404).json({ message: "Cliente no encontrado" });

//     const clientIdInfoSubs = await getSubscriptionByClient(ci);
//     if (!clientIdInfoSubs)
//       return res
//         .status(404)
//         .json({ message: "El cliente no tiene suscripción activa" });

//     return res.status(200).json({ ...infoCliente, ...clientIdInfoSubs });
//   } catch (error) {
//     console.error("Error buscar Cliente:", error);
//     return res.status(500).json({ error: "Error al buscar Cliente" });
//   }
// };

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

    return res
      .status(newCheckin.statuscode)
      .json({ message: newCheckin.message });
  } catch (error) {
    console.error("Error registro Checkin:", error);
    return res.status(500).json({ error: "Error en el Checkin" });
  }
};
