import { useOrders } from '@/hooks/useOrders';
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OrderCard } from '@/components/orders/OrderCard';
import { OrderDetailsDialog } from '@/components/orders/OrderDetailsDialog';
import ChangePasswordForm from '@/components/security/ChangePasswordForm';
import { useTranslations } from 'next-intl';

export const OrdersSection = () => {

  const { data: orders, isLoading, error } = useOrders();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)


  if (isLoading) return <p>Loading orders...</p>
  if (error) return <p className="text-red-500">Failed to load orders</p>

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={() => setSelectedOrderId(order.id)}
            />
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </CardContent>

      {selectedOrderId && (
        <OrderDetailsDialog
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </Card>
  )
}
export function SecuritySection() {
  const t = useTranslations();
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{t("account.password")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChangePasswordForm />
      </CardContent>
    </Card>
  )
}
