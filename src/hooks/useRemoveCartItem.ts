// src/hooks/useRemoveCartItem.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function removeCartItem(itemId: string) {
  const res = await fetch(`/api/cart/item/${itemId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to remove cart item");
  return res.json();
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
