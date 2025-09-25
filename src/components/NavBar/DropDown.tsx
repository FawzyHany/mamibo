import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import React from 'react'
import { CircleUserRound} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const DropDownNavBar = () => {
  const t = useTranslations();


  return (
    <DropdownMenu>
  <DropdownMenuTrigger className={cn("hover:cursor-pointer focus:outline-none")}><CircleUserRound className=" w-7 h-7"/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>{t("navbar.myaccount")}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem><Link href="/account">{t("navbar.account")}</Link></DropdownMenuItem>
    <DropdownMenuItem></DropdownMenuItem>
    <DropdownMenuItem className="primary-color1"><Button className="cursor-pointer" variant="destructive" onClick={() =>signOut({ callbackUrl: "/" }) 
}>{t("navbar.signout")}</Button></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  )
}
