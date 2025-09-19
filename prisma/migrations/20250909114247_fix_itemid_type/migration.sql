/*
  Warnings:

  - Added the required column `itemNameSnapshot` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."CartItem" ADD COLUMN     "imageUrlSnapshot" TEXT,
ADD COLUMN     "itemNameSnapshot" TEXT NOT NULL;
