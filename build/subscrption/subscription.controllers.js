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
exports.getSubscriptionById = exports.allSubscription = exports.subscription = void 0;
const subscription_service_1 = require("../subscrption/subscription.service");
const pagination_1 = require("../utilities/pagination");
function subscription(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { dateIn, dateOut, disciplineId, clientId, subsTypeId, subscriptorId, transactionAmmount, outstanding, totalAmmount, } = req.body;
        try {
            const subscription = yield (0, subscription_service_1.subscriptionService)({
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
                .status(subscription.statuscode)
                .json({ message: subscription.message });
        }
        catch (error) {
            console.log("error de registro es ", error);
            return res.status(500).json({ message: "Error de registro interno" });
        }
    });
}
exports.subscription = subscription;
function allSubscription(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { disciplineId, ci, firstname, lastname, subsTypeId, subscriptorId, dateIn, dateOut, status, take, skip, } = req.body;
        try {
            const offSetBySkip = (0, pagination_1.getOffSet)({ skip, take });
            const allSubscription = yield (0, subscription_service_1.allSubscriptionService)({
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
            return res.json(allSubscription);
        }
        catch (error) {
            console.log("error al obtener la lista ", error);
            return res.status(500).json({ message: "Error al obtener la lista" });
        }
    });
}
exports.allSubscription = allSubscription;
const getSubscriptionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res
                .status(400)
                .json({ message: "El id de suscripcion es requerido" });
        }
        const subscription = yield (0, subscription_service_1.findSuscriptionById)({ subscripcionId: +id });
        if (subscription.error) {
            return res
                .status(subscription.code)
                .json({ message: subscription.message });
        }
        return res.status(subscription.code).json(subscription.data);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "No se pudo obtener la Suscipción", error });
    }
});
exports.getSubscriptionById = getSubscriptionById;
