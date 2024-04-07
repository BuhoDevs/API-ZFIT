/*
  Warnings:

  - A unique constraint covering the columns `[ci]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `status` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ci` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "email" TEXT,
ADD COLUMN     "height" DECIMAL(4,2),
ADD COLUMN     "password" TEXT,
ADD COLUMN     "status" BOOLEAN NOT NULL,
ADD COLUMN     "weight" DECIMAL(6,2);

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "ci" TEXT NOT NULL,
ADD COLUMN     "phone" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Person_ci_key" ON "Person"("ci");
