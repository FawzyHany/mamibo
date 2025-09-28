// src/components/cart/CartDropdown.tsx
"use client";

import { useCart } from "@/hooks/useCart";
import { useRemoveCartItem } from "@/hooks/useRemoveCartItem";
import { useUpdateCartItem } from "@/hooks/useUpdateCartItem";
import { Info, ShoppingCart, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useIsTouchDevice } from "@/lib/touchDevice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useTranslations } from "next-intl";

export function CartDropdown() {

  const t = useTranslations();

  const { data: cart, isLoading } = useCart();
  const removeItem = useRemoveCartItem(); // no cartId needed
  const updateItem = useUpdateCartItem();
  const isTouchDevice = useIsTouchDevice();
  // Total quantity for badge
  const totalQty =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <DropdownMenu>
      {/* Cart Icon + Badge */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-2 cursor-pointer focus-visible:outline-none focus-visible:ring-0">
          <ShoppingCart className=" !w-7 !h-7"/>
          {totalQty > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalQty}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent className="w-100 p-0 max-h-[400px] flex flex-col">
  {/* Scrollable content */}
  <div className="overflow-y-auto p-4 flex-1">
    {isLoading && (
      <p className="text-sm text-muted-foreground">Loading...</p>
    )}

    {!isLoading && cart?.items.length === 0 && (
      <p className="text-sm text-muted-foreground text-center">{t("navbar.cartempty")}</p>
    )}

    {!isLoading &&
      cart?.items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 py-2 border-b last:border-b-0"
        >
          {item.imageUrlSnapshot && (
            <Image
              src={item.imageUrlSnapshot}
              alt={item.itemNameSnapshot}
              width={60}
              height={60}
              className="rounded"
            />
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
              <p className="text-md font-medium">{item.itemNameSnapshot}</p>
              {(item.crustOptionId || item.sizeOptionId) && (
  isTouchDevice ? (
    <Popover>
      <PopoverTrigger><Info className="h-4 w-4" /></PopoverTrigger>
      <PopoverContent className="text-sm">{item.sizeOption?.size} - {item.crustOption?.crust}</PopoverContent>
    </Popover>
  ) : (
    <HoverCard>
      <HoverCardTrigger><Info className="h-4 w-4" /></HoverCardTrigger>
      <HoverCardContent className="text-sm">{item.sizeOption?.size} - {item.crustOption?.crust}</HoverCardContent>
    </HoverCard>
  )
)}

</div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem.mutate(item.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-6 h-6 text-xs"
                  disabled={updateItem.isPending || item.quantity === 0}
                  onClick={() =>
                    updateItem.mutate({
                      itemId: item.id,
                      quantity: item.quantity - 1,
                    })
                  }
                >
                  -
                </Button>
                <span className="text-sm w-4 text-center">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-6 h-6 text-xs"
                  disabled={updateItem.isPending}
                  onClick={() =>
                    updateItem.mutate({
                      itemId: item.id,
                      quantity: item.quantity + 1,
                    })
                  }
                >
                  +
                </Button>
              </div>
              <p>{item.lineTotal.toFixed(2)} LE</p>
            </div>
          </div>
        </div>
      ))}
  </div>

  {/* Sticky footer */}
  {!isLoading && cart && cart.items.length > 0 && (
    <div className="border-t p-4 bg-white sticky bottom-0 z-10">
      <div className="flex justify-between py-2 font-semibold">
        <span>Subtotal:</span>
        <span>{cart.subtotal.toFixed(2)} LE</span>
      </div>
      <div className="flex justify-center gap-2 mt-2 ">
        <Button className="w-[80%]" size="sm" variant={"default"}>
          <a href="/checkout">
          Checkout</a>
        </Button>
      </div>
    </div>
  )}
</DropdownMenuContent>

    </DropdownMenu>
  );
}
