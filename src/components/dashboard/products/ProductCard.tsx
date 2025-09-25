"use client"

import { MenuItem } from "@/generated/prisma"
import { useToggleProductAvailability } from "@/hooks/useProducts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export function ProductCard({ product }: { product: MenuItem }) {
  const toggleAvailability = useToggleProductAvailability()

  const handleToggle = () => {
    toggleAvailability.mutate({ id: product.id, isAvailable: !product.isAvailable })
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{product.name}</span>
          <Switch checked={product.isAvailable} onCheckedChange={handleToggle} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <span className="text-sm text-gray-600">${product.price?.toString()}</span>
        <span
          className={`px-2 py-1 text-xs rounded ${
            product.isAvailable ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {product.isAvailable ? "Available" : "Out of stock"}
        </span>
      </CardContent>
    </Card>
  )
}
