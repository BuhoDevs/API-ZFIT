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
exports.deleteClientById = exports.allClient = exports.clientById = exports.updatedClient = exports.clientRegister = void 0;
const client_service_1 = require("./client.service");
const db_1 = require("../db");
const bcrypt_1 = require("../auth/helper/bcrypt");
const pagination_1 = require("../utilities/pagination");
const apiUrl = process.env.API_BASE_URL;
const clientRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, birthdate, ci, phone, genreId, weight, height, email, password, } = req.body;
    try {
        const existingClient = yield db_1.prisma.person.findUnique({ where: { ci } });
        if (existingClient)
            return res
                .status(409)
                .json({ message: "Ya existe un Cliente con ese numero de documento" });
        const photo = req.file ? `${apiUrl}/${req.file.filename}` : "";
        let passEncriptado = "";
        if (password)
            passEncriptado = yield (0, bcrypt_1.passwordHashado)(password);
        const newclient = yield (0, client_service_1.insertClient)(firstname, lastname, birthdate, ci, Number(phone), photo, Number(genreId), weight, height, email, passEncriptado);
        return res
            .status(newclient.statuscode)
            .json({ message: newclient.message });
    }
    catch (error) {
        console.log("el error es ", error);
        return res.status(500).json({ error: "Error al registrar Cliente" });
    }
});
exports.clientRegister = clientRegister;
const updatedClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { firstname, lastname, birthdate, ci, phone, photo, genreId } = req.body;
    try {
        const existingClient = yield db_1.prisma.person.findUnique({
            where: { id },
        });
        if (!existingClient) {
            return res.status(404).json({ message: "El cliente no existe" });
        }
        const updatedClient = yield (0, client_service_1.updateClientService)(id, {
            firstname,
            lastname,
            birthdate: birthdate ? new Date(birthdate) : undefined,
            ci,
            phone,
            photo,
            genreId,
        });
        return res.json({
            message: "Cliente actualizado correctamente",
            updatedClient,
        });
    }
    catch (error) {
        return res.status(500).json({ error: "Error al actualizar el cliente" });
    }
});
exports.updatedClient = updatedClient;
const clientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const client = yield (0, client_service_1.getClientByIdService)(+id);
        return res.json(client);
    }
    catch (error) {
        return res.status(500).json({ error: "Error cliente no encontrado" });
    }
});
exports.clientById = clientById;
const allClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ci, firstname, lastname, skip, take } = req.body;
    try {
        const offSetBySkip = (0, pagination_1.getOffSet)({ skip, take });
        const client = yield (0, client_service_1.allClientService)({
            ci,
            firstname,
            lastname,
            take,
            skip: offSetBySkip,
        });
        return res.json(client);
    }
    catch (error) {
        return res.status(500).json({ error: "Error clientes no encontrados" });
    }
});
exports.allClient = allClient;
const deleteClientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedClient = yield (0, client_service_1.deleteClientByIdService)(+id);
        return res.json({
            message: "Cliente eliminado correctamente",
            client: deletedClient,
        });
    }
    catch (error) {
        return res.status(500).json({ error: "Error al eliminar el cliente" });
    }
});
exports.deleteClientById = deleteClientById;
