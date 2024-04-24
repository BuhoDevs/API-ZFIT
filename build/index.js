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
const app_1 = require("./app");
const db_1 = require("./db");
const admin_service_1 = require("./seeders/admin/admin.service");
const discipline_service_1 = require("./seeders/discipline/discipline.service");
const client_service_1 = require("./seeders/client/client.service");
const genre_service_1 = require("./seeders/genre/genre.service");
const role_service_1 = require("./seeders/role/role.service");
const subscriptionType_service_1 = require("./seeders/subscriptionType/subscriptionType.service");
// Get PORT
const currentPort = app_1.app.get("PORT");
// server up
app_1.app.listen(currentPort, () => __awaiter(void 0, void 0, void 0, function* () {
    // valida si la tabla genre contiene datos
    const isNotGenreEmpty = yield db_1.prisma.genre.count();
    if (!isNotGenreEmpty) {
        yield (0, genre_service_1.insertGenreSeeders)();
    }
    // valida si la tabla role contiene datos
    const isNotEmpty = yield db_1.prisma.role.count();
    if (!isNotEmpty) {
        yield (0, role_service_1.insertRoleSeeders)();
    }
    // valida si no existe un admin por default
    const isNotAdminExist = yield db_1.prisma.user.count();
    if (!isNotAdminExist) {
        yield (0, admin_service_1.insertAdminSeeder)();
    }
    const isNotClientEmpty = yield db_1.prisma.client.count();
    if (!isNotClientEmpty) {
        yield (0, client_service_1.insertClientSeeder)();
    }
    // valida si la tabla discipline contiene datos
    const isNotDisciEmpty = yield db_1.prisma.discipline.count();
    if (!isNotDisciEmpty) {
        yield (0, discipline_service_1.insertDisciSeeders)();
    }
    const isNotSubsTypeEmpty = yield db_1.prisma.subsType.count();
    if (!isNotSubsTypeEmpty) {
        yield (0, subscriptionType_service_1.insertSubsTypeSeeders)();
    }
    console.log(`Server is running on PORT ${currentPort}...`);
}));
