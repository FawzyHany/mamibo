"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Menu, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "../../lib/utils";
import { signOut } from "next-auth/react";

export const MobileMenuDrawer = () => {

  const categories = [
    { key: "navbar.pizza", href: "/menu/pizza" },
    { key: "navbar.appetizers", href: "/menu/appetizers" },
    { key: "navbar.beverages", href: "/menu/beverages" },
    { key: "navbar.desserts", href: "/menu/desserts" },
  ];
  

  const t = useTranslations();
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isAccmenuOpen, setIsAccmenuOpen] = useState(false);

  const toggleSubmenu = () => setIsSubmenuOpen((prev) => !prev);
  const toggleAccmenu = () => setIsAccmenuOpen((prev) => !prev);

  return (
    <div className={cn("relative")}>
    <Drawer direction="left">
      <DrawerTrigger>
        <Menu className="w-7 h-7 hover:cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader>
          <h2 className="text-xl font-semibold mb-2">{t("navbar.menu")}</h2>
        </DrawerHeader>

        <nav className="flex flex-col gap-4 px-4 mt-2 text-lg font-medium">
          <Link href="/" className="hover:underline">
            {t("navbar.home")}
          </Link>

          {/* Menu Collapsible Menu Section */}
          <button
            onClick={toggleSubmenu}
            className="flex items-center justify-between w-full hover:underline focus:outline-none hover:cursor-pointer"
          >
            <span>{t("navbar.menu")}</span>
            {isSubmenuOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {isSubmenuOpen && (
            <div className="ml-4 flex flex-col gap-2 text-base text-gray-700">
              
              
              {categories.map((item) => {
            return (
           <Link href={item.href} className="hover:underline" key={item.key}>
            {t(item.key)}
            </Link>
             );
              })}

            </div>
          )}

          <Link href="/service" className="hover:underline">
            {t("navbar.service")}
          </Link>
          <Link href="/about-us" className="hover:underline">
            {t("navbar.aboutUs")}
          </Link>

             {/* Account Collapsible Menu Section */}
          <button
            onClick={toggleAccmenu}
            className="flex items-center justify-between w-full hover:underline focus:outline-none hover:cursor-pointer"
          >
            <span>{t("navbar.account")}</span>
            {isAccmenuOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {isAccmenuOpen && (
            <div className="ml-4 flex flex-col gap-2 text-base text-gray-700">
              <Link href="/account">{t("navbar.account")}</Link>
              <Button className="cursor-pointer" variant="destructive" onClick={() =>signOut({ callbackUrl: "/" }) 
}>{t("navbar.signout")}</Button>
              {/* Add more submenu items as needed */}
            </div>
          )}


        </nav>


        <DrawerClose className="mt-6 px-4">
          <Button variant="outline" className={cn('absolute top-0 right-1 hover:cursor-pointer')}>
            {'X'}
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
    </div>
  );
};
