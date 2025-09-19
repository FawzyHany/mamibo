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

  const sizes = await prisma.menuItemSize.findMany({
    select: {
      size: true,
    },
    distinct: ["size"],
  });

  const sizeArray = sizes.map((s) => s.size);


  const crusts = await prisma.menuItemCrust.findMany({
    select: {
      crust: true,
    },
    distinct: ["crust"],
  });

  const crustArray = crusts.map((c) => c.crust);


  if (!product) return notFound()

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail
        imageUrl={product.imageUrl ?? "/images/placeholder.jpg"}
        title={product.name}
        description={product.description ?? ""}
        price={product.price ? Number(product.price) : 0}
        sizes={sizeArray} // placeholder, later from DB
        crusts={crustArray} // placeholder, later from DB
      />
    </div>
  )
}
