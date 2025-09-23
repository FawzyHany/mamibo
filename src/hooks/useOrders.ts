import { useQuery } from "@tanstack/react-query"
import { Order, OrderItem, UserAddress } from "@/generated/prisma"


export type OrderWithDetails = Order & {
  address: UserAddress
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
