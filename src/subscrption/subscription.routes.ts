import { Router } from "express";
import {
  getSubscriptionById,
  allSubscription,
  subscription,
  editSubscription,
  deleteSubscription,
  getSubscriptionsByCi,
  subscriptionBalance,
} from "../subscrption/subscription.controllers";
import { checkJwt } from "../middleware/checkJWT";

const subscriptionRoutes = Router();

subscriptionRoutes.post("/", checkJwt, subscription);

subscriptionRoutes.post("/filters", checkJwt, allSubscription);

subscriptionRoutes.get("/:id", checkJwt, getSubscriptionById);

subscriptionRoutes.get("/ci/:ci", checkJwt, getSubscriptionsByCi);

subscriptionRoutes.put("/:id", checkJwt, editSubscription);

subscriptionRoutes.delete("/:id", checkJwt, deleteSubscription);

subscriptionRoutes.get(
  "/balance/income-expense",
  checkJwt,
  subscriptionBalance
);

export default subscriptionRoutes;
