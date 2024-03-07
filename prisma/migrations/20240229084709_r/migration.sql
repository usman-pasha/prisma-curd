-- DropForeignKey
ALTER TABLE "orderItem" DROP CONSTRAINT "orderItem_orderId_fkey";

-- AlterTable
ALTER TABLE "orderItem" ALTER COLUMN "orderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
