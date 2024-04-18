import { ISubscriptionType } from "./types";

export const subsTypeCollection: ISubscriptionType[] = [
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
