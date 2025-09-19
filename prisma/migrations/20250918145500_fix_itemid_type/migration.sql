/*
  Warnings:

  - You are about to drop the column `totalAmount` on the `Order` table. All the data in the column will be lost.
  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `addressId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentType` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemName` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_crustOptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_sizeOptionId_fkey";

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "totalAmount",
ADD COLUMN     "addressId" TEXT NOT NULL,
ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "paymentType" TEXT NOT NULL,
ADD COLUMN     "sessionId" TEXT,
ADD COLUMN     "total" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."OrderStatus" NOT NULL DEFAULT 'PREPARING';

-- AlterTable
ALTER TABLE "public"."OrderItem" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "itemName" TEXT NOT NULL,
ADD COLUMN     "menuItemCrustId" TEXT,
ADD COLUMN     "menuItemSizeId" TEXT,
ALTER COLUMN "sizeOptionId" DROP NOT NULL,
ALTER COLUMN "crustOptionId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."OrderAddress" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "floor" TEXT,
    "flat" TEXT,
    "landmark" TEXT,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderAddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "public"."OrderAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_menuItemSizeId_fkey" FOREIGN KEY ("menuItemSizeId") REFERENCES "public"."MenuItemSize"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_menuItemCrustId_fkey" FOREIGN KEY ("menuItemCrustId") REFERENCES "public"."MenuItemCrust"("id") ON DELETE SET NULL ON UPDATE CASCADE;
