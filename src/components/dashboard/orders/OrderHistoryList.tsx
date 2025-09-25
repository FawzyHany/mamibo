"use client"

import { useOrdersStatus } from "@/hooks/useOrders"
import { OrderCard } from "./OrderCard"

export function OrderHistoryList() {
  const { data: orders } = useOrdersStatus("history")

  if (!orders?.length) return <div>No past orders</div>

  return (
    <div className="grid gap-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} onClick={() => {}} />
      ))}
    </div> // ✅ This closing </div> was missing
  )
}




   