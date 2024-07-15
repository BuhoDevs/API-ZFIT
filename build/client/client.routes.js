"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_controllers_1 = require("../client/client.controllers");
const checkJWT_1 = require("../middleware/checkJWT");
const uploadFile_middleware_1 = require("../middleware/uploadFile.middleware");
const clientRoutes = (0, express_1.Router)();
clientRoutes.post("/register", checkJWT_1.checkJwt, uploadFile_middleware_1.singleUploadMiddleware, client_controllers_1.clientRegister);
clientRoutes
    .route("/:id")
    .get(checkJWT_1.checkJwt, client_controllers_1.clientById)
    .put(checkJWT_1.checkJwt, client_controllers_1.updatedClient)
    .delete(checkJWT_1.checkJwt, client_controllers_1.deleteClientById);
clientRoutes.post("/", checkJWT_1.checkJwt, client_controllers_1.allClient);
exports.default = clientRoutes;
