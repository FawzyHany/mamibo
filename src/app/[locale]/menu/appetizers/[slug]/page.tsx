import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/ProductDetail/ProductDetail"

interface AppetizerDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function AppetizerDetailPage({ params }: AppetizerDetailPageProps) {
  const product = await prisma.menuItem.findFirst({
    where: {
      name: { equals: (await params).slug.replace(/-/g, " "), mode: "insensitive" },
    },
  });

  if (!product) return notFound();

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
  );
}
