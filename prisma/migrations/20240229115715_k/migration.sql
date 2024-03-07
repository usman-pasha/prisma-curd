/*
  Warnings:

  - Made the column `customerId` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_customerId_fkey";

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "customerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
