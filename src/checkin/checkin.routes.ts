import { Router } from "express";
import { checkJwt } from "../middleware/checkJWT";
import { checkin, verifySubsClient } from "./checkin.controllers";

const checkinRoutes = Router();

checkinRoutes.post("/", checkJwt, checkin);

checkinRoutes.get("/", checkJwt, verifySubsClient);

export default checkinRoutes;
