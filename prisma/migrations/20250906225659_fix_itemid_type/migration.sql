-- CreateTable
CREATE TABLE "public"."SizeOption" (
    "id" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SizeOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CrustOption" (
    "id" TEXT NOT NULL,
    "crust" TEXT NOT NULL,
    "extraCost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CrustOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderItem" (
    "id" TEXT NOT NULL,
    "menuItemId" TEXT NOT NULL,
    "sizeOptionId" TEXT NOT NULL,
    "crustOptionId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "public"."MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_sizeOptionId_fkey" FOREIGN KEY ("sizeOptionId") REFERENCES "public"."SizeOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_crustOptionId_fkey" FOREIGN KEY ("crustOptionId") REFERENCES "public"."CrustOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
