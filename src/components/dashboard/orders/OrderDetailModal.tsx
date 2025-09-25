"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { OrderWithDetails } from "@/hooks/useOrders"
import { OrderStatusDropdown } from "./OrderStatusDropdown"

export function OrderDetailModal({ order, open, onClose }: { order: OrderWithDetails | null; open: boolean; onClose: () => void }) {
  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Order #{order.id.slice(0, 6)}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p>{order.address.firstName} {order.address.lastName}</p>
            <p>{order.address.phone}</p>
            <p>{order.address.address}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Items</h4>
            <ul>
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.itemName} × {item.quantity}</span>
                  <span>${item.lineTotal.toString()}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold">Status</span>
            <OrderStatusDropdown orderId={order.id} currentStatus={order.status} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
