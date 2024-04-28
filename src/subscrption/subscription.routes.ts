import { Router } from "express";
import {
  getSubscriptionById,
  allSubscription,
  subscription,
} from "../subscrption/subscription.controllers";
import { checkJwt } from "../middleware/checkJWT";

const clientRoutes = Router();

clientRoutes.post("/", checkJwt, subscription);

clientRoutes.post("/filters", checkJwt, allSubscription);

clientRoutes.get("/:id", checkJwt, getSubscriptionById);

export default clientRoutes;
