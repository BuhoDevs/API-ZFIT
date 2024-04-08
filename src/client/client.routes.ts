import { Router } from "express";
import { client, updatedClient, getClientById } from "../client/client.controllers";
import { checkJwt } from "../middleware/checkJWT";

const clientRoutes = Router();

clientRoutes.post("/register",
    checkJwt,
    client);

clientRoutes.put("/update-client/:id",
    checkJwt,
    updatedClient);

clientRoutes.get("/get-client/:id",
    checkJwt,
    getClientById);

export default clientRoutes;
