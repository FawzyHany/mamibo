import { prisma } from "@/lib/prisma"
import { CustomCardProduct } from "@/components/CustomCardProduct/CustomCardProduct"
import slugify from "@/lib/slugify"
import { AppBreadcrumb } from "@/components/Breadcrumb/Breadcrumb"

export default async function PizzaPage() {
  // 1. Query category "Pizza" and its items
  const pizzaCategory = await prisma.category.findUnique({
    where: { name: "Pizza" },
    include: {
      items: {
        where: {
          isAvailable: true,
        },
      },
    },
  })

  if (!pizzaCategory) {
    return <div className="container mx-auto px-4 py-8">No Pizza category found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
       <AppBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Menu", href: "/menu" },
          { label: "Pizza",  },
        ]}/>
      <h1 className="text-3xl font-bold mb-6">{pizzaCategory.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pizzaCategory.items.map((item) => (
          <CustomCardProduct
            key={item.id}
            id={item.id}
            title={item.name}
            description={item.description ?? ""}
            price={item.price ? Number(item.price) : 0}
            imageUrl={item.imageUrl ?? "/images/placeholder.jpg"}
            href={`/menu/pizza/${slugify(item.name)}`} // dynamic product page
          />
        ))}
      </div>
    </div>
  )
}
