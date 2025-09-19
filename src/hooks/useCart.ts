import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

// 🔄 Coerce string -> number
export const CartItem = z.object({
  id: z.string(),
  itemNameSnapshot: z.string(),
  imageUrlSnapshot: z.string().nullable(),
  quantity: z.number(),
  unitPrice: z.coerce.number(),
  lineTotal: z.coerce.number(),
  sizeOptionId:z.string().nullable(),
  crustOptionId:z.string().nullable(),
  sizeOption: z.object({
    size: z.string(),
  }).nullable(),
  crustOption: z.object({
    crust: z.string(),
  }).nullable(),
});

// 🧾 Cart schema
export const Cart = z.object({
  id: z.string(),
  sessionId: z.string().nullable(),
  items: z.array(CartItem),
  subtotal: z.coerce.number(),
  discount: z.coerce.number(),
  tax: z.coerce.number(),
  total: z.coerce.number(),
});

const CartResponse = z.object({
  cart: Cart,
});

async function fetchCart() {
  const res = await fetch("/api/cart");

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch cart");
  }

  const data = await res.json();


  const parsed = CartResponse.safeParse(data);

  if (!parsed.success) {
    throw new Error("Cart response validation failed");
  }

  return parsed.data.cart;
}


export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    
  });
}
