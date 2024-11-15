"use client";
import { useEffect } from "react";
import Aos from "aos"
import { CardData } from "@/util/types";
import Image from "next/image";

export function Card({ title, img }: CardData) {

  useEffect(() => {
    Aos.init({ duration: 1800 }); 
  }, []);

  return (
    <div className="flex md:flex-col items-center justify-around">
      <div data-aos="fade-right" className="hidden md:block">
        <Image src={img} width={180} height={175} alt={title} />
      </div>
      <div data-aos="fade-right" className="md:hidden">
        <Image src={img} width={128.57} height={125} alt={title} />
      </div>
      <p data-aos="fade-left" className="text-2xl font-semibold md:block">{title}</p>
    </div>
  );
}
