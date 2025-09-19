// app/menu/page.tsx
import { AppBreadcrumb } from "../../../components/Breadcrumb/Breadcrumb"
import { CategoryGrid } from "../../../components/CategoryGrid/CategoryGrid"

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <AppBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Menu" },
        ]}
      />

      <h1 className="text-4xl font-bold mt-6">Menu</h1>
      <p className="text-muted-foreground mt-2">
        Discover authentic Italian dishes by category
      </p>

      <CategoryGrid />
    </div>
  )
}