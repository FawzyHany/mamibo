/*
  Warnings:

  - You are about to drop the column `itemId` on the `MenuItemCrust` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `MenuItemSize` table. All the data in the column will be lost.
  - Added the required column `price` to the `MenuItemCrust` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."MenuItemCrust" DROP CONSTRAINT "MenuItemCrust_itemId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MenuItemSize" DROP CONSTRAINT "MenuItemSize_itemId_fkey";

-- AlterTable
ALTER TABLE "public"."MenuItemCrust" DROP COLUMN "itemId",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "public"."MenuItemSize" DROP COLUMN "itemId";
