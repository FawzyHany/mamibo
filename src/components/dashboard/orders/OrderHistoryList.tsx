"use client"

import { useOrdersStatus } from "@/hooks/useOrders"
import { OrderCard } from "./OrderCard"

export function OrderHistoryList() {
  const { data: orders, isLoading, isError } = useOrdersStatus("history")

  // Show loading state
  if (isLoading) return <div>Loading order history...</div>

  // Show error state
  if (isError) return <div>Failed to load order history</div>

  // Show empty state only after data is loaded
  if (!orders?.length) return <div>No past orders</div>

  return (
    <div className="grid gap-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} onClick={() => {}} />
      ))}
    </div> 
  )
}