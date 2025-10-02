"use client"
import { useUpdateOrderStatus } from "@/hooks/useOrders"
import { Order } from '@prisma/client'

export function OrderStatusDropdown({ orderId, currentStatus }: { orderId: string; currentStatus: Order["status"] }) {
  const updateOrder = useUpdateOrderStatus()
  const statuses: Order["status"][] = ["PREPARING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"]

  return (
    <select
      className="border rounded px-2 py-1"
      value={currentStatus}
      onChange={(e) => updateOrder.mutate({ id: orderId, status: e.target.value as Order["status"] })}
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s.replace(/_/g, " ")}
        </option>
      ))}
    </select>
  )
}
