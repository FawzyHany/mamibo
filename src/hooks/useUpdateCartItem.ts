// src/hooks/useUpdateCartItem.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateCartItemInput = {
  itemId: string;
  quantity: number;
};

async function updateCartItem({ itemId, quantity }: UpdateCartItemInput) {
  const res = await fetch(`/api/cart/item/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error("Failed to update cart item");
  return res.json();
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
