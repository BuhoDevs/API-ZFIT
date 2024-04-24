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
exports.Register = void 0;
const user_service_1 = require("../user/user.service");
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, birthdate, ci, phone, photo, genreId, email, password } = req.body;
    try {
        const newUser = yield (0, user_service_1.userRegister)(firstname, lastname, birthdate, ci, phone, photo, genreId, email, password);
        return res.status(newUser.statuscode).json({ message: newUser.message });
    }
    catch (error) {
        return res.status(500).json({ error: "Error al registrar Usuario" });
    }
});
exports.Register = Register;
