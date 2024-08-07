import { app as server } from "./app";
import { prisma } from "./db";
import { insertAdminSeeder } from "./seeders/admin/admin.service";
import { insertDisciSeeders } from "./seeders/discipline/discipline.service";
import { insertClientSeeder } from "./seeders/client/client.service";
import { insertGenreSeeders } from "./seeders/genre/genre.service";
import { insertRoleSeeders } from "./seeders/role/role.service";
import { insertSubsTypeSeeders } from "./seeders/subscriptionType/subscriptionType.service";
import { subscriptionControl } from "./subscrption/subscription.service";
import { insertDateEjecutedSeeders } from "./seeders/dateEjecuted/dateEjecuted.service";
import { insertExpenseCategorySeeders } from "./seeders/expenseCategory/expenseCategory.service";

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

  // valida si la tabla discipline contiene datos
  const isNotDisciEmpty = await prisma.discipline.count();
  if (!isNotDisciEmpty) {
    await insertDisciSeeders();
  }

  const isNotSubsTypeEmpty = await prisma.subsType.count();
  if (!isNotSubsTypeEmpty) {
    await insertSubsTypeSeeders();
  }

  const isNotDateEjecuted = await prisma.dateEjecuted.count();
  if (!isNotDateEjecuted) {
    await insertDateEjecutedSeeders();
  }

  const areExpenseCategoryExist = await prisma.expenseCategory.count();
  if (!areExpenseCategoryExist) {
    await insertExpenseCategorySeeders();
  }

  console.log(`Server is running on PORT ${currentPort}...`);

  var cron = require("node-cron");

  cron.schedule(
    "30 20 * * *",
    async () => {
      await subscriptionControl({ isManual: false });
    },
    {
      scheduled: true,
    }
  );
});
