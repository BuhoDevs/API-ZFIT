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
exports.checkJwt = void 0;
const jwt_1 = require("../auth/helper/jwt");
const db_1 = require("../db");
const checkJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwtByUser = req.headers.authorization || "";
        const jwt = jwtByUser.split(" ").pop();
        const isCorrect = (yield (0, jwt_1.verifyToken)(`${jwt}`));
        if (!isCorrect) {
            return res.status(401).json({ message: "Usuario no autorizado" });
        }
        const user = yield db_1.prisma.user.findFirst({
            where: {
                email: isCorrect.id,
            },
        });
        req.user = user;
        return next();
    }
    catch (error) {
        return res.status(400).json({ message: "Las credenciales son requeridos" });
    }
});
exports.checkJwt = checkJwt;
