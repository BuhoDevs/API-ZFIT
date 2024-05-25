import { Router } from "express";
import { checkJwt } from "../middleware/checkJWT";
import { checkin } from "./checkin.controllers";

const checkinRoutes = Router();

checkinRoutes.post("/:ci/:subscriptionId", checkJwt, checkin);

// checkinRoutes.get("/:ci", checkJwt, verifySubsClient);

export default checkinRoutes;
