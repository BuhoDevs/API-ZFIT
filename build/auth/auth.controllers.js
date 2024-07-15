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
exports.Login = void 0;
const auh_service_1 = require("../auth/auh.service");
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const loginResult = yield (0, auh_service_1.userLogin)(email, password);
        if (loginResult.error) {
            return res
                .status(loginResult.code)
                .json({ message: loginResult.message });
        }
        return res.json(loginResult);
    }
    catch (error) {
        return res.status(401).json({ message: "Error al loguearse" });
    }
});
exports.Login = Login;
