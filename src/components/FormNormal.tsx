"use client";
import { useState } from "react";
import db from "../util/firestore";
import { collection, addDoc } from "firebase/firestore";

export default function FormularioNormal() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "clientes"), {
        name: name,
        phone: phone,
        mail: mail,
      });

      console.log("Documento creado con ID:", docRef.id);

      setMail("");
      setPhone("");
      setName("");
      setSubmitted(true);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <>
      <h2 className="text-3xl">I N F O R M A C I O N</h2>
      <form className="flex w-full flex-col gap-5 p-5" onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-xl">
          Nombre:
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            className="text-md flex h-full w-full items-center justify-center rounded-full border p-2 px-4 shadow-lg outline-none"
          />
        </label>
        <label htmlFor="phone" className="gap-3 text-xl">
          Telefono:
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="phone"
            name="phone"
            className="text-md flex h-full w-full items-center justify-center rounded-full border p-2 px-4 shadow-lg outline-none"
          />
        </label>

        <label htmlFor="mail" className="text-xl">
          Mail:
          <input
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            type="email"
            name="mail"
            className="text-md flex h-full w-full items-center justify-center rounded-full border p-2 px-4 shadow-lg outline-none"
          />
        </label>

        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-full border-2 border-black bg-black px-6 py-2.5 text-center text-sm text-white duration-200 hover:border-black hover:bg-transparent hover:text-black focus:outline-none focus-visible:outline-black focus-visible:ring-black md:w-56"
        >
          E N V I A R
        </button>
        {/* <FormularioConCalendario /> */}
        {submitted && (
          <p>
            Gracias por confiar en nosotros. Verifica tu correo para confirmar tu
            cita.
          </p>
        )}
      </form>
    </>
  );
}
