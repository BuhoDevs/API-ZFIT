import { Router } from "express";
import {
  allSuscription,
  getSubscriptionById,
  suscription,
} from "../subscrption/subscription.controllers";
import { checkJwt } from "../middleware/checkJWT";

const clientRoutes = Router();

clientRoutes.post("/", checkJwt, suscription);

clientRoutes.post("/filters", checkJwt, allSuscription);

clientRoutes.get("/:id", checkJwt, getSubscriptionById);

export default clientRoutes;
