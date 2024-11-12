"use client"
import FormularioConCalendario from "@/components/FormCalendar";
import FormularioNormal from "@/components/FormNormal";
import { useState } from "react";

export default function ContactoPage() {
  const [hora, setHora] = useState("")

  return (
    <section className="mt-[10vh] md:mt-[8vh] flex min-h-[92vh] w-full flex-col items-center md:py-10  2xl:px-[600px]">
      <h2 className="text-3xl font-semibold">A G E N D A</h2>
      <div className="flex w-full flex-col-reverse px-5 md:px-0 gap-5 md:flex-row-reverse items-start justify-center py-10 md:py-20">
        <FormularioNormal hora={hora} />
        <FormularioConCalendario setHora={setHora}/>
      </div>
    </section>
  );
}
