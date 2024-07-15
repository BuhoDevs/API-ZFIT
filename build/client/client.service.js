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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClientByIdService = exports.allClientService = exports.getClientByIdService = exports.updateClientService = exports.insertClient = void 0;
const db_1 = require("../db");
const utils_1 = require("../utils");
// import { IGenre } from "../seeders/genre/types";
const insertClient = (firstname, lastname, birthdate, ci, phone, photo, genreId, weight, height, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let isoBirthdate;
    if (birthdate) {
        isoBirthdate = (0, utils_1.getIsoDate)(birthdate);
    }
    const newClient = yield db_1.prisma.person.create({
        data: Object.assign(Object.assign({ firstname,
            lastname }, (isoBirthdate && { birthdate: isoBirthdate })), { ci,
            phone,
            photo,
            genreId, Client: {
                create: {
                    weight,
                    height,
                    status: true,
                    email,
                    password,
                },
            } }),
        include: {
            Client: true,
        },
    });
    if (!newClient)
        return {
            message: "Error en el registro de Cliente",
            statuscode: 409,
        };
    return {
        message: "Registro de Cliente con éxito",
        statuscode: 200,
        newClient,
    };
});
exports.insertClient = insertClient;
const updateClientService = (id, clientData) => __awaiter(void 0, void 0, void 0, function* () {
    const { genreId, firstname, lastname, birthdate, ci, phone, photo, personId, weight, height, email, password, } = clientData;
    let isoBirthdate;
    if (birthdate) {
        isoBirthdate = (0, utils_1.getIsoDate)(birthdate);
    }
    const updatedClient = yield db_1.prisma.client.update({
        where: { id },
        data: {
            personId,
            weight,
            height,
            email,
            password,
            Person: {
                update: Object.assign(Object.assign({ genreId,
                    firstname,
                    lastname }, (isoBirthdate && { birthdate: isoBirthdate })), { ci,
                    phone,
                    photo }),
            },
        },
        include: {
            Person: true,
        },
    });
    return updatedClient;
});
exports.updateClientService = updateClientService;
const getClientByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const client = yield db_1.prisma.client.findUnique({
        where: { id },
        include: {
            Person: {
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    birthdate: true,
                    ci: true,
                    phone: true,
                    photo: true,
                    genreId: true,
                    Genre: true,
                },
            },
        },
    });
    if (!client)
        throw new Error("Error cliente no encontrado");
    const _b = client.Person || {}, { Genre } = _b, personWithoutGenre = __rest(_b, ["Genre"]);
    const genre = (_a = client.Person) === null || _a === void 0 ? void 0 : _a.Genre;
    let genreValue;
    if (genre) {
        genreValue = Object.assign(Object.assign({}, genre), { value: genre.id });
    }
    return Object.assign(Object.assign({}, client), { Person: {
            Person: personWithoutGenre,
            Genre: genreValue,
        } });
});
exports.getClientByIdService = getClientByIdService;
const allClientService = (_c) => __awaiter(void 0, [_c], void 0, function* ({ ci, firstname, lastname, skip, take, banClieSubs, }) {
    const client = yield db_1.prisma.client.findMany({
        where: {
            status: true,
            Person: Object.assign(Object.assign(Object.assign({}, (ci && {
                ci: {
                    startsWith: ci,
                    mode: "insensitive",
                },
            })), (firstname && {
                firstname: { startsWith: firstname, mode: "insensitive" },
            })), (lastname && {
                lastname: { startsWith: lastname, mode: "insensitive" },
            })),
        },
        skip,
        take,
        include: Object.assign({ Person: true }, (banClieSubs
            ? {
                Subscription: {
                    where: { status: true },
                    select: { Discipline: true },
                },
            }
            : {})),
    });
    const totalLength = yield db_1.prisma.client.count({
        where: {
            status: true,
            Person: Object.assign(Object.assign(Object.assign({}, (ci && { ci })), (firstname && {
                firstname: { startsWith: firstname, mode: "insensitive" },
            })), (lastname && {
                lastname: { startsWith: lastname, mode: "insensitive" },
            })),
        },
    });
    return {
        totalLength,
        clients: client.map((elem) => {
            const { Person, password, Subscription } = elem, resValues = __rest(elem, ["Person", "password", "Subscription"]);
            const _a = Person, { id, genreId } = _a, resPersonValues = __rest(_a, ["id", "genreId"]);
            return Object.assign(Object.assign(Object.assign({}, resValues), resPersonValues), (banClieSubs && {
                Subscription: Subscription === null || Subscription === void 0 ? void 0 : Subscription.map((ele) => ele.Discipline.label),
            }));
        }),
    };
});
exports.allClientService = allClientService;
const deleteClientByIdService = (clientId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedClient = yield db_1.prisma.client.update({
        where: { id: clientId },
        data: { status: false },
    });
    return deletedClient;
});
exports.deleteClientByIdService = deleteClientByIdService;
