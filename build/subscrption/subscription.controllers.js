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
exports.allSuscription = exports.suscription = void 0;
const subscription_service_1 = require("../subscrption/subscription.service");
const pagination_1 = require("../utilities/pagination");
function suscription(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { dateIn, dateOut, disciplineId, clientId, subsTypeId, subscriptorId, transactionAmmount, outstanding, totalAmmount, } = req.body;
        try {
            const suscription = yield (0, subscription_service_1.suscriptionService)({
                dateIn,
                dateOut,
                disciplineId,
                clientId,
                subsTypeId,
                subscriptorId,
                transactionAmmount,
                outstanding,
                totalAmmount,
            });
            return res
                .status(suscription.statuscode)
                .json({ message: suscription.message });
        }
        catch (error) {
            console.log("error de registro es ", error);
            return res.status(500).json({ message: "Error de registro interno" });
        }
    });
}
exports.suscription = suscription;
function allSuscription(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { disciplineId, ci, firstname, lastname, subsTypeId, subscriptorId, dateIn, dateOut, status, take, skip, } = req.body;
        try {
            const offSetBySkip = (0, pagination_1.getOffSet)({ skip, take });
            const allSuscription = yield (0, subscription_service_1.allSuscriptionService)({
                disciplineId,
                ci,
                firstname,
                lastname,
                subsTypeId,
                subscriptorId,
                dateIn,
                dateOut,
                status,
                take,
                skip: offSetBySkip,
            });
            return res.json(allSuscription);
        }
        catch (error) {
            console.log("error al obtener la lista ", error);
            return res.status(500).json({ message: "Error al obtener la lista" });
        }
    });
}
exports.allSuscription = allSuscription;
