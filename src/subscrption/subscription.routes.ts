import { Router } from "express";
import {
  getSubscriptionById,
  allSubscription,
  subscription,
  editSubscription,
} from "../subscrption/subscription.controllers";
import { checkJwt } from "../middleware/checkJWT";

const clientRoutes = Router();

clientRoutes.post("/", checkJwt, subscription);

clientRoutes.post("/filters", checkJwt, allSubscription);

clientRoutes.get("/:id", checkJwt, getSubscriptionById);

clientRoutes.put("/:id", checkJwt, editSubscription);

export default clientRoutes;
