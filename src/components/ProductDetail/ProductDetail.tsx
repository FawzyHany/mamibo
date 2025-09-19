// components/ProductDetail.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type ProductDetailProps ={
  imageUrl: string
  title: string
  description: string
  price: number
  sizes?: string[] // e.g. ["Small", "Medium", "Large"]
  crusts?: string[] // e.g. ["Regular", "Stuffed"]
}

export function ProductDetail({
  imageUrl,
  title,
  description,
  price,
  sizes = [],
  crusts = [],
}: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "")
  const [selectedCrust, setSelectedCrust] = useState(crusts[0] ?? "")
  const [quantity, setQuantity] = useState(1)
  console.log("Image URL:", imageUrl)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* LEFT SIDE - IMAGE */}
      <div className="flex justify-center items-start">
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={500}
          unoptimized
          className="rounded-xl object-cover shadow-md"
        />
      </div>

      {/* RIGHT SIDE - DETAILS */}
      <Card className="p-6 shadow-md">
        <CardContent className="space-y-6">
          {/* Title & Description */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>

          {/* Price */}
          <div className="text-xl font-semibold">Price: ${price.toFixed(2)}</div>

          {/* Size Options */}
          {sizes.length > 0 && (
            <div>
              <h2 className="font-medium mb-2">Choose Size</h2>
              <RadioGroup
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="flex gap-4"
              >
                {sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <RadioGroupItem value={size} id={size} />
                    <Label htmlFor={size}>{size}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Crust Options */}
          {crusts.length > 0 && (
            <div>
              <h2 className="font-medium mb-2">Choose Crust</h2>
              <RadioGroup
                value={selectedCrust}
                onValueChange={setSelectedCrust}
                className="flex gap-4"
              >
                {crusts.map((crust) => (
                  <div key={crust} className="flex items-center space-x-2">
                    <RadioGroupItem value={crust} id={crust} />
                    <Label htmlFor={crust}>{crust}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h2 className="font-medium mb-2">Quantity</h2>
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24"
            />
          </div>

          {/* Add to Cart */}
          <Button className="w-full">Add to Cart</Button>
        </CardContent>
      </Card>
    </div>
  )
}
