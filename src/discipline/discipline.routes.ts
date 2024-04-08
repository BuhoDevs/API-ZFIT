import { Router } from "express";
import { checkJwt } from "../middleware/checkJWT";
import {
  Discipline,
  editDiscipline,
  lowDiscipline,
} from "./discipline.controllers";

const discipleneRoutes = Router();

discipleneRoutes.post("/register", checkJwt, Discipline);

discipleneRoutes.put("/edit/:disciplineId", checkJwt, editDiscipline);

discipleneRoutes.put(
  "/low/:disciplineId",
  //checkJwt,
  lowDiscipline
);

export default discipleneRoutes;
