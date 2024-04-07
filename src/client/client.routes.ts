import { Router } from "express";
import { Client } from "../client/client.controllers";
import { checkJwt } from "../middleware/checkJWT";

const clientRoutes = Router();

clientRoutes.post("/register",checkJwt, Client);

export default clientRoutes;
