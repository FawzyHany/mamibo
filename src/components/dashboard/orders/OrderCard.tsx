import { OrderWithDetails } from "@/hooks/useOrders"
import { OrderStatusBadge } from "./OrderStatusBadge"

export function OrderCard({ order, onClick }: { order: OrderWithDetails; onClick: () => void }) {
  return (
    <div className="border rounded p-4 cursor-pointer hover:bg-gray-50" onClick={onClick}>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Order #{order.id.slice(0, 6)}</h3>
        <OrderStatusBadge status={order.status} />
      </div>
      <div className="text-sm text-gray-600">{order.items.length} items — ${order.total.toString()}</div>
    </div>
  )
}
