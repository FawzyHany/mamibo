import Image from 'next/image'
import React from 'react'

import type { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { Truck } from 'lucide-react';


type Props={
  backgroundImg: StaticImageData;
  Cardtitle?: string;
  icon?: React.ReactNode;
  description?: string;
  moreDiscription?:string
  button?:boolean;
}


export const ServiceCard:React.FC<Props> = ({
  backgroundImg,
  Cardtitle,
  icon,
  description,
  moreDiscription,
  button
}) => {
  return (
    <div className={cn("relative w-[250px] h-[330px]")}>
  <Image src={backgroundImg} alt='' className="w-full h-full" />
  
  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center  bg-[#20272ff7]">

    <div className={cn('w-[90px] h-[90px] mt-[40px] bg-red-500 flex justify-center items-center rounded-full bg-[#303943]')}>
      {icon}
    </div>
    <h1 className='text-[16px] text-white mt-[10px] font-bold font-secondary'>{Cardtitle}</h1>
    <p className='text-[16px] text-[#959595] mt-[10px] font-primary w-[70%] text-center'>{description}</p>
    {button &&<button className='cursor-pointer text-[14px] font-secondary rounded-3xl border-[var(--primary-color2)] border-2 p-3 text-white mt-[20px]'>Learn More</button>}

  </div>
</div>

  )
}
