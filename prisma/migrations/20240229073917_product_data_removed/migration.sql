/*
  Warnings:

  - You are about to drop the column `uuid` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "uuid",
ADD COLUMN     "productCode" VARCHAR(255);
