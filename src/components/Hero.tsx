"use client";

import Image from "next/image";
import hero from "/public/hero.png";
import heroPc from "/public/heroPc.jpeg";
import Link from "next/link";
import { lora } from "@/util/font";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Hero() {
  const logoRef = useRef<HTMLDivElement>(null);
  const estiloRef = useRef<HTMLSpanElement>(null);
  const eleccionRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const nuestroRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 3,
        ease: "power4.out",
      },
    );

    gsap.to(logoRef.current, {
      y: 100,
      opacity: 0,
      duration: 3,
      ease: "power4.out",
      delay: 2,
    });

    gsap.fromTo(
      eleccionRef.current,
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        delay: 2.5,
        ease: "slow",
      },
    );

    gsap.fromTo(
      estiloRef.current,
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.7,
        delay: 2.5,
        ease: "slow",
      },
    );

    gsap.fromTo(
      btnRef.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: -100,
        opacity: 1,
        duration: 1.5,
        delay: 2.5,
        ease: "slow",
      },
    );

    gsap.fromTo(
      nuestroRef.current,
      {
        opacity: 0,
      },
      {
        "clip-path": "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        opacity: 1,
        duration: 2,
        delay: 3,
        ease: "power4.in",
      },
    );
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
      <div className="absolute inset-0 bg-black opacity-60 md:h-[50vh] md:opacity-50"></div>

      <div
        ref={logoRef}
        className="absolute left-1/2 top-1/2 flex h-[500px] w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center"
      >
        <Image src="/logoW.png" alt="Logo" width={350} height={350} />
      </div>

      <h1 className="absolute left-[50%] top-[37%] flex w-full translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-2 text-3xl font-[500] text-white md:top-[30%] md:mt-5 md:text-4xl">
        <span className="opacity-0" ref={estiloRef}>
          TU ESTILO
        </span>
        <span className="opacity-0" ref={eleccionRef}>TU ELECCION</span>
        <span
          className={`${lora.className} mt-5 text-4xl font-semibold tracking-wider opacity-0 md:mt-9 md:text-6xl`}
          style={{
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
          }}
          ref={nuestroRef}
        >
          NUESTRA PASION
        </span>
      </h1>
      <div className="opacity-0" ref={btnRef}>
        <button className="absolute left-[50%] top-[75%] translate-x-[-50%] translate-y-[-50%] rounded-xl border-2 border-white px-6 py-2 text-lg font-[500] text-white transition duration-300 hover:bg-white hover:text-black md:text-2xl">
          <Link href="/agenda">Agendá tu hora</Link>
        </button>
      </div>
    </section>
  );
}
