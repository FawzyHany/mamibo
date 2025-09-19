import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/ProductDetail/ProductDetail"


export default async function PizzaDetailPage({ params }: { params: { slug: string } }) {
  // find pizza by slug (name)
  const product = await prisma.menuItem.findFirst({
    where: {
      name: { equals: params.slug.replace(/-/g, " "), mode: "insensitive" },
    },
    include: {
      // If you later connect sizes/crusts tables, fetch them here
    },
  });


  if (!product) return notFound()

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail
      productId={product.id}
        imageUrl={product.imageUrl ?? "/images/placeholder.jpg"}
        title={product.name}
        description={product.description ?? ""}
        price={product.price ? Number(product.price) : 0}
      />
    </div>
  )
}
