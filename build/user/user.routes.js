"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("./user.controllers");
const userRoutes = (0, express_1.Router)();
userRoutes.post("/register", user_controllers_1.Register);
exports.default = userRoutes;
