import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/ProductDetail/ProductDetail"
import { AppBreadcrumb } from "@/components/Breadcrumb/Breadcrumb";


interface AppetizerDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function AppetizerDetailPage({ params }: AppetizerDetailPageProps) {
  const { slug } = await params;
  const product = await prisma.menuItem.findFirst({
    where: {
      name: { equals: slug.replace(/-/g, " "), mode: "insensitive" },
    },
  });

  if (!product) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="pb-5">
       <AppBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Menu", href: "/menu" },
          { label: "Appetizers",  href: "/menu/appetizers" },
          {label: `${slug.charAt(0).toUpperCase()}${slug.slice(1)}`,  href: `/menu/appetizers/${slug}`}
        ]}/></div>
      <ProductDetail
        productId={product.id}
        imageUrl={product.imageUrl ?? "/images/placeholder.jpg"}
        title={product.name}
        description={product.description ?? ""}
        price={product.price ? Number(product.price) : 0}
      />
    </div>
  );
}
