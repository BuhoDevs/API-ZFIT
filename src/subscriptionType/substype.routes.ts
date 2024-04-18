import { Router } from "express";
import { checkJwt } from "../middleware/checkJWT";
import {
  substypeRegister,
  substypeUpdate,
  deleteSubsTypeById,
  AllSubstype,
} from "./substype.controllers";

const subscTypeRoutes = Router();

subscTypeRoutes.post("/register", checkJwt, substypeRegister);

subscTypeRoutes.get("/", checkJwt, AllSubstype);

subscTypeRoutes
  .route("/:id")
  .put(checkJwt, substypeUpdate)
  .delete(checkJwt, deleteSubsTypeById);

export default subscTypeRoutes;
