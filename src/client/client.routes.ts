import { Router } from "express";
import {
  clientRegister,
  updatedClient,
  clientById,
  allClient,
  deleteClientById,
} from "../client/client.controllers";
import { checkJwt } from "../middleware/checkJWT";
import { upload } from "../middleware/uploadFile.middleware";

const clientRoutes = Router();

clientRoutes.post(
  "/register",
  //checkJwt,
  upload.single("photo"),
  clientRegister
);

clientRoutes
  .route("/:id")
  .get(checkJwt, clientById)
  .put(checkJwt, updatedClient)
  .delete(checkJwt, deleteClientById);

clientRoutes.get("/", checkJwt, allClient);

export default clientRoutes;
