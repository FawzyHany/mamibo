"use client"
import { CarouselHome } from "@/components/NavBar/CarouselHome";
import Image from "next/image";
import chef from '../../../public/HomeImg/chef.jpg'
import { cn } from "@/lib/utils";
import { Container } from "@/components/Container/Container";
import { ServiceCard } from "@/components/ServiceCard/ServiceCard";
import serviceImg from '../../../public/ServiceImg/serviceBackground.jpeg'
import { Truck, Utensils } from 'lucide-react';
import ContactForm from "@/components/ContactForm/ContactForm";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  return (
    <>
    <main className="mt-10">
    <CarouselHome/>

<div className="w-full bg-gray-200">
      <Container CustomClass="" >
        <div id="about" className={cn("grid grid-cols-1 lg:grid-cols-2 ")}>

    <div className={cn('')}>
      <Image src={chef} alt='' className={cn('w-[90%] h-[100%] ')}></Image>
    </div>

    <div className="mt-10 ">
      <h4 className="secondary-font italic text-[25px] text-[var(--primary-color2)] font-medium">{t("navbar.aboutUs")}</h4>
      <h1 className="primary-font text-[30px] font-bold">RESPECTED EXPERT CHEFS</h1>
      <div className="w-[70%]">
      <p className="text-[#959595]">
  At Mamibo, we bring the heart of Italy to your table with dishes crafted from cherished family recipes and the finest locally sourced ingredients. From hand-tossed pizzas baked in traditional stone ovens to rich, slow-cooked pastas, every bite tells a story of passion and heritage.

  <br /><br />

  Our chefs are dedicated to preserving authentic Italian flavors while adding a touch of modern flair. Whether you're savoring our creamy risottos, rustic antipasti, or our signature tiramisu, you'll experience the warmth and soul of true Italian hospitality.

  <br /><br />

  Join us for a culinary journey that celebrates simplicity, quality, and the joy of sharing a meal. Buon appetito!
</p></div>

    </div>

    </div>
    </Container>
    </div>

    <Container>
    <div id="service" className=" w-full flex flex-col items-center justify-center ">
    <h4 className="secondary-font italic text-[25px] text-[var(--primary-color2)] font-medium">{t("navbar.service")}</h4>
    <h1 className="primary-font text-[30px] font-bold">WHAT WE CAN DO FOR YOU</h1>
    <p className="text-[#959595] w-[70%] text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed leo facilisis, imperdiet ligula et, aliquam nisl..</p>

    <div id="about" className={cn("grid grid-cols-1 lg:grid-cols-3 mt-12 gap-8")}>
      <ServiceCard backgroundImg={serviceImg} icon={<Truck className="text-[var(--primary-color2)] w-12 h-12"/>} Cardtitle="Food Delivery" description="Cras pulvinar ultricies vehicula tras et nulla id lorem vulputate pulvinar." />
      <ServiceCard backgroundImg={serviceImg} icon={<Utensils className="text-[var(--primary-color2)] w-12 h-12"/>} Cardtitle="Food Delivery" description="Cras pulvinar ultricies vehicula tras et nulla id lorem vulputate pulvinar." />
      <ServiceCard backgroundImg={serviceImg} icon={<Utensils className="text-[var(--primary-color2)] w-12 h-12"/>} Cardtitle="Food Delivery" description="Cras pulvinar ultricies vehicula tras et nulla id lorem vulputate pulvinar." />
    </div>
    </div>
    </Container>

    <div className="bg-gray-200">
    <Container>
    
      <h1 className={cn('text-[40px] primary-font mx-auto mb-5 font-bold max-w-xl mx-auto ')}>{t("navbar.contactus")}</h1>
      <ContactForm/>
      
    </Container>  </div>
    
    </main>
    </>
  );
}
