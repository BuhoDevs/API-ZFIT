import { prisma } from "../db";

export const disciplineRegister = async (name: string, label: string) => {
  const newDiscipline = await prisma.discipline.create({
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
};

export const disciplineEdit = async (disciplineId: number, dataEdit: any) => {
  const editDiscipline = await prisma.discipline.update({
    where: { id: disciplineId },
    data: { ...dataEdit },
  });

  if (!editDiscipline)
    return {
      message: "Error en la modificacion de la Disciplina",
      statuscode: 409,
    };
  return { message: "Modificación de Disciplina con éxito", statuscode: 200 };
};

export const disciplineLow = async (disciplineId: number) => {
  const lowDiscipline = await prisma.discipline.update({
    where: { id: disciplineId },
    data: { status: false },
  });

  if (!lowDiscipline)
    return {
      message: "Error en dar de Baja a la Disciplina",
      statuscode: 409,
    };
  return { message: "Baja de la Disciplina con éxito", statuscode: 200 };
};

export const disciplineAll = async () => {
  const count = await prisma.discipline.count();
  if (count >= 1)
    return (await prisma.discipline.findMany({ where: { status: true } })).map(
      (disci) => ({ ...disci, value: disci.id })
    );
  return {
    message: "no hay Disciplina registradas",
    statuscode: 409,
  };
};
