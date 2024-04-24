import { Router } from "express";
import {
  allSuscription,
  suscription,
} from "../subscrption/subscription.controllers";
import { checkJwt } from "../middleware/checkJWT";

const clientRoutes = Router();

clientRoutes.post("/", checkJwt, suscription);

clientRoutes.post("/filters", checkJwt, allSuscription);

export default clientRoutes;
