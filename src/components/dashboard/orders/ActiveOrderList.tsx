"use client"
import { useState } from "react"
import { useOrdersStatus, OrderWithDetails } from "@/hooks/useOrders"
import { OrderCard } from "./OrderCard"
import { OrderDetailModal } from "./OrderDetailModal"

export function ActiveOrderList() {
  const { data: orders, isLoading, isError } = useOrdersStatus("active")
  const [selected, setSelected] = useState<OrderWithDetails | null>(null)

  // Show loading state
  if (isLoading) return <div>Loading orders...</div>

  // Show error state
  if (isError) return <div>Failed to load orders</div>

  // Show empty state only after data is loaded
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