"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Order } from "@/generated/prisma"

type Props = {
  order: Order
  onViewDetails: () => void
}

export  function OrderCard({ order, onViewDetails }: Props) {
  return (
    <Card className="border shadow-sm">
      <CardContent className="flex justify-between items-center p-4">
        <div>
          <p className="font-medium">Order #{order.id.slice(0, 8)}</p>
          <p className="text-sm text-muted-foreground">
            Status: {order.status}
          </p>
          <p className="text-sm">Total: ${order.total.toString()}</p>
        </div>
        <Button onClick={onViewDetails}>View Details</Button>
      </CardContent>
    </Card>
  )
}
