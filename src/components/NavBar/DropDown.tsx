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

export const DropDownNavBar = () => {
  return (
    <DropdownMenu>
  <DropdownMenuTrigger className={cn("hover:cursor-pointer focus:outline-none")}><CircleUserRound className=" w-7 h-7"/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem className="primary-color1">Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  )
}
