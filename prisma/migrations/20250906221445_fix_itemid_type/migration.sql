/*
  Warnings:

  - You are about to drop the column `price` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the `MenuItemCrust` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MenuItemSize` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."MenuItemCrust" DROP CONSTRAINT "MenuItemCrust_itemId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MenuItemSize" DROP CONSTRAINT "MenuItemSize_itemId_fkey";

-- AlterTable
ALTER TABLE "public"."MenuItem" DROP COLUMN "price";

-- DropTable
DROP TABLE "public"."MenuItemCrust";

-- DropTable
DROP TABLE "public"."MenuItemSize";

-- DropEnum
DROP TYPE "public"."Size";
