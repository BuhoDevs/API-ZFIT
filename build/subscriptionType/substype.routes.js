"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkJWT_1 = require("../middleware/checkJWT");
const substype_controllers_1 = require("./substype.controllers");
const subscTypeRoutes = (0, express_1.Router)();
subscTypeRoutes.post("/register", checkJWT_1.checkJwt, substype_controllers_1.substypeRegister);
subscTypeRoutes.get("/", checkJWT_1.checkJwt, substype_controllers_1.AllSubstype);
subscTypeRoutes
    .route("/:id")
    .put(checkJWT_1.checkJwt, substype_controllers_1.substypeUpdate)
    .delete(checkJWT_1.checkJwt, substype_controllers_1.deleteSubsTypeById);
exports.default = subscTypeRoutes;
