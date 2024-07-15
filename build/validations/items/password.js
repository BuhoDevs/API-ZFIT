"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationPassword = void 0;
const regex_1 = require("../../auth/helper/regex");
const validationPassword = (password) => {
    if (!regex_1.regexPassword.test(password)) {
        // return res.status(400).json({
        //   message: 'La contraseña debe contener al menos 8 caracteres incluyendo: mayúsculas, minúsculas, números y caracteres especiales ( @, $, !, %, *, ?, _ , - o &.)'
        // });
        throw new Error("La contraseña debe contener al menos 8 caracteres incluyendo: Mayúsculas, Minúsculas, números y caracteres especiales (@, $, !, %, *, ?, _ , -, &)"); // OK
    }
    return password;
};
exports.validationPassword = validationPassword;
