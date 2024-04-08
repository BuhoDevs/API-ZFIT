import { Router } from "express";
import { client, updatedClient } from "../client/client.controllers";
import { checkJwt } from "../middleware/checkJWT";

const clientRoutes = Router();

clientRoutes.post("/register",
  checkJwt,
  client);


clientRoutes.put("/update-client/:id",
  checkJwt,
  updatedClient);

export default clientRoutes;
