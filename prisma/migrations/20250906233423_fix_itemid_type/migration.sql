/*
  Warnings:

  - You are about to drop the column `price` on the `MenuItemSize` table. All the data in the column will be lost.
  - Added the required column `size` to the `MenuItemSize` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `multiplier` on the `MenuItemSize` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."MenuItemSize" DROP COLUMN "price",
ADD COLUMN     "size" "public"."Size" NOT NULL,
DROP COLUMN "multiplier",
ADD COLUMN     "multiplier" DOUBLE PRECISION NOT NULL;
