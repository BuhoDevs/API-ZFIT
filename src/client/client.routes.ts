import { Router } from "express";
import {
  clientRegister,
  updatedClient,
  clientById,
  allClient,
  deleteClientById,
} from "../client/client.controllers";
import { checkJwt } from "../middleware/checkJWT";

const clientRoutes = Router();

clientRoutes.post("/register", checkJwt, clientRegister);

clientRoutes
  .route("/:id")
  .get(checkJwt, clientById)
  .put(checkJwt, updatedClient)
  .delete(checkJwt, deleteClientById);

clientRoutes.get("/", checkJwt, allClient);

export default clientRoutes;
