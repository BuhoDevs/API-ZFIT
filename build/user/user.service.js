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
exports.userRegister = void 0;
const bcrypt_1 = require("../auth/helper/bcrypt");
const utils_1 = require("../utils");
const db_1 = require("../db");
const userRegister = (firstname, lastname, birthdate, ci, phone, photo, genreId, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const encriptado = yield (0, bcrypt_1.passwordHashado)(password);
    let isoBirthdate;
    if (birthdate) {
        isoBirthdate = (0, utils_1.getIsoDate)(birthdate);
    }
    const newUser = yield db_1.prisma.person.create({
        data: Object.assign(Object.assign({ firstname,
            lastname }, (isoBirthdate && { birthdate: isoBirthdate })), { ci,
            phone,
            photo,
            genreId, User: {
                create: {
                    email,
                    password: encriptado,
                    status: true,
                },
            } }),
        include: {
            User: true,
        },
    });
    if (!newUser)
        return { message: "Error en el registro de Usuario", statuscode: 409 };
    return { message: "Usuario de registro con éxito", statuscode: 200 };
});
exports.userRegister = userRegister;
