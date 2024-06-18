import { Router } from "express";
import { createExpenseController } from "./expense.controller";
import { checkJwt } from "../middleware/checkJWT";

const expenseRoutes = Router();

expenseRoutes.post("/", checkJwt, createExpenseController);

export default expenseRoutes;
