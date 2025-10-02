"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import React from "react";
import { CircleUserRound } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const DropDownNavBar = () => {
  const t = useTranslations();
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = !!session?.user?.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn("hover:cursor-pointer focus:outline-none")}>
        <CircleUserRound className="w-7 h-7" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          {isLoading
            ? "..."
            : isAuthenticated
            ? t("navbar.myaccount")
            : t("navbar.account")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {isAuthenticated ? (
          <>
            <DropdownMenuItem>
              <Link href="/account" className="w-full text-[var(--primary-color2)]">
                {t("navbar.account")}
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="primary-color1">
              <Button
                className="w-full cursor-pointer"
                variant="destructive"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                {t("navbar.signout")}
              </Button>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <Link href="/login" className="w-full text-[var(--primary-color2)]">
                {t("navbar.login")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/signup" className="w-full text-[var(--primary-color2)]">
                {t("navbar.signup")}
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
