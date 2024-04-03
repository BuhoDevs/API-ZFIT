import { prisma } from "../../db";
import { findRoleByName } from "../../role/role.service";

export const insertAdminSeeder = async () => {
  const isPersonNotEmpty = await prisma.person.count();
  if (isPersonNotEmpty) {
    return undefined;
  }
  const adminRole = await findRoleByName({ name: "admin" });
  if (!adminRole) {
    return undefined;
  }

  return prisma.person.create({
    data: {
      firstname: "Manuel",
      lastname: "Caceres",
      User: {
        create: {
          email: "admin@zfit.com",
          password:
            "$2y$10$yFf7WlZxamDkZqD9n.ZaceVPAfK1aQ7rJPDf8m.HLca609ZXwvjgS",
          roleId: adminRole.id,
        },
      },
    },
  });
};
