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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = void 0;
const bcrypt_1 = require("./helper/bcrypt");
const jwt_1 = require("./helper/jwt");
const db_1 = require("../db");
const userLogin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({
        // TODO: validar el login con el estado del user
        where: { email },
        include: {
            Role: true,
            Person: true,
        },
    });
    if (!user) {
        return {
            code: 404,
            error: true,
            message: "El usuario no fue encontrado",
        };
    }
    const passwordHash = user.password;
    const isCorrect = yield (0, bcrypt_1.correctPassword)(password, passwordHash);
    if (!isCorrect) {
        return {
            code: 409,
            error: true,
            message: "Usuario y/o contraseña inválidos.",
        };
    }
    const token = (0, jwt_1.generateToken)(user.email);
    const { password: passwordCopy } = user, restUserValues = __rest(user, ["password"]);
    return {
        token,
        user: Object.assign({}, restUserValues),
    };
});
exports.userLogin = userLogin;
