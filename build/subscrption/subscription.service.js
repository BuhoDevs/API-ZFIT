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
exports.findSuscriptionById = exports.allSubscriptionService = exports.subscriptionService = void 0;
const db_1 = require("../db");
const utils_1 = require("../utils");
function subscriptionService(_a) {
    return __awaiter(this, arguments, void 0, function* ({ dateIn, dateOut, disciplineId, clientId, subsTypeId, subscriptorId, transactionAmmount, outstanding = 0, totalAmmount, }) {
        let isoDateIn = (0, utils_1.getIsoDate)(dateIn);
        let isoDateOut = (0, utils_1.getIsoDate)(dateOut);
        const subscription = yield db_1.prisma.subscription.create({
            data: {
                dateIn: isoDateIn,
                dateOut: isoDateOut,
                status: true,
                disciplineId: disciplineId,
                clientId: clientId,
                subsTypeId: subsTypeId,
                subscriptorId: subscriptorId,
                Payment: {
                    create: {
                        transactionAmmount: transactionAmmount,
                        totalAmmount: totalAmmount,
                        outstanding: outstanding,
                        status: true,
                    },
                },
            },
            include: {
                Payment: true,
            },
        });
        if (!subscription)
            return {
                message: "Error en el registro de la Suscripción",
                statuscode: 409,
            };
        return { message: "Registro de Suscripción con éxito", statuscode: 200 };
    });
}
exports.subscriptionService = subscriptionService;
function allSubscriptionService(_a) {
    return __awaiter(this, arguments, void 0, function* ({ disciplineId, ci, firstname, lastname, subsTypeId, subscriptorId, dateIn, dateOut, status, take, skip, }) {
        let isoDateIn;
        let isoDateOut;
        if (dateIn)
            isoDateIn = (0, utils_1.getIsoDate)(dateIn);
        if (dateOut)
            isoDateOut = (0, utils_1.getIsoDate)(dateOut);
        const subscriptions = yield db_1.prisma.subscription.findMany({
            where: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ status: status === undefined ? true : status }, (disciplineId && {
                disciplineId,
            })), { Client: {
                    Person: Object.assign(Object.assign(Object.assign({}, (ci && { ci })), (firstname && {
                        firstname: { startsWith: firstname, mode: "insensitive" },
                    })), (lastname && {
                        lastname: { startsWith: lastname, mode: "insensitive" },
                    })),
                } }), (subsTypeId && { subsTypeId })), (subscriptorId && { subscriptorId })), (isoDateIn && { dateIn: { gte: isoDateIn } })), (isoDateOut && { dateOut: { gte: isoDateOut } })),
            skip,
            take,
            include: {
                Client: { select: { Person: true } },
                SubsType: true,
                User: { select: { Person: true } },
                Discipline: { select: { label: true } },
            },
        });
        const totalLength = yield db_1.prisma.subscription.count({
            where: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ status: status === undefined ? true : status }, (disciplineId && {
                disciplineId,
            })), { Client: {
                    Person: Object.assign(Object.assign(Object.assign({}, (ci && { ci })), (firstname && {
                        firstname: { startsWith: firstname, mode: "insensitive" },
                    })), (lastname && {
                        lastname: { startsWith: lastname, mode: "insensitive" },
                    })),
                } }), (subsTypeId && { subsTypeId })), (subscriptorId && { subscriptorId })), (isoDateIn && { dateIn: { gte: isoDateIn } })), (isoDateOut && { dateOut: { gte: isoDateOut } })),
        });
        return {
            totalLength,
            subscriptions,
        };
    });
}
exports.allSubscriptionService = allSubscriptionService;
const findSuscriptionById = (_a) => __awaiter(void 0, [_a], void 0, function* ({ subscripcionId, }) {
    const subscriptionFounded = yield db_1.prisma.subscription.findUnique({
        where: { id: subscripcionId },
        include: {
            Client: { select: { Person: true } },
            Discipline: true,
            Payment: true,
            SubsType: true,
        },
    });
    if (!subscriptionFounded) {
        return {
            code: 404,
            message: "La suscripcion no fue encontrada",
            error: true,
        };
    }
    return {
        code: 200,
        data: Object.assign(Object.assign({}, subscriptionFounded), { Discipline: Object.assign(Object.assign({}, subscriptionFounded.Discipline), { value: subscriptionFounded.Discipline.id }), SubsType: Object.assign(Object.assign({}, subscriptionFounded.SubsType), { value: subscriptionFounded.SubsType.id }) }),
    };
});
exports.findSuscriptionById = findSuscriptionById;
