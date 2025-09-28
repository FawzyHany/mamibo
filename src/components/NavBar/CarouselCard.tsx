import React from 'react'
import Image from 'next/image'
import { cn } from "@/lib/utils";
import type { StaticImageData } from "next/image";
import Link from 'next/link';


type Props={
  title?: string;
  backgroundImg: StaticImageData;
  icon?: React.ReactNode;
  description?: string;
  button?:boolean;
  customClass?: string;
  textAlt: string;
  btnText?:string;
  customBtnClass?:string;
  buttonHref:string
}

export const CarouselCard:React.FC<Props> = ({
  title,
  backgroundImg,
  description,
  button,
  customClass,
  btnText,
  textAlt,
  customBtnClass,
  buttonHref

}) => {
  console.log(backgroundImg, title, description)
  return (
    <div className={cn("relative w-full h-full", customClass)}>
      {/* Responsive image height */}
      <Image
        alt={textAlt}
        src={backgroundImg}
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
      />

      {/* Overlay content */}
      <div className="absolute top-10 sm:top-16 md:top-20 left-4 sm:left-7 z-10">
        <h1 className="font-secondary text-3xl sm:text-5xl md:text-[70px] text-white italic">
          {title}
        </h1>

        {description && (
          <p className="font-primary text-sm sm:text-lg md:text-xl text-yellow-500 mt-2 ml-2">
            {description}
          </p>
        )}

        {button && (
         <Link href={buttonHref}> <button
            className={cn(
              "mt-6 px-6 py-3 text-sm sm:text-lg md:text-xl w-[200px] sm:w-[250px] md:w-[300px] text-white border-2 border-[var(--primary-color2)] bg-transparent hover:bg-[var(--primary-color2)] rounded-3xl transition hover:cursor-pointer",
              customBtnClass
            )}
          >
            {btnText}
          </button></Link>
        )}
      </div>
    </div>
  );
}
