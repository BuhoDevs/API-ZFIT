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
exports.insertAdminSeeder = void 0;
const db_1 = require("../../db");
const role_service_1 = require("../../role/role.service");
const insertAdminSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    const isPersonNotEmpty = yield db_1.prisma.person.count();
    if (isPersonNotEmpty) {
        return undefined;
    }
    const adminRole = yield (0, role_service_1.findRoleByName)({ name: "admin" });
    if (!adminRole) {
        return undefined;
    }
    return db_1.prisma.person.create({
        data: {
            firstname: "Manuel",
            lastname: "Caceres",
            ci: "123456",
            genreId: 1,
            User: {
                create: {
                    email: "admin@zfit.com",
                    password: "$2b$12$9.HrAG6I6Iw2YxVywhBjguqmSUk5ALt0ubWh22Rl1YDOXlGyEYLLq",
                    roleId: adminRole.id,
                    status: true,
                },
            },
        },
    });
});
exports.insertAdminSeeder = insertAdminSeeder;
