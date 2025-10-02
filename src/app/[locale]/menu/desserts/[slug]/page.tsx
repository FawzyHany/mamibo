import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/ProductDetail/ProductDetail"
import { AppBreadcrumb } from "@/components/Breadcrumb/Breadcrumb";


type DessertDetailPageProps =  {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function DessertDetailPage({ params }: DessertDetailPageProps) {
  const { slug } = await params;
  const product = await prisma.menuItem.findFirst({
    where: {
      name: { equals:slug.replace(/-/g, " "), mode: "insensitive" },
    },
    include: {
      // If you later connect sizes/crusts tables, fetch them here
    },
  });


  if (!product) return notFound()

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="pb-5">
        <AppBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Menu", href: "/menu" },
          { label: "Desserts", href: "/menu/desserts"},
          {label: `${slug.charAt(0).toUpperCase()}${slug.slice(1)}`, href: `/menu/desserts/${slug}`}
        ]}/></div>

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
