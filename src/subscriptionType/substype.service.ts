import { prisma } from "../db";

export const subscriptiontype = async (
  name: string,
  label: string,
  montQuantity: number,
  price: number
) => {
  const newSubstype = await prisma.subsType.create({
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
};

export const updateSubscriptionType = async (
  id: number,
  data: { name: string; label: string; montQuantity: number; price: number }
) => {
  const updatedSubscriptionType = await prisma.subsType.update({
    where: { id },
    data,
  });
  return updatedSubscriptionType;
};

export const deleteSubscriptionTypes = async (id: number) => {
  const deletedSubscriptionType = await prisma.subsType.delete({
    where: {
      id,
    },
  });
  return deletedSubscriptionType;
};

export const getAllSubscriptionTypes = async () => {
  const subscriptionTypes = await prisma.subsType.findMany();
  return subscriptionTypes;
};
