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
exports.insertClientSeeder = void 0;
const db_1 = require("../../db");
const insertClientSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    const isNotClientEmpty = yield db_1.prisma.client.count();
    if (isNotClientEmpty) {
        return undefined;
    }
    const staticClientData = {
        firstname: "Juan",
        lastname: "Gomez",
        ci: "123456789",
        genreId: 1,
        phone: 1234567890,
        photo: "",
    };
    return db_1.prisma.client.create({
        data: {
            Person: {
                create: staticClientData,
            },
            weight: 70,
            height: 1.75,
            status: true,
            email: "juang@gmail.com",
            password: "",
        },
    });
});
exports.insertClientSeeder = insertClientSeeder;
