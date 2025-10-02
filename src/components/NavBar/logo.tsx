"use client"
import Image from 'next/image';;
import HorizontalLogo from '../../../public/logo/HorizontolLogo.png';
import React from 'react'
import { useLocale } from 'next-intl';
import { LogoAr } from './logoAr';




export const LogoNavBar = () => {
  const locale = useLocale();
  return (
    
    <a href={`/${locale}`}>
      {locale==="en" ? <Image
    src={HorizontalLogo}
    alt="My Logo"
    width={170}
    height={140}
    priority // optional: preloads image
    className="cursor-pointer"
  />:<LogoAr/>}
  
</a>
  )
}
