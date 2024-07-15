import { Router } from "express";
import { checkJwt } from "../middleware/checkJWT";
import { getBalanceExport } from "./balance.service";

const balanceRoutes = Router();

balanceRoutes.get("/reports/export", checkJwt, getBalanceExport);

export default balanceRoutes;
