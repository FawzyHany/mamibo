"use client"
import { useState } from "react"
import { useOrdersStatus, OrderWithDetails } from "@/hooks/useOrders"
import { OrderCard } from "./OrderCard"
import { OrderDetailModal } from "./OrderDetailModal"

export function ActiveOrderList() {
  const { data: orders } = useOrdersStatus("active")
  const [selected, setSelected] = useState<OrderWithDetails | null>(null)

  if (!orders?.length) return <div>No active orders</div>

  return (
    <>
      <div className="grid gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} onClick={() => setSelected(order)} />
        ))}
      </div>

      <OrderDetailModal order={selected} open={!!selected} onClose={() => setSelected(null)} />
    </>
  )
}
