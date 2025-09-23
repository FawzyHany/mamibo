"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useOrder } from "@/hooks/useOrders"

type Props = {
  orderId: string
  onClose: () => void
}

export  function OrderDetailsDialog({ orderId, onClose }: Props) {
  const { data: order, isLoading, error } = useOrder(orderId)

  return (
    <Dialog open={!!orderId} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Failed to load order</p>}
        {order && (
          <div className="space-y-4">
            <div>
              <p className="font-medium">Order #{order.id}</p>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total.toString()}</p>
            </div>

            <div>
              <h4 className="font-semibold">Delivery Address</h4>
              <p>{order.address.address}</p>
              <p>{order.address.building}, Floor {order.address.floor}, Flat {order.address.flat}</p>
              <p>{order.address.landmark}</p>
            </div>

            <div>
              <h4 className="font-semibold">Items</h4>
              <ul className="list-disc pl-5">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.itemName} x {item.quantity} – ${item.unitPrice.toString()}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Payment</h4>
              <p>Type: {order.paymentType}</p>
              <p>Paid: {order.paid ? "Yes" : "No"}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
