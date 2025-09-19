import React from 'react'
import { CarouselCard } from './CarouselCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MenuPic from '../../../public/CarouselPics/MenuPic.jpg'
import WelcomePic from '../../../public/CarouselPics/WelcomePic.jpg'
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';




export const CarouselHome = () => {
  const locale = useLocale();
  return (

<main className={cn("w-full flex justify-center px-4")}>
  <Carousel key={locale} // Forces remount on locale change
      opts={{
        loop: true,
        align: 'start',
        direction: locale === 'ar' ? 'rtl' : 'ltr',
      }} className="border w-[80%] max-w-[1000px] h-[300px] sm:h-[400px] md:h-[500px]">
    <CarouselContent>
      <CarouselItem>
        <CarouselCard
          textAlt=""
          backgroundImg={WelcomePic}
          title="Welcome To Mamibo"
          description="Authentic Italian flavors, made with passion and tradition."
          button
          btnText="About Us"
          buttonHref='#about'
        />
      </CarouselItem>

      <CarouselItem>
        <CarouselCard
          textAlt=""
          backgroundImg={MenuPic}
          title="Check out our new arrivals!"
          button
          btnText="Menu"
          customBtnClass="bg-[var(--primary-color2)]"
          description=''
          buttonHref=''
        />
      </CarouselItem>
    </CarouselContent>

    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</main>


   

  )
}
