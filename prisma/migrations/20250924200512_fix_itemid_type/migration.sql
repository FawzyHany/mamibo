-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'STAFF', 'ADMIN');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'USER';
