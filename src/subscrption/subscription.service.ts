import { prisma } from "../db";

export async function suscripcionService(data: {
  dateIn: string;
  dateOut: Date;
  status: boolean;
  label: string;
  disciplineId: number;
  clientId: number;
  subsTypeId: number;
}) {
  const suscripcion = await prisma.subscription.create({
    data: {
      dateIn: new Date(),
      dateOut: new Date(),
      status: data.status,
      label: data.label,
      disciplineId: data.disciplineId,
      clientId: data.clientId,
      subsTypeId: data.subsTypeId,
    },
  });
  return suscripcion;
}
