import { Router } from "express";
import { checkJwt } from "../middleware/checkJWT";
import {
  Discipline,
  editDiscipline,
  allDiscipline,
  lowDiscipline,
} from "./discipline.controllers";

const disciplineRoutes = Router();

disciplineRoutes.post("/", checkJwt, Discipline);

disciplineRoutes.put("/:disciplineId", checkJwt, editDiscipline);

disciplineRoutes.delete("/:disciplineId", checkJwt, lowDiscipline);

disciplineRoutes.get("/", checkJwt, allDiscipline);

export default disciplineRoutes;
