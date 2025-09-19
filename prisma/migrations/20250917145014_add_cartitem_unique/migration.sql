/*
  Warnings:

  - A unique constraint covering the columns `[cartId,menuItemId,sizeOptionId,crustOptionId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_menuItemId_sizeOptionId_crustOptionId_key" ON "public"."CartItem"("cartId", "menuItemId", "sizeOptionId", "crustOptionId");
