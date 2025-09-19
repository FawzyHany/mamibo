// components/CategoryGrid.tsx
"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const categories = [
  { name: "Pizza", href: "/menu/pizza", icon: "🍕" },
  // { name: "Dishes", href: "/menu/dishes", icon: "🍝" },
  { name: "Appetizers", href: "/menu/appetizers", icon: "🥗" },
  { name: "Beverages", href: "/menu/beverages", icon: "🥤" },
  { name: "Desserts", href: "/menu/desserts", icon: "🍰" },
]

export function CategoryGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      {categories.map((cat) => (
        <Link key={cat.name} href={cat.href}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <span>{cat.icon}</span>
                {cat.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Explore our {cat.name.toLowerCase()} selection
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
