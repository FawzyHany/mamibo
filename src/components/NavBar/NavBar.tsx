"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "../../lib/utils";
import LanguageToggle from "@/components/LanguageToggle/LanguageToggle";
import { useTranslations } from "next-intl";
import { CartDropdown } from "@/components/NavBar/CartDropdown"; // cart drawer
import { DropDownNavBar } from "@/components/NavBar/DropDown"; // user profile dropdown
import { LogoNavBar } from "@/components/NavBar/logo"; // logo
import { MobileMenuDrawer } from "@/components/NavBar/MobileMenuDrawer"; // new hamburger menu drawer
import { useLocale } from 'next-intl';
import Link from "next/link";



export function NavigationMenuDemo() {
  const categories = [
    { key: "navbar.pizza", href: "/menu/pizza" },
    { key: "navbar.appetizers", href: "/menu/appetizers" },
    { key: "navbar.beverages", href: "/menu/beverages" },
    { key: "navbar.desserts", href: "/menu/desserts" },
  ];
  
  const t = useTranslations();
  const locale = useLocale();
  const isLTR = locale === "en";
  
  return (
<div className=" flex justify-between items-center p-4 w-full border-b-2 border-b-[var(--primary-color2)] sticky top-0 bg-white z-50 border w-full">
<div className="w-[90%] flex justify-between items-center mx-auto">
      {/* Left: Logo */}
      <LogoNavBar />

      {/* Middle: Desktop Navigation */}
      <div className="hidden lg:flex ">
        
        {isLTR? <NavigationMenu>
          <NavigationMenuList className=" flex gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink className="text-start" href={`/${locale}`}>
                {t("navbar.home")}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem >
              <NavigationMenuTrigger className="hover:cursor-pointer">
              <NavigationMenuLink className=" text-start" href={`/menu`}>
                {t("navbar.menu")}
                </NavigationMenuLink>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
              <ul className="grid gap-3 p-4 w-48 ">
              {categories.map((item) => (
  <li key={item.key}>
    
      <NavigationMenuLink  className="block p-2 rounded-md hover:bg-muted transition-colors" href={item.href}>
     
      {t(item.key)}
   
      </NavigationMenuLink>
   
  </li>
))}

    </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink  href={`/${locale}#service`}>
                {t("navbar.service")}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href={`/${locale}#about`}>
                {t("navbar.aboutUs")}
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        

        :
        
        
        <NavigationMenu>
          <NavigationMenuList className=" flex gap-6">
          <NavigationMenuItem>
              <NavigationMenuLink href={`/${locale}#about`}>
                {t("navbar.aboutUs")}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem >
              <NavigationMenuTrigger className="hover:cursor-pointer">
              <NavigationMenuLink className=" text-start" href={`/menu`}>
                {t("navbar.menu")}
                </NavigationMenuLink>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
              <ul className="grid gap-3 p-4 w-48 text-end">
              {categories.map((item) => (
  <li key={item.key}>
    
      <NavigationMenuLink asChild className="block p-2 rounded-md hover:bg-muted transition-colors">
      <Link href={item.href} >
      {t(item.key)}
      </Link>
      </NavigationMenuLink>
   
  </li>
))}

    </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink  href={`/${locale}#service`}>
                {t("navbar.service")}
              </NavigationMenuLink>
            </NavigationMenuItem>
           
            <NavigationMenuItem>
              <NavigationMenuLink className="text-start" href={`/${locale}`}>
                {t("navbar.home")}
              </NavigationMenuLink>
            </NavigationMenuItem>
           
            
           
          </NavigationMenuList>
        </NavigationMenu> }
        
      </div>

      {/* Right: Toggles and Icons */}
      <div className="flex items-center gap-4">
        <LanguageToggle/>

        {/* Desktop: profile dropdown */}
        <div className={cn("hidden lg:flex items-center ")}>
          <DropDownNavBar />
        </div>

        {/* Mobile: hamburger menu drawer */}
        <div className="lg:hidden">
          <MobileMenuDrawer />
        </div>

        {/* Cart icon (always visible) */}
        <CartDropdown />
      </div>
      </div>
    </div>
  );
}
