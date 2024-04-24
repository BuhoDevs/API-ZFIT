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
exports.AllSubstype = exports.deleteSubsTypeById = exports.substypeUpdate = exports.substypeRegister = void 0;
const db_1 = require("../db");
const substype_service_1 = require("./substype.service");
const substypeRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, label, montQuantity, price } = req.body;
    try {
        const existsSubstype = yield db_1.prisma.subsType.findFirst({
            where: { name },
        });
        if (existsSubstype)
            return res.status(409).json({
                message: `Ya existe un tipo de suscripcion con ese Nombre: ${name}`,
            });
        const newSubstype = yield (0, substype_service_1.subscriptiontype)(name, label, montQuantity, price);
        return res.json({ message: newSubstype.message });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Error registrar tipo de suscripcion" });
    }
});
exports.substypeRegister = substypeRegister;
const substypeUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, label, montQuantity, price } = req.body;
    try {
        const updatedSubscriptionType = yield (0, substype_service_1.updateSubscriptionType)(+id, {
            name,
            label,
            montQuantity,
            price,
        });
        return res.json({
            message: `Tipo de suscripción con ID ${id} modificado correctamente`,
            updatedSubscriptionType,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Error modificando tipo de suscripcion" });
    }
});
exports.substypeUpdate = substypeUpdate;
const deleteSubsTypeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedSubscriptionType = yield (0, substype_service_1.deleteSubscriptionTypes)(+id);
        return res.json({
            message: `Tipo de suscripción con ID ${id} eliminado correctamente`,
            deletedSubscriptionType,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Error eliminando tipo de suscripcion" });
    }
});
exports.deleteSubsTypeById = deleteSubsTypeById;
const AllSubstype = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscriptionTypes = yield (0, substype_service_1.getAllSubscriptionTypes)();
        return res.json(subscriptionTypes);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Error al obtener todas los tipos de suscripcion" });
    }
});
exports.AllSubstype = AllSubstype;
