import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { MenuItem } from '@prisma/client'

export function useProducts() {
  return useQuery<MenuItem[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products")
      if (!res.ok) throw new Error("Failed to fetch products")
      return res.json()
    },
  })
}

export function useToggleProductAvailability() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, isAvailable }: { id: string; isAvailable: boolean }) => {
      const res = await fetch(`/api/products/${id}/availability`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable }),
      })
      if (!res.ok) throw new Error("Failed to update product availability")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}
