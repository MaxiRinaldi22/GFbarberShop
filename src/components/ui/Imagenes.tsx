"use client";

import { useEffect } from "react";
import Aos from "aos"
import Image from "next/image";

// Imagenes
import cliente1 from "/public/clientes/cliente1.png";
import cliente2 from "/public/clientes/cliente2.png";
import cliente3 from "/public/clientes/cliente3.png";
import cliente4 from "/public/clientes/cliente4.png";
import cliente5 from "/public/clientes/cliente5.png";
import { useIsMobile } from "@/hooks/useMobile";

export function Imagenes() {
  const mobile = useIsMobile()
  const animationR = !mobile ? "zoom-in" : "fade-right"
  const animationL = !mobile ? "zoom-in" : "fade-left"

  useEffect(() => {
    Aos.init({ duration: 1800 }); 
  }, []);


  return (
    <section className="flex flex-col items-center justify-center gap-5 md:gap-1 px-5 md:flex-row">
      <Image data-aos={animationR} src={cliente1} alt="Cortes fade modernos" width={360} height={560}></Image>
      <Image data-aos={animationL} src={cliente2} alt="Cortes fade modernos" width={360} height={560}></Image>
      <Image data-aos={animationR} src={cliente3} alt="Cortes fade modernos" width={360} height={560}></Image>
      <Image data-aos={animationL} src={cliente4} alt="Cortes fade modernos" width={360} height={560}></Image>
      <Image data-aos={animationR} src={cliente5} alt="Cortes fade modernos" width={360} height={560}></Image>
    </section>
  );
}
