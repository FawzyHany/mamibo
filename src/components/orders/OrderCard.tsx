"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Order } from '@prisma/client'
import { useTranslations } from "next-intl"
import { format } from "date-fns"

type Props = {
  order: Order
  onViewDetails: () => void
}

export  function OrderCard({ order, onViewDetails }: Props) {
  const t=useTranslations();
  return (
    <Card className="border shadow-sm">
      <CardContent className="flex justify-between items-center p-4">
        <div>
          <p className="font-medium">{t("account.order")} #{order.id.slice(0, 15)}</p>
          <p className="text-sm text-muted-foreground">
            {t("account.status")}: {order.status}
          </p>
          <p className="text-sm">{t("account.total")}: ${order.total.toString()}</p>
          <p>{t("account.date")}: {format(new Date(order.createdAt), 'yyyy-MM-dd HH:mm')}</p>
        </div>
        <Button onClick={onViewDetails}>{t("account.details")}</Button>
      </CardContent>
    </Card>
  )
}
