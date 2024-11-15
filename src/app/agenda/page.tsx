"use client";
import FormularioConCalendario from "@/components/FormCalendar";
import FormularioNormal from "@/components/FormNormal";
import { playfair } from "@/util/font";
import Aos from "aos";
import { useEffect, useState } from "react";

export default function ContactoPage() {
  const [hora, setHora] = useState("");

  useEffect(() => {
    Aos.init({ duration: 1500 }); 
  }, []);

  return (
    <section className="mt-[1vh]  flex w-full flex-col items-center md:mt-0 2xl:px-[600px]">
         <h2
          className={`${playfair.className} font-semibold pt-5 text-3xl  md:text-4xl`}
        >
          · · · A G E N D A · · ·
        </h2>
      <div className="flex w-full flex-col-reverse items-center justify-center gap-5 px-5 py-10 md:flex-row-reverse md:px-0 md:py-20">
        <FormularioNormal hora={hora} />
        <FormularioConCalendario setHora={setHora} hora={hora}/>
      </div>
    </section>
  );
}
