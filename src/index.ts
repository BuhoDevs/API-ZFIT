import { app as server } from "./app";
import { prisma } from "./db";
import { insertAdminSeeder } from "./seeders/admin/admin.service";
import { insertClientSeeder } from "./seeders/client/client.service";
import { insertGenreSeeders } from "./seeders/genre/genre.service";
import { insertRoleSeeders } from "./seeders/role/role.service";

// Get PORT
const currentPort = server.get("PORT");

// server up
server.listen(currentPort, async () => {
  // valida si la tabla genre contiene datos
  const isNotGenreEmpty = await prisma.genre.count();
  if (!isNotGenreEmpty) {
    await insertGenreSeeders();
  }

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

  const isNotClientEmpty = await prisma.client.count();
  if (!isNotClientEmpty) {
    await insertClientSeeder();
  }
  console.log(`Server is running on PORT ${currentPort}...`);
});
