import { app as server } from "./app";
import { prisma } from "./db";
import { insertAdminSeeder } from "./seeders/admin/admin.service";
import { insertDisciSeeders } from "./seeders/discipline/genre.service";
import { insertGenreSeeders } from "./seeders/genre/genre.service";
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

  // valida si la tabla role contiene datos
  const isNotGenreEmpty = await prisma.genre.count();
  if (!isNotGenreEmpty) {
    await insertGenreSeeders();
  }

  // valida si la tabla discipline contiene datos
  const isNotDisciEmpty = await prisma.discipline.count();
  if (!isNotDisciEmpty) {
    await insertDisciSeeders();
  }

  console.log(`Server is running on PORT ${currentPort}...`);
});
