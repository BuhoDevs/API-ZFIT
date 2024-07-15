"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkJWT_1 = require("../middleware/checkJWT");
const genre_controllers_1 = require("./genre.controllers");
const genreRoutes = (0, express_1.Router)();
genreRoutes.get("/", checkJWT_1.checkJwt, genre_controllers_1.allGenresController);
exports.default = genreRoutes;
