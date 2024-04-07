/*
  Warnings:

  - You are about to drop the column `genreId` on the `Client` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_genreId_fkey";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "genreId";

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "genreId" INTEGER;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE SET NULL ON UPDATE CASCADE;
