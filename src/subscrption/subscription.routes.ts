import { Router } from "express";
import {
  getSubscriptionById,
  allSubscription,
  subscription,
  editSubscription,
} from "../subscrption/subscription.controllers";
import { checkJwt } from "../middleware/checkJWT";

const subscriptionRoutes = Router();

subscriptionRoutes.post("/", checkJwt, subscription);

subscriptionRoutes.post("/filters", checkJwt, allSubscription);

subscriptionRoutes.get("/:id", checkJwt, getSubscriptionById);

subscriptionRoutes.put("/:id", checkJwt, editSubscription);

export default subscriptionRoutes;
