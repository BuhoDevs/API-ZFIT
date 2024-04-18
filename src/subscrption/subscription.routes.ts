import { Router } from "express";
import { suscripcion } from "../subscrption/subscription.controllers";
import { checkJwt } from "../middleware/checkJWT";

const clientRoutes = Router();

clientRoutes.post("/", checkJwt, suscripcion);

export default clientRoutes;
