"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allGenresController = void 0;
const genre_service_1 = require("./genre.service");
const allGenresController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genres = yield (0, genre_service_1.findAllGenres)();
        return res.json(genres);
    }
    catch (error) {
        return res.json({
            error,
            message: "Error interno del servidor",
        });
    }
});
exports.allGenresController = allGenresController;
