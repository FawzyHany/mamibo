-- CreateEnum
CREATE TYPE "public"."Size" AS ENUM ('Small', 'Medium', 'Large');

-- CreateEnum
CREATE TYPE "public"."Crust" AS ENUM ('Regular', 'Stuffed');

-- CreateTable
CREATE TABLE "public"."MenuItemSize" (
    "id" TEXT NOT NULL,
    "size" "public"."Size" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "MenuItemSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MenuItemCrust" (
    "id" TEXT NOT NULL,
    "crust" "public"."Crust" NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "MenuItemCrust_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."MenuItemSize" ADD CONSTRAINT "MenuItemSize_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MenuItemCrust" ADD CONSTRAINT "MenuItemCrust_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "public"."MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
