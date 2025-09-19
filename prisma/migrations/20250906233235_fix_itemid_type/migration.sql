/*
  Warnings:

  - You are about to drop the column `size` on the `MenuItemSize` table. All the data in the column will be lost.
  - Added the required column `multiplier` to the `MenuItemSize` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."MenuItemSize" DROP COLUMN "size",
ADD COLUMN     "multiplier" "public"."Size" NOT NULL;
