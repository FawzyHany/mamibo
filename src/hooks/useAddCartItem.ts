// src/hooks/useAddCartItem.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export const AddCartItemSchema = z.object({
  menuItemId: z.string().min(1, "Menu item is required"),
  sizeOptionId: z.string().nullable().optional(),
  crustOptionId: z.string().nullable().optional(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export type AddCartItemInput = z.infer<typeof AddCartItemSchema>;

async function addCartItem(input: AddCartItemInput) {
  const validatedInput = AddCartItemSchema.parse(input);
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validatedInput),
  });
  if (!res.ok) throw new Error("Failed to add item to cart");
  return res.json();
}

export function useAddCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    }
  });
}
