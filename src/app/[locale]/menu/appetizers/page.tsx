import { prisma } from "@/lib/prisma"
import { CustomCardProduct } from "@/components/CustomCardProduct/CustomCardProduct"
import slugify from "@/lib/slugify"
import { AppBreadcrumb } from "@/components/Breadcrumb/Breadcrumb"

  const  AppetizersPage =async() => {
  const AppetizersCategory = await prisma.category.findUnique({
    where: { name: "Appetizers" },
    include: {
      items: true, // load all MenuItems
    },
  })

  if (!AppetizersCategory) {
    return <div className="container mx-auto px-4 py-8">No Dessert category found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AppBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Menu", href: "/menu" },
          { label: "Appetizers",  },
        ]}/>
      <h1 className="text-3xl font-bold mb-6">{AppetizersCategory.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {AppetizersCategory.items.map((item) => (
          <CustomCardProduct
            key={item.id}
            id={item.id}
            title={item.name}
            description={item.description ?? ""}
            price={item.price ? Number(item.price) : 0}
            imageUrl={item.imageUrl ?? "/images/placeholder.jpg"}
            href={`/menu/desserts/${slugify(item.name)}`} // dynamic product page
          />
        ))}
      </div>
    </div>
  )

}
export default AppetizersPage