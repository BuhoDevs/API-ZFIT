import { Router } from "express";
import { checkJwt } from "../middleware/checkJWT";
import { checkin, currentAttendance } from "./checkin.controllers";

const checkinRoutes = Router();

checkinRoutes.post("/:ci/:subscriptionId", checkJwt, checkin);
checkinRoutes.get("/attendances-current", checkJwt, currentAttendance);

export default checkinRoutes;
