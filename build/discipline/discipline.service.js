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
exports.disciplineAll = exports.disciplineLow = exports.disciplineEdit = exports.disciplineRegister = void 0;
const db_1 = require("../db");
const disciplineRegister = (name, label) => __awaiter(void 0, void 0, void 0, function* () {
    const newDiscipline = yield db_1.prisma.discipline.create({
        data: {
            name,
            label,
            status: true,
        },
    });
    if (!newDiscipline)
        return {
            message: "Error en el registro de la Disciplina",
            statuscode: 409,
        };
    return { message: "Registro de Disciplina con éxito", statuscode: 200 };
});
exports.disciplineRegister = disciplineRegister;
const disciplineEdit = (disciplineId, dataEdit) => __awaiter(void 0, void 0, void 0, function* () {
    const editDiscipline = yield db_1.prisma.discipline.update({
        where: { id: disciplineId },
        data: Object.assign({}, dataEdit),
    });
    if (!editDiscipline)
        return {
            message: "Error en la modificacion de la Disciplina",
            statuscode: 409,
        };
    return { message: "Modificación de Disciplina con éxito", statuscode: 200 };
});
exports.disciplineEdit = disciplineEdit;
const disciplineLow = (disciplineId) => __awaiter(void 0, void 0, void 0, function* () {
    const lowDiscipline = yield db_1.prisma.discipline.update({
        where: { id: disciplineId },
        data: { status: false },
    });
    if (!lowDiscipline)
        return {
            message: "Error en dar de Baja a la Disciplina",
            statuscode: 409,
        };
    return { message: "Baja de la Disciplina con éxito", statuscode: 200 };
});
exports.disciplineLow = disciplineLow;
const disciplineAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield db_1.prisma.discipline.count();
    if (count >= 1)
        return (yield db_1.prisma.discipline.findMany({ where: { status: true } })).map((disci) => (Object.assign(Object.assign({}, disci), { value: disci.id })));
    return {
        message: "no hay Disciplina registradas",
        statuscode: 409,
    };
});
exports.disciplineAll = disciplineAll;
