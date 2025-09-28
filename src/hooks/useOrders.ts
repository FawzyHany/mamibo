import { useQuery } from "@tanstack/react-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Order, OrderAddress, OrderItem } from "@/generated/prisma"


export type OrderWithDetails = Order & {
  address: OrderAddress
  items: OrderItem[]
}

export function useOrders() {
  return useQuery<OrderWithDetails[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/orders")
      if (!res.ok) throw new Error("Failed to fetch orders")
      return res.json()
    },
  })
}

export function useOrder(id: string) {
  return useQuery<OrderWithDetails>({
    queryKey: ["orders", id],
    queryFn: async () => {
      const res = await fetch(`/api/orders/${id}`)
      if (!res.ok) throw new Error("Failed to fetch order")
      return res.json()
    },
    enabled: !!id,
  })
}


export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string
      status: Order["status"]
    }) => {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("Failed to update order status")
      return res.json()
    },
    onSuccess: () => {
      // ✅ Invalidate orders cache so UI refreshes
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
  })
}

export function useOrdersStatus(status?: "active" | "history") {
  return useQuery<OrderWithDetails[]>({
    queryKey: ["orders", status],
    queryFn: async () => {
      const query = status ? `?status=${status}` : ""
      const res = await fetch(`/api/orders${query}`)
      if (!res.ok) throw new Error("Failed to fetch orders")
      return res.json()
    },
  })
}
