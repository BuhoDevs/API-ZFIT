import { ISubscriptionType } from "./types";

export const subsTypeCollection: ISubscriptionType[] = [
  {
    name: "session",
    label: "sesion",
    montQuantity: 0,
    price: 10,
    status: true,
  },
  {
    name: "monthly",
    label: "mensual",
    montQuantity: 1,
    price: 100,
    status: true,
  },

  {
    name: "year",
    label: "anual",
    montQuantity: 12,
    price: 1000,
    status: true,
  },
];
