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
exports.getAllSubscriptionTypes = exports.deleteSubscriptionTypes = exports.updateSubscriptionType = exports.subscriptiontype = void 0;
const db_1 = require("../db");
const subscriptiontype = (name, label, montQuantity, price) => __awaiter(void 0, void 0, void 0, function* () {
    const newSubstype = yield db_1.prisma.subsType.create({
        data: {
            name,
            label,
            montQuantity,
            price,
            status: true,
        },
    });
    if (!newSubstype)
        return {
            message: "Error registrar tipo de suscripcion",
            statuscode: 409,
        };
    return {
        message: "Registro tipo de suscripcion con éxito",
        statuscode: 200,
    };
});
exports.subscriptiontype = subscriptiontype;
const updateSubscriptionType = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedSubscriptionType = yield db_1.prisma.subsType.update({
        where: { id },
        data,
    });
    return updatedSubscriptionType;
});
exports.updateSubscriptionType = updateSubscriptionType;
const deleteSubscriptionTypes = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedSubscriptionType = yield db_1.prisma.subsType.delete({
        where: {
            id,
        },
    });
    return deletedSubscriptionType;
});
exports.deleteSubscriptionTypes = deleteSubscriptionTypes;
const getAllSubscriptionTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    return (yield db_1.prisma.subsType.findMany()).map((elem) => (Object.assign(Object.assign({}, elem), { value: elem.id })));
});
exports.getAllSubscriptionTypes = getAllSubscriptionTypes;
