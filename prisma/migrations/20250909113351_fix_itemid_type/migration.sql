-- DropForeignKey
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_crustOptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_sizeOptionId_fkey";

-- AlterTable
ALTER TABLE "public"."CartItem" ALTER COLUMN "sizeOptionId" DROP NOT NULL,
ALTER COLUMN "crustOptionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_sizeOptionId_fkey" FOREIGN KEY ("sizeOptionId") REFERENCES "public"."MenuItemSize"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_crustOptionId_fkey" FOREIGN KEY ("crustOptionId") REFERENCES "public"."MenuItemCrust"("id") ON DELETE SET NULL ON UPDATE CASCADE;
