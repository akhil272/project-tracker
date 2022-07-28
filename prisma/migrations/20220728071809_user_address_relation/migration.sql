/*
  Warnings:

  - You are about to drop the column `clientId` on the `Address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_clientId_fkey";

-- DropIndex
DROP INDEX "Address_clientId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "clientId",
ALTER COLUMN "pinCode" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "addressId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Client_addressId_key" ON "Client"("addressId");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
