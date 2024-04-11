import { Router } from "express";
import {
  Client,
  updatedClient,
  clientById,
  allClient,
} from "../client/client.controllers";
import { checkJwt } from "../middleware/checkJWT";

const clientRoutes = Router();

clientRoutes.post("/register", checkJwt, Client);

clientRoutes
  .route("/:id")
  .get(checkJwt, clientById)
  .put(checkJwt, updatedClient);

clientRoutes.get("/", checkJwt, allClient);

export default clientRoutes;
