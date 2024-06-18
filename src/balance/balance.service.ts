import { Request, Response } from "express";
import * as XLSX from "xlsx";
import { subscriptionBalanceService } from "../subscrption/subscription.service";
import { parseISO } from "date-fns";
import { getDefaultDates } from "../utils";
import { getExpenseService } from "../expense/expense.service";

export const getBalanceExport = async (req: Request, res: Response) => {
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

    // Obtener los reportes
    const incomeReport = await subscriptionBalanceService(startDate, endDate);
    const expenseReport = await getExpenseService(startDate, endDate);

    const totalIncome = incomeReport.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );
    const totalExpense = expenseReport.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );

    const netBalanceReport = totalIncome - totalExpense;

    // Crear un libro de trabajo
    const workbook = XLSX.utils.book_new();

    // Crear la hoja de ingresos
    const incomeData = [
      [
        "Disciplina",
        "Tipo de Suscripción",
        "Cantidad de Suscripciones",
        "Total Recaudado",
      ],
      ...incomeReport.map((item) => [
        item.discipline,
        item.totalAmount,
        item.count,
        item.totalAmount,
      ]),
    ];
    const incomeSheet = XLSX.utils.aoa_to_sheet(incomeData);
    XLSX.utils.book_append_sheet(workbook, incomeSheet, "Ingresos");

    // Crear la hoja de egresos
    const expenseData = [
      ["Tipo de Gasto", "Cantidad por Tipo", "Total Gastado"],
      ...expenseReport.map((item) => [
        item.category,
        item.count,
        item.totalAmount,
      ]),
    ];
    const expenseSheet = XLSX.utils.aoa_to_sheet(expenseData);
    XLSX.utils.book_append_sheet(workbook, expenseSheet, "Egresos");

    // Crear la hoja de ganancias netas
    const netBalanceData = [
      ["Total Ingresos", "Total Egresos", "Ganancias Netas"],
      [totalIncome, totalExpense, netBalanceReport],
    ];
    const netBalanceSheet = XLSX.utils.aoa_to_sheet(netBalanceData);
    XLSX.utils.book_append_sheet(workbook, netBalanceSheet, "Ganancias Netas");

    // Generar el archivo Excel en formato binario
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    // Configurar la respuesta
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=balance_report.xlsx"
    );
    res.setHeader("Content-Type", "application/octet-stream");

    // Enviar el archivo
    res.send(buffer);
  } catch (error) {
    console.error("Error al generar el reporte de balance", error);
    res.status(500).send("Error al generar el reporte de balance");
  }
};
