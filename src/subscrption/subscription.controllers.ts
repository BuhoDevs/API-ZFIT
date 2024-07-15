import { Request, Response } from "express";
import { prisma } from "../db";
import {
  findSuscriptionById,
  allSubscriptionService,
  subscriptionService,
  subscriptionEdit,
  subscriptionLow,
  getSubscriptionByClient,
  subscriptionBalanceService,
  findTotalActiveMembers,
  findTotalNewMembersThisMonth,
  findMembershipsExpiringSoon,
} from "../subscrption/subscription.service";
import { getOffSet } from "../utilities/pagination";
import { getClientByCI } from "../client/client.service";
import { getDefaultDates } from "../utils";
import { parseISO } from "date-fns";
import { getExpenseService } from "../expense/expense.service";

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
      outstanding: Number(outstanding),
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
      .json({ message: "No se pudo obtener la Suscripción", error });
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

    if (!subscripEdit) {
      return res
        .status(409)
        .json({ message: "Error al modificar la suscripción" });
    }

    return res.json({
      message: "Suscripción actualizada correctamente",
      subscripEdit,
    });
  } catch (error) {
    console.error("Error modificar Suscripción:", error);
    return res.status(500).json({ error: "Error al modificar la Suscripción" });
  }
};

export const deleteSubscription = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id)
      return res
        .status(400)
        .json({ message: "El id de suscripción es requerido " });

    const existingSubscription = await prisma.subscription.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingSubscription)
      return res
        .status(409)
        .json({ message: "No existe una Suscripción con ese codigo" });

    const lowSubscription = await subscriptionLow(parseInt(id));

    return res
      .status(lowSubscription.statuscode)
      .json({ message: lowSubscription.message });
  } catch (error) {
    console.error("Error baja la Suscripción:", error);
    return res
      .status(500)
      .json({ message: "Error al dar de baja la Suscripción" });
  }
};

export const getSubscriptionsByCi = async (req: Request, res: Response) => {
  const { ci } = req.params;
  try {
    if (!ci) {
      return res.status(400).json({ message: "El ci es requerido" });
    }
    const infoCliente = await getClientByCI(ci);
    if (!infoCliente)
      return res.status(404).json({ message: "Cliente no encontrado" });

    const clientIdInfoSubs = await getSubscriptionByClient(ci);
    if (!clientIdInfoSubs)
      return res
        .status(404)
        .json({ message: "El cliente no tiene suscripción activa" });

    return res.status(200).json({ ...infoCliente, ...clientIdInfoSubs });
  } catch (error) {
    console.error("Error buscar Cliente:", error);
    return res.status(500).json({ error: "Error al buscar Cliente" });
  }
};

export const subscriptionBalance = async (req: Request, res: Response) => {
  try {
    const { startDate: startDateQuery, endDate: endDateQuery } = req.query;

    let startDate: Date;
    let endDate: Date;

    if (startDateQuery && typeof startDateQuery === "string") {
      startDate = parseISO(startDateQuery);
    } else {
      startDate = getDefaultDates().startDate;
    }

    if (endDateQuery && typeof endDateQuery === "string") {
      endDate = parseISO(endDateQuery);
    } else {
      endDate = getDefaultDates().endDate;
    }

    const subscriptionBalance = await subscriptionBalanceService(
      startDate,
      endDate
    );
    const expenseBalance = await getExpenseService(startDate, endDate);

    const totalIncome = subscriptionBalance.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );
    const totalExpense = expenseBalance.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );

    const netBalance = totalIncome - totalExpense;

    return res.status(200).json({
      subscriptionBalance,
      expenseBalance,
      totalIncome,
      totalExpense,
      netBalance,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error al obtener el balance de ingresos" });
  }
};

// Total de miembros activos
export const getTotalActiveMembers = async (_req: Request, res: Response) => {
  try {
    const totalActiveMembers = await findTotalActiveMembers();
    return res.json({ totalActiveMembers });
  } catch (error) {
    console.error("Error al obtener el total de miembros activos:", error);
    return res
      .status(500)
      .json({ error: "Error al obtener el total de miembros activos" });
  }
};

export const getTotalNewMembersThisMonth = async (
  _req: Request,
  res: Response
) => {
  try {
    const totalNewMembersThisMonth = await findTotalNewMembersThisMonth();
    return res.json({ totalNewMembersThisMonth });
  } catch (error) {
    console.error(
      "Error al obtener el total de miembros nuevos este mes:",
      error
    );
    return res
      .status(500)
      .json({ error: "Error al obtener el total de miembros nuevos este mes" });
  }
};

// Membresías que expiran pronto
export const getMembershipsExpiringSoon = async (
  req: Request,
  res: Response
) => {
  const take = req.query.take
    ? parseInt(req.query.take as string, 10)
    : undefined;
  const skip = req.query.skip
    ? parseInt(req.query.skip as string, 10)
    : undefined;
  try {
    const offSetBySkip = getOffSet({ skip, take });
    const membershipsExpiringSoon = await findMembershipsExpiringSoon({
      take: take || 10,
      skip: offSetBySkip,
    });
    return res.json(membershipsExpiringSoon);
  } catch (error) {
    console.error("Error al obtener las membresías que expiran pronto:", error);
    return res
      .status(500)
      .json({ error: "Error al obtener las membresías que expiran pronto" });
  }
};
