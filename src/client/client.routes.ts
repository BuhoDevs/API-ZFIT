import { Router } from "express";
import {
  allClient,
  clientById,
  clientRegister,
  deleteClientById,
  updatedClient,
} from "../client/client.controllers";
import { checkJwt } from "../middleware/checkJWT";
import { singleUploadMiddleware } from "../middleware/uploadFile.middleware";

const clientRoutes = Router();

clientRoutes.post(
  "/register",
  checkJwt,
  singleUploadMiddleware,
  clientRegister
);

clientRoutes
  .route("/:id")
  .get(checkJwt, clientById)
  .put(checkJwt, updatedClient)
  .delete(checkJwt, deleteClientById);

clientRoutes.get("/", checkJwt, allClient);

export default clientRoutes;
