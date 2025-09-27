import { useProducts } from '@/hooks/useProducts'
import React from 'react'
import { ProductCard } from './ProductCard'

const ProductsStock = () => {
  const { data: products } = useProducts()

  if (!products?.length) return <div>No products available</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductsStock