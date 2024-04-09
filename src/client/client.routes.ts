import { Router } from "express";
import { client, updatedClient, clientById } from "../client/client.controllers";
import { checkJwt } from "../middleware/checkJWT";

const clientRoutes = Router();

clientRoutes.post("/register",
  checkJwt,
  client);

clientRoutes.route("/:id")
  .get(checkJwt, clientById)
  .put(checkJwt, updatedClient)


export default clientRoutes;
