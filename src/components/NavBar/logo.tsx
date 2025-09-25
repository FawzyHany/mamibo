import Link from "next/link";
import { cn } from "../../lib/utils";
import Image from 'next/image';;
import logo from '../../../public/logo/mainLogo.svg';
import HorizontalLogo from '../../../public/logo/HorizontolLogo.png';
import React from 'react'
import { useRouter } from "next/router";



export const LogoNavBar = () => {
  // const { locale } = useRouter();
  return (
    <Link href='/'>
  <Image
    src={HorizontalLogo}
    alt="My Logo"
    width={170}
    height={140}
    priority // optional: preloads image
  />
</Link>
  )
}
