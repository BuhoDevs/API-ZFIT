import { Request, Response } from "express";
import { findMonthlyRevenue } from "./payment.service";
import { parseISO } from "date-fns";
import { getDefaultDates } from "../utils";

export const getMonthlyRevenue = async (req: Request, res: Response) => {
  try {
    const { tartDate: startDateQuery, endDate: endDateQuery } = req.query;
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

    const monthlyRevenue = await findMonthlyRevenue({
      startDate,
      endDate,
    });
    return res.json({ monthlyRevenue });
  } catch (error) {
    console.error("Error al obtener los ingresos del mes:", error);
    return res
      .status(500)
      .json({ error: "Error al obtener los ingresos del mes" });
  }
};
