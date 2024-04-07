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
      ci: "123456",
      User: {
        create: {
          email: "admin@zfit.com",
          password:
            "$2b$12$9.HrAG6I6Iw2YxVywhBjguqmSUk5ALt0ubWh22Rl1YDOXlGyEYLLq",
          roleId: adminRole.id,
          status: true,
        },
      },
    },
  });
};
