import { Router } from "express";
import {
    client,
    updatedClient,
    clientById,
    allClient,
    deleteClientById
} from "../client/client.controllers";
import { checkJwt } from "../middleware/checkJWT";

const clientRoutes = Router();

clientRoutes.post("/register",
    checkJwt,
    client);

clientRoutes.route("/:id")
    .get(checkJwt, clientById)
    .put(checkJwt, updatedClient)
    .delete(checkJwt, deleteClientById)


clientRoutes.get("/",
    checkJwt,
    allClient)


export default clientRoutes;
