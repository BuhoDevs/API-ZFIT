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
exports.allDiscipline = exports.lowDiscipline = exports.editDiscipline = exports.Discipline = void 0;
const db_1 = require("../db");
const discipline_service_1 = require("./discipline.service");
const Discipline = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, label } = req.body;
    try {
        const existingDiscipline = yield db_1.prisma.discipline.findFirst({
            where: { name },
        });
        if (existingDiscipline)
            return res
                .status(409)
                .json({ message: "Ya existe una Disciplina con ese Nombre" });
        const newDiscipline = yield (0, discipline_service_1.disciplineRegister)(name, label);
        return res
            .status(newDiscipline.statuscode)
            .json({ message: newDiscipline.message });
    }
    catch (error) {
        console.error("Error registr Disciplina:", error);
        return res.status(500).json({ error: "Error al registrar la Disciplina" });
    }
});
exports.Discipline = Discipline;
const editDiscipline = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { disciplineId } = req.params;
    //const {disciplineId} = Number(req.params);
    const { name, label } = req.body;
    try {
        if (!disciplineId)
            return res.status(400).json({ message: "El id es requerido " });
        const existingDiscipline = yield db_1.prisma.discipline.findUnique({
            where: { id: parseInt(disciplineId) },
        });
        if (!existingDiscipline)
            return res
                .status(409)
                .json({ message: "No existe una Disciplina con ese codigo" });
        const newDiscipline = yield (0, discipline_service_1.disciplineEdit)(parseInt(disciplineId), {
            name,
            label,
        });
        return res
            .status(newDiscipline.statuscode)
            .json({ message: newDiscipline.message });
    }
    catch (error) {
        console.error("Error registro Disciplina:", error);
        return res.status(500).json({ error: "Error al registrar la Disciplina" });
    }
});
exports.editDiscipline = editDiscipline;
const lowDiscipline = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { disciplineId } = req.params;
    try {
        if (!disciplineId)
            return res.status(400).json({ message: "El id es requerido " });
        const existingDiscipline = yield db_1.prisma.discipline.findUnique({
            where: { id: parseInt(disciplineId) },
        });
        if (!existingDiscipline)
            return res
                .status(409)
                .json({ message: "No existe una Disciplina con ese codigo" });
        const newDiscipline = yield (0, discipline_service_1.disciplineLow)(parseInt(disciplineId));
        return res
            .status(newDiscipline.statuscode)
            .json({ message: newDiscipline.message });
    }
    catch (error) {
        console.error("Error low Disciplina:", error);
        return res
            .status(500)
            .json({ message: "Error al dar de baja la Disciplina" });
    }
});
exports.lowDiscipline = lowDiscipline;
const allDiscipline = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDiscipline = yield (0, discipline_service_1.disciplineAll)();
        return res.json(allDiscipline);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Error al obtener todas las Disciplina" });
    }
});
exports.allDiscipline = allDiscipline;
