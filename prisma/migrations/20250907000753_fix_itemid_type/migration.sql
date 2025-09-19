/*
  Warnings:

  - You are about to drop the `CrustOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SizeOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_crustOptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_sizeOptionId_fkey";

-- DropTable
DROP TABLE "public"."CrustOption";

-- DropTable
DROP TABLE "public"."SizeOption";

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_sizeOptionId_fkey" FOREIGN KEY ("sizeOptionId") REFERENCES "public"."MenuItemSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_crustOptionId_fkey" FOREIGN KEY ("crustOptionId") REFERENCES "public"."MenuItemCrust"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
