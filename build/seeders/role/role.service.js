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
exports.insertRoleSeeders = void 0;
const db_1 = require("../../db");
const contants_1 = require("./contants");
const insertRoleSeeders = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.prisma.role.createMany({
        data: contants_1.rolesCollection,
        skipDuplicates: true,
    });
});
exports.insertRoleSeeders = insertRoleSeeders;
