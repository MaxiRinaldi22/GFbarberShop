"use client";

import Image from "next/image";
import hero from "/public/hero.png";
import heroPc from "/public/heroPc.jpeg";
import Link from "next/link";
import AOS from "aos";
import { lora } from "@/util/font";
import { useEffect } from "react";

export function Hero() {
  useEffect(() => {
    AOS.init({ duration: 1800 });
  }, []);

  return (
    <section className="relative w-full">
      <div className="relative md:hidden">
        <Image
          src={hero}
          priority
          className="h-[60vh] w-full object-cover"
          alt="Foto de un corte"
        />
      </div>
      <div className="hidden w-full md:block">
        <Image
          src={heroPc}
          className="h-[40vh] w-full object-cover md:h-[50vh]"
          alt="Foto de un corte"
          style={{ objectPosition: "center 34%" }}
        />
      </div>
      <div className="absolute inset-0  bg-black opacity-60 md:h-[50vh] md:opacity-50"></div>
      <h1 className="absolute left-[50%] top-[37%] flex w-full translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-2 text-3xl font-[500] text-white md:top-[30%] md:mt-5 md:text-4xl">
        <span data-aos="fade-right">TU ESTILO</span>
        <span data-aos="fade-left">TU ELECCION</span>
        <span
          data-aos="zoom-in"
          className={`${lora.className} mt-5 text-4xl font-semibold tracking-wider md:mt-9 md:text-6xl`}
        >
          NUESTRA PASION
        </span>
      </h1>
      <button className="absolute left-[50%] top-[75%] translate-x-[-50%] translate-y-[-50%] rounded-xl border-2 border-white px-6 py-2 md:text-2xl text-lg font-[500] text-white transition duration-300 hover:bg-white hover:text-black">
        <Link href="/agenda">Agendá tu hora</Link>
      </button>
    </section>
  );
}
