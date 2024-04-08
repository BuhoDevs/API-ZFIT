import { Request, Response } from "express";
import { prisma } from "../db";
import {
  disciplineEdit,
  disciplineLow,
  disciplineRegister,
} from "./discipline.service";

export const Discipline = async (req: Request, res: Response) => {
  const { name, label } = req.body;
  try {
    const existingDiscipline = await prisma.discipline.findFirst({
      where: { name },
    });
    if (existingDiscipline)
      return res
        .status(409)
        .json({ message: "Ya existe una Disciplina con ese Nombre" });

    const newDiscipline = await disciplineRegister(name, label);

    return res
      .status(newDiscipline.statuscode)
      .json({ message: newDiscipline.message });
  } catch (error) {
    console.error("Error registr Disciplina:", error);
    return res.status(500).json({ error: "Error al registrar la Disciplina" });
  }
};

export const editDiscipline = async (req: Request, res: Response) => {
  const { disciplineId } = req.params;
  //const {disciplineId} = Number(req.params);
  const { name, label } = req.body;
  try {
    if (!disciplineId)
      return res.status(400).json({ message: "El id es requerido " });

    const existingDiscipline = await prisma.discipline.findUnique({
      where: { id: parseInt(disciplineId) },
    });
    if (!existingDiscipline)
      return res
        .status(409)
        .json({ message: "No existe una Disciplina con ese codigo" });

    const newDiscipline = await disciplineEdit(parseInt(disciplineId), {
      name,
      label,
    });

    return res
      .status(newDiscipline.statuscode)
      .json({ message: newDiscipline.message });
  } catch (error) {
    console.error("Error registro Disciplina:", error);
    return res.status(500).json({ error: "Error al registrar la Disciplina" });
  }
};

export const lowDiscipline = async (req: Request, res: Response) => {
  const { disciplineId } = req.params;
  try {
    if (!disciplineId)
      return res.status(400).json({ message: "El id es requerido " });

    const existingDiscipline = await prisma.discipline.findUnique({
      where: { id: parseInt(disciplineId) },
    });
    if (!existingDiscipline)
      return res
        .status(409)
        .json({ message: "No existe una Disciplina con ese codigo" });

    const newDiscipline = await disciplineLow(parseInt(disciplineId));

    return res
      .status(newDiscipline.statuscode)
      .json({ message: newDiscipline.message });
  } catch (error) {
    console.error("Error low Disciplina:", error);
    return res
      .status(500)
      .json({ error: "Error al dar de baja la Disciplina" });
  }
};
