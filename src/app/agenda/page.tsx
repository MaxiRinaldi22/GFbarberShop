"use client";
import FormularioConCalendario from "@/components/FormCalendar";
import FormularioNormal from "@/components/FormNormal";
import { useState } from "react";

export default function ContactoPage() {
  const [hora, setHora] = useState("");

  return (
    <section className="mt-[1vh] flex w-full flex-col items-center md:mt-0 2xl:px-[600px]">
      <h2 className="pt-5 text-4xl font-semibold">A G E N D A</h2>
      <div className="flex w-full flex-col-reverse items-center justify-center gap-5 px-5 py-10 md:flex-row-reverse md:px-0 md:py-20">
        <FormularioNormal hora={hora} />
        <FormularioConCalendario setHora={setHora} hora={hora}/>
      </div>
    </section>
  );
}
