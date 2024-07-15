import { ExpenseCategory } from "@prisma/client";

export const expenseCategoryCollection: Omit<ExpenseCategory, "id">[] = [
  {
    label: "Sueldos",
    name: "Sueldos",
    status: true,
  },
  {
    label: "Servicios básicos",
    name: "Servicios básicos",
    status: true,
  },
  {
    label: "Alquileres",
    name: "Alquileres",
    status: true,
  },
  {
    label: "Refacciones",
    name: "Refacciones",
    status: true,
  },
  {
    label: "Otros",
    name: "Otros",
    status: true,
  },
];
