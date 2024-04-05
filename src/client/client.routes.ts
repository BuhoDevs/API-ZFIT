import { Router } from "express";
import { Client } from "../client/client.controllers";

const clientRoutes = Router();

clientRoutes.post("/register", Client);

export default clientRoutes;
