import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/ProductDetail/ProductDetail"
import { AppBreadcrumb } from "@/components/Breadcrumb/Breadcrumb";


type PizzaDetailPageProps = {
  params: {
    locale: string;
    slug: string;
  };
}

export default async function PizzaDetailPage({ params }: PizzaDetailPageProps) {
  const { slug } =  params;
  const product = await prisma.menuItem.findFirst({
    where: {
      name: { equals:slug.replace(/-/g, " "), mode: "insensitive" },
    },
  });

  const sizes = await prisma.menuItemSize.findMany({
    select: {
      id: true,
      size: true,
    },
  });
  console.log(`product: ${JSON.stringify(sizes)}`);

  const crusts = await prisma.menuItemCrust.findMany({
    select: {
      id: true,
      crust: true,
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
          { label: "Pizza",  href: "/menu/pizza"},
          {label: `${slug.charAt(0).toUpperCase()}${slug.slice(1)}`,  href: `/menu/pizza/${slug}`}
        ]}/></div>
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
