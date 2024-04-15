import { Router } from "express";
import { checkJwt } from "../middleware/checkJWT";
import {
  Discipline,
  editDiscipline,
  allDiscipline,
  lowDiscipline,
} from "./discipline.controllers";

const disciplineRoutes = Router();

disciplineRoutes.post("/register", checkJwt, Discipline);

disciplineRoutes.put("/edit/:disciplineId", checkJwt, editDiscipline);

disciplineRoutes.put("/low/:disciplineId", checkJwt, lowDiscipline);

disciplineRoutes.get(
  "/all",
  //checkJwt,
  allDiscipline
);

export default disciplineRoutes;
