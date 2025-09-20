/*
  Warnings:

  - Changed the type of `paymentType` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."PaymentType" AS ENUM ('cod', 'card');

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "paymentType",
ADD COLUMN     "paymentType" "public"."PaymentType" NOT NULL;
