"use client";

import { useState } from "react";
import { User, MapPin, ShoppingBag, Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileSection } from "@/components/account/ProfileSection";
import AddressesSection from "@/components/account/AddressesSection";
import { OrdersSection, SecuritySection } from "@/components/account/OrdersSection";
import { SignOutButton } from "@/components/account/SignOutButton";
import { useTranslations } from "next-intl";

export function AccountDashboardClient() {
  const t = useTranslations();

  const sections = [
    { key: "profile", label: t("account.profile"), icon: User },
    { key: "addresses", label: t("account.address"), icon: MapPin },
    { key: "orders", label: t("account.orders"), icon: ShoppingBag },
    { key: "security", label: t("account.password"), icon: Lock },
    { key: "logout", label: t("account.signout"), icon: LogOut },
  ];

  const [active, setActive] = useState("profile");

  return (
    <>
    <h1 className="m-3 sm:text-2xl">{t("navbar.myaccount")}</h1>
    <div className="flex flex-col md:flex-row min-h-screen overflow-x-hidden">
    {/* Sidebar */}
    <aside className="w-full md:w-64 bg-gray-100 p-4 border-b md:border-b-0 md:border-r">
      <nav className="flex md:block overflow-x-auto space-x-2 md:space-x-0 md:space-y-2">
        {sections.map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            variant={active === key ? "default" : "ghost"}
            className="flex-shrink-0 md:w-full justify-start cursor-pointer"
            onClick={() => setActive(key)}
          >
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </Button>
        ))}
      </nav>
    </aside>
  
    {/* Main Content */}
    <main className="flex-1 p-4">
      {active === "profile" && <ProfileSection />}
      {active === "addresses" && <AddressesSection />}
      {active === "orders" && <OrdersSection />}
      {active === "security" && <SecuritySection />}
      {active === "logout" && <SignOutButton />}
    </main>
  </div></>
  
  );
}
