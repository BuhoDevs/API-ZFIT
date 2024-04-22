import { Router } from "express";
import {
  allSuscripcion,
  suscripcion,
} from "../subscrption/subscription.controllers";
import { checkJwt } from "../middleware/checkJWT";

const clientRoutes = Router();

clientRoutes.post("/", checkJwt, suscripcion);

clientRoutes.post("/filters", checkJwt, allSuscripcion);

export default clientRoutes;
