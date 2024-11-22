"use client";
import { useEffect } from "react";
import Aos from "aos";
import { CardData } from "@/util/types";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useMobile";

export function Card({ title, img, id }: CardData) {
  const mobile = useIsMobile()

  useEffect(() => {
    Aos.init({ duration: 1800 });
  }, []);

  return (
    <div data-aos={!mobile ? "zoom-in" : id % 2 === 0 ? "fade-right" : "fade-left"} className="flex items-center justify-around gap-8 md:flex-col">
      <div className="hidden md:block">
        <Image src={img} width={160} height={155} alt={title} />
      </div>
      <div className="md:hidden">
        <Image src={img} width={128.57} height={125} alt={title} />
      </div>
      <p className="text-xl font-semibold md:block">{title}</p>
    </div>
  );
}
