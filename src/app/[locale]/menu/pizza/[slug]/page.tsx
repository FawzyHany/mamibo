import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/ProductDetail/ProductDetail"

type PizzaDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function PizzaDetailPage({ params }: PizzaDetailPageProps) {
  // find pizza by slug (name)
  const product = await prisma.menuItem.findFirst({
    where: {
      name: { equals: (await params).slug.replace(/-/g, " "), mode: "insensitive" },
    },
    include: {
      // If you later connect sizes/crusts tables, fetch them here
    },
  });

  const sizes = await prisma.menuItemSize.findMany({
    select: {
      id: true,
      size: true,
    },
  });
  
  const crusts = await prisma.menuItemCrust.findMany({
    select: {
      id: true,
      crust: true,
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
        sizeOptions={sizes} // placeholder, later from DB
        crustOptions={crusts} // placeholder, later from DB
      />
    </div>
  )
}
