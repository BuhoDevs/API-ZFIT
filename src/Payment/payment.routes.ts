import { Router } from "express";
import { getMonthlyRevenue } from "./payment.controller";
import { checkJwt } from "../middleware/checkJWT";

const paymentRoutes = Router();

paymentRoutes.get("/monthly-revenue", checkJwt, getMonthlyRevenue);

export default paymentRoutes;
