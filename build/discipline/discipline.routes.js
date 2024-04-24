"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkJWT_1 = require("../middleware/checkJWT");
const discipline_controllers_1 = require("./discipline.controllers");
const disciplineRoutes = (0, express_1.Router)();
disciplineRoutes.post("/", checkJWT_1.checkJwt, discipline_controllers_1.Discipline);
disciplineRoutes.put("/:disciplineId", checkJWT_1.checkJwt, discipline_controllers_1.editDiscipline);
disciplineRoutes.delete("/:disciplineId", checkJWT_1.checkJwt, discipline_controllers_1.lowDiscipline);
disciplineRoutes.get("/", checkJWT_1.checkJwt, discipline_controllers_1.allDiscipline);
exports.default = disciplineRoutes;
