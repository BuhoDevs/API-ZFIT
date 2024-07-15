import { Router } from "express";
import {
  createExpenseController,
  getAllExpenseCategories,
  getExpensesByFilters,
  patchingExpense,
} from "./expense.controller";
import { checkJwt } from "../middleware/checkJWT";

const expenseRoutes = Router();

expenseRoutes.post("/", checkJwt, createExpenseController);
expenseRoutes.post("/filters", checkJwt, getExpensesByFilters);
expenseRoutes.patch("/:id", checkJwt, patchingExpense);
expenseRoutes.get("/categories", checkJwt, getAllExpenseCategories);

export default expenseRoutes;
