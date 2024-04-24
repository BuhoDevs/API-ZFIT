"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationContact = void 0;
const regex_1 = require("../../auth/helper/regex");
const validationContact = (contact) => {
    if (!contact) {
        throw new Error("Debe ingresar un contacto");
    }
    if (!regex_1.regexPhone.test(contact)) {
        throw new Error("Numero de contacto es inválido");
    }
    return contact;
};
exports.validationContact = validationContact;
