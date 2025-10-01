// src/hooks/useAddCartItem.ts
import { AddCartItemInput, AddToCartRequest } from "@/lib/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";


async function addCartItem(input: AddCartItemInput) {
  const result = AddToCartRequest.safeParse(input);

  if (!result.success) {
    console.error("Validation failed:", result.error.format());
    throw new Error("Invalid input data");
  }

  const validatedInput = result.data;
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
