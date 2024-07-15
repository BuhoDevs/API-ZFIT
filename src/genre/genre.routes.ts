import { Router } from "express";
import { checkJwt } from "../middleware/checkJWT";
import { allGenresController } from "./genre.controllers";

const genreRoutes = Router();

genreRoutes.get("/", checkJwt, allGenresController);

export default genreRoutes;
