import { Router } from "express";
import {
  allSubscription,
  subscription,
} from "../subscrption/subscription.controllers";
import { checkJwt } from "../middleware/checkJWT";

const clientRoutes = Router();

clientRoutes.post("/", checkJwt, subscription);

clientRoutes.post("/filters", checkJwt, allSubscription);

export default clientRoutes;
