"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subscription_controllers_1 = require("../subscrption/subscription.controllers");
const checkJWT_1 = require("../middleware/checkJWT");
const clientRoutes = (0, express_1.Router)();
clientRoutes.post("/", checkJWT_1.checkJwt, subscription_controllers_1.suscription);
clientRoutes.post("/filters", checkJWT_1.checkJwt, subscription_controllers_1.allSuscription);
exports.default = clientRoutes;
