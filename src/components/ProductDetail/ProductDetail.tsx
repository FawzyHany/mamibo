// components/ProductDetail.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAddCartItem } from "@/hooks/useAddCartItem";


type ProductDetailProps = {
  productId: string;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  sizeOptions?: { id: string; size: string }[];    // optional
  crustOptions?: { id: string; crust: string }[];  // Includes ID
};
export function ProductDetail({
  productId,
  imageUrl,
  title,
  description,
  price,
  sizeOptions = [],
  crustOptions = [],
}: ProductDetailProps) {
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);
  const [selectedCrustId, setSelectedCrustId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = useAddCartItem();

  const handleAddToCart = () => {
    addToCart.mutate({
      menuItemId: productId,
      sizeOptionId: selectedSizeId ?? null,
      crustOptionId: selectedCrustId ?? null,
      quantity,
    });
  };

  const handleAddToCartPizza = () => {
    if (!selectedSizeId || !selectedCrustId) {
      alert("Please select size and crust.");
      return;
    }

    addToCart.mutate({
      menuItemId: productId,
      sizeOptionId: selectedSizeId,
      crustOptionId: selectedCrustId,
      quantity,
    });
  };

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

          {/* Size selector (optional) */}
        {sizeOptions.length > 0 && (
          <div>
            <label className="block mb-1">Select Size</label>
            <select
              value={selectedSizeId ?? ""}
              onChange={(e) =>
                setSelectedSizeId(e.target.value || null)
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select size</option>
              {sizeOptions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.size}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Crust selector (optional) */}
        {crustOptions.length > 0 && (
          <div>
            <label className="block mb-1">Select Crust</label>
            <select
              value={selectedCrustId ?? ""}
              onChange={(e) =>
                setSelectedCrustId(e.target.value || null)
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select crust</option>
              {crustOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.crust}
                </option>
              ))}
            </select>
          </div>
        )}


      <div className="flex items-center gap-2 border border-gray-300 rounded-md w-fit">
  <button
    type="button"
    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
    className="px-3 py-1 text-lg font-bold hover:bg-gray-100"
  >
    −
  </button>
  <span className="w-8 text-center">{quantity}</span>
  <button
    type="button"
    onClick={() => setQuantity((q) => q + 1)}
    className="px-3 py-1 text-lg font-bold hover:bg-gray-100"
  >
    +
  </button>
</div>

{(sizeOptions.length > 0 || crustOptions.length > 0)?<Button
        onClick={handleAddToCartPizza}
        disabled={addToCart.isPending}
        className="w-full"
      >
        {addToCart.isPending ? "Adding..." : "Add to Cart"}
      </Button>:<Button
        onClick={handleAddToCart}
        disabled={addToCart.isPending}
        className="w-full"
      >
        {addToCart.isPending ? "Adding..." : "Add to Cart"}
      </Button>}
      
      </CardContent>
      </Card>
    </div>
  )
}


