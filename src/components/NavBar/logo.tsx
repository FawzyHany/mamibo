"use client"
import Link from "next/link";
import { cn } from "../../lib/utils";
import Image from 'next/image';;
import logo from '../../../public/logo/mainLogo.svg';
import HorizontalLogo from '../../../public/logo/HorizontolLogo.png';
import React from 'react'
import { useLocale } from 'next-intl';



export const LogoNavBar = () => {
  const locale = useLocale();
  return (
    <a href={`/${locale}`}>
  <Image
    src={HorizontalLogo}
    alt="My Logo"
    width={170}
    height={140}
    priority // optional: preloads image
    className="cursor-pointer"
  />
</a>
  )
}
