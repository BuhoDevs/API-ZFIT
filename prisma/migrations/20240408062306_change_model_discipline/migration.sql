/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Discipline` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Discipline_name_key" ON "Discipline"("name");
