// app/menu/page.tsx
"use client"
import { useTranslations } from "next-intl";
import { AppBreadcrumb } from "@/components/Breadcrumb/Breadcrumb"
import { CategoryGrid } from "../../../components/CategoryGrid/CategoryGrid"

export default function MenuPage() {
  const t = useTranslations();
  return (
    <div className="container mx-auto px-4 py-8">
      <AppBreadcrumb
        items={[
          { label: t("navbar.home"), href: "/" },
          { label: t("navbar.menu") },
        ]}
      />

      <h1 className="text-4xl font-bold mt-6">{t("navbar.menu")}</h1>
      <p className="text-muted-foreground mt-2">
      {t("menu.description")}
      </p>

      <CategoryGrid />
    </div>
  )
}