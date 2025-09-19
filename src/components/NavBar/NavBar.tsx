"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { cn } from "../../lib/utils";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import { useTranslations } from "next-intl";
import { CartDropdown } from "./CartDropdown"; // cart drawer
import { DropDownNavBar } from "./DropDown"; // user profile dropdown
import { LogoNavBar } from "./logo"; // logo
import { MobileMenuDrawer } from "./MobileMenuDrawer"; // new hamburger menu drawer

export function NavigationMenuDemo() {
  const t = useTranslations();

  return (
    <div className="mt-10 flex justify-between items-center py-4 px-6 w-full max-w-screen-xl mx-auto border-b-2 border-b-[var(--primary-color2)] sticky top-0 bg-white z-50 ">
      {/* Left: Logo */}
      <LogoNavBar />

      {/* Middle: Desktop Navigation */}
      <div className="hidden lg:flex">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink href="/">
                {t("navbar.home")}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:cursor-pointer">
                {t("navbar.menu")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {/* Submenu items if needed */}
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#service">
                {t("navbar.service")}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#about">
                {t("navbar.aboutUs")}
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right: Toggles and Icons */}
      <div className="flex items-center gap-4">
        <LanguageToggle />

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
  );
}
