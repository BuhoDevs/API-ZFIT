import { IDateEjecuted } from "./types";
import moment from "moment";

export const dateEjecCollection: IDateEjecuted[] = [
  {
    date: new Date(moment().format("YYYY-MM-DD")),
  },
];
