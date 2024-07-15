"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const gmail_1 = require("./items/gmail");
const password_1 = require("./items/password");
const name_1 = require("./items/name");
const validateRegister = (admin) => {
    if (!admin.firstname && !admin.password && !admin.email) {
        throw new Error("Todos los campos son requeridos");
    }
    (0, name_1.validationFullName)(admin.firstname);
    (0, gmail_1.validationEmail)(admin.email);
    (0, password_1.validationPassword)(admin.password);
    // if (validationPassword(admin.password) !== admin.confirmPassword) {
    //   throw new Error("El password no coincide");
    // }
    return admin;
};
exports.validateRegister = validateRegister;
