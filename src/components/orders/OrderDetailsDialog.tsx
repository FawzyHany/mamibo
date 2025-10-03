"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useOrder } from "@/hooks/useOrders"
import { useTranslations } from "next-intl"
import { format } from 'date-fns';

type Props = {
  orderId: string
  onClose: () => void
}

export  function OrderDetailsDialog({ orderId, onClose }: Props) {
  const { data: order, isLoading, error } = useOrder(orderId)
const t =useTranslations();
  return (
    <Dialog open={!!orderId} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("account.orderdetails")}</DialogTitle>
        </DialogHeader>

        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Failed to load order</p>}
        {order && (
          <div className="space-y-4">
            <div>
              <p className="font-medium">{t("account.order")} #{order.id}</p>
              <p>{t("account.status")}: {order.status}</p>
              <p>{t("account.total")}: ${order.total.toString()}</p>
              <p>{t("account.date")}: {format(new Date(order.createdAt), 'yyyy-MM-dd HH:mm')}</p>
            </div>

            <div>
              <h4 className="font-semibold">{t("account.location")}</h4>
              <p>{order.address.address}</p>
              <p>{order.address.building}, {t("account.floor")} {order.address.floor}, {t("account.flat")} {order.address.flat}</p>
              <p>{order.address.landmark}</p>
            </div>

            <div>
              <h4 className="font-semibold">{t("account.orders")}</h4>
              <ul className="list-disc pl-5">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.itemName} x {item.quantity} – ${item.unitPrice.toString()}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">{t("account.type")}</h4>
             
              <p>{t("account.paid")}: {order.paymentType==="card" ? t("account.visa") : t("account.ondelivey")}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
