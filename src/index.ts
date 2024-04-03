import { app as server } from "./app";
import { prisma } from "./db";
import { insertAdminSeeder } from "./seeders/admin/admin.service";
import { insertRoleSeeders } from "./seeders/role/role.service";

// Get PORT
const currentPort = server.get("PORT");

// server up
server.listen(currentPort, async () => {
  // valida si la tabla role contiene datos
  const isNotEmpty = await prisma.role.count();
  if (!isNotEmpty) {
    await insertRoleSeeders();
  }

  // valida si no existe un admin por default
  const isNotAdminExist = await prisma.user.count();
  if (!isNotAdminExist) {
    await insertAdminSeeder();
  }
  console.log(`Server is running on PORT ${currentPort}...`);
});
