"use client";
import { useEffect } from "react";
import Aos from "aos";
import { CardData } from "@/util/types";
import Image from "next/image";

export function Card({ title, img }: CardData) {
  useEffect(() => {
    Aos.init({ duration: 1800 });
  }, []);

  return (
    <div className="flex items-center justify-around md:flex-col gap-5">
      <div className="hidden md:block">
        <Image src={img} width={160} height={155} alt={title} />
      </div>
      <div className="md:hidden">
        <Image src={img} width={128.57} height={125} alt={title} />
      </div>
      <p className="text-2xl font-semibold md:block">{title}</p>
    </div>
  );
}
