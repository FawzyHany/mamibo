"use client"
import Image from 'next/image';;
import mainLogo from '../../../public/logo/main.jpg';
import React from 'react'
import { useLocale } from 'next-intl';




export const LogoAr = () => {
  const locale = useLocale();

  return (
    <a href={`/${locale}`} >
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Image
          src={mainLogo}
          alt="My Logo"
          width={70}
          height={50}
          priority
          className="w-12 h-auto sm:w-16 md:w-20 cursor-pointer"
        />
        <h1 className="text-lg sm:text-xl md:text-2xl  text-gray-800">
          ماميبوا
        </h1>
      </div>
    </a>
  );
};