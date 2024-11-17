"use client";
import { useEffect, useState } from "react";
import db from "../util/firestore";
import { collection, addDoc } from "firebase/firestore";
import Aos from "aos";
import { TYPE_BTNS } from "@/util/const";

export default function FormularioNormal({ hora }: { hora: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [sendBtn, setSendBtn] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validMail, setValidMail] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [tipo, setTipo] = useState<"" | "corte" | "mecha" | "color">("");

  const uruguayanPhoneRegex = /^(09\d{7}|2\d{7})$/;

  const handleFormSubmit = async () => {
    try {
      await addDoc(collection(db, "clientes"), {
        name: name,
        phone: phone,
        mail: mail,
        hora: hora,
        tipo: tipo,
      });

      setSubmit(true);
      setMail("");
      setPhone("");
      setName("");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  useEffect(() => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    setValidMail(emailRegex.test(mail));
  }, [mail]);

  useEffect(() => {
    if (uruguayanPhoneRegex.test(phone)) {
      setValidPhone(true);
    } else {
      setValidPhone(false);
    }
  }, [phone]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleFormSubmit();
  };

  useEffect(() => {
    if (
      name !== "" &&
      validPhone &&
      phone !== "" &&
      validMail &&
      mail !== "" &&
      hora !== ""
    ) {
      setSendBtn(true);
    } else {
      setSendBtn(false);
    }
  }, [name, phone, mail, hora, validPhone]);

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <form
      className="flex w-full flex-col gap-5 md:p-4"
      onSubmit={(e) => handleSubmit(e)}
      data-aos="fade-left"
    >
      <div className="flex flex-col gap-3">
        <label htmlFor="name" className="text-xl">
          Nombre:
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            className="text-md flex h-full w-full items-center justify-center rounded-xl border p-2 px-4 shadow-lg outline-none"
          />
          <div className="min-h-[20px] min-w-full">
            {name === "" && (
              <p className="text-sm text-red-600">Ingrese un nombre</p>
            )}
          </div>
        </label>
        <label htmlFor="phone" className="gap-3 text-xl">
          Telefono:
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="phone"
            name="phone"
            className="text-md flex h-full w-full items-center justify-center rounded-xl border p-2 px-4 shadow-lg outline-none"
          />
          <div className="min-h-[20px] min-w-full">
            {!validPhone && (
              <p className="text-sm text-red-600">
                Ingrese un numero de telefono valido
              </p>
            )}
          </div>
        </label>

        <label htmlFor="mail" className="text-xl">
          Mail:
          <input
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            type="email"
            name="mail"
            className="text-md flex h-full w-full items-center justify-center rounded-xl border p-2 px-4 shadow-lg outline-none"
          />
          <div className="min-h-[20px] min-w-full">
            {!validMail && (
              <p className="text-sm text-red-600">Ingrese un mail valido</p>
            )}
          </div>
        </label>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex gap-2 w-full justify-between">
          {TYPE_BTNS.map((btn) => (
            <button
              className={`${btn.type === tipo ? "bg-black text-white" : ""} w-full rounded-xl border px-6 py-2.5 text-center text-sm font-[500] shadow-lg`}
              key={btn.type}
              type="button"
              onClick={() => setTipo(btn.type as "corte" | "mecha" | "color")}
            >
              {btn.title}
            </button>
          ))}
        </div>
        <div className="min-h-[20px] min-w-full">
          {tipo === "" && (
            <p className="text-sm text-red-600">Seleccione un tipo</p>
          )}
        </div>
      </div>

      <div>
        {sendBtn ? (
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-xl border-2 border-black bg-black px-6 py-2.5 text-center text-sm text-white duration-200 hover:border-black hover:bg-transparent hover:text-black focus:outline-none focus-visible:outline-black focus-visible:ring-black md:w-full"
          >
            E N V I A R
          </button>
        ) : (
          <button
            disabled
            type="submit"
            className="flex w-full cursor-not-allowed items-center justify-center rounded-xl border-2 border-neutral-200 bg-neutral-200 px-6 py-2.5 text-center text-sm text-white md:w-full"
          >
            E N V I A R
          </button>
        )}
        {submit && (
          <p>
            Gracias por confiar en nosotros. Verifica tu correo para confirmar
            tu cita
          </p>
        )}
      </div>
    </form>
  );
}
