"use client";

import db from "@/util/firestore";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../components/CustomCalendar.css";
import Aos from "aos";

function FormularioConCalendario({
  setHora,
  hora,
}: {
  setHora: React.Dispatch<React.SetStateAction<string>>;
  hora: string;
}) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date>(new Date());
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
  const [selectedHrs, setSelectedHrs] = useState<number>();
  const [horarios, setHorarios] = useState([
    { hora: "08:00", disponible: true },
    { hora: "09:00", disponible: true },
    { hora: "10:00", disponible: true },
    { hora: "11:00", disponible: true },
    { hora: "12:00", disponible: true },
    { hora: "17:00", disponible: true },
    { hora: "18:00", disponible: true },
    { hora: "19:00", disponible: true },
    { hora: "20:00", disponible: true },
    { hora: "21:00", disponible: true },
    { hora: "22:00", disponible: true },
    { hora: "23:00", disponible: true },
    { hora: "00:00", disponible: true },
  ]);
  const [items, setItems] = useState<DocumentData[]>([]);

  const manejarFechaSeleccionada = (fecha: Date) => {
    setFechaSeleccionada(fecha);
  };

  const handleHrs = (horario: string, i: number) => {
    setHorarioSeleccionado(horario);
    setSelectedHrs(i);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clientes"));
        const items = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setItems(items);
      } catch (e) {
        console.error("Error al obtener los items:", e);
      }
    };
    fetchItems();
  }, [items]);

  useEffect(() => {
    if (horarioSeleccionado === "") return;
    setHora(
      `${fechaSeleccionada.toLocaleDateString()} - ${horarioSeleccionado}`,
    );
  }, [fechaSeleccionada, horarioSeleccionado]);
  

  useEffect(() => {
    const fecha = fechaSeleccionada.toLocaleDateString();
    const isAfterDecember12 =
      new Date(fechaSeleccionada) >= new Date("2024-12-20");

    const horariosBase = isAfterDecember12
      ? [
          { hora: "17:00", disponible: true },
          { hora: "18:00", disponible: true },
          { hora: "19:00", disponible: true },
          { hora: "20:00", disponible: true },
          { hora: "21:00", disponible: true },
          { hora: "22:00", disponible: true },
          { hora: "23:00", disponible: true },
          { hora: "00:00", disponible: true },
        ]
      : [
          { hora: "08:00", disponible: true },
          { hora: "09:00", disponible: true },
          { hora: "10:00", disponible: true },
          { hora: "11:00", disponible: true },
          { hora: "12:00", disponible: true },
          { hora: "17:00", disponible: true },
          { hora: "18:00", disponible: true },
          { hora: "19:00", disponible: true },
          { hora: "20:00", disponible: true },
          { hora: "21:00", disponible: true },
          { hora: "22:00", disponible: true },
          { hora: "23:00", disponible: true },
          { hora: "00:00", disponible: true },
        ];

    const horariosDisponibles = horariosBase.map((horario) => ({
      ...horario,
      disponible: !items.some(
        (item) => item.hora === `${fecha} - ${horario.hora}`,
      ),
    }));

    setHorarios(horariosDisponibles);
  }, [items, fechaSeleccionada]);

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <div
      data-aos="fade-right"
      className="flex w-full flex-col items-center md:pt-5"
    >
      <h3 className="pb-3 text-xl">Selecciona una fecha:</h3>
      <Calendar
        onChange={(value) => manejarFechaSeleccionada(value as Date)}
        value={fechaSeleccionada}
        minDate={new Date()}
        next2Label={null}
        prev2Label={null}
      />

      <h3 className="pb-6 pt-1 text-base md:py-2">
        Horarios para el {fechaSeleccionada.toLocaleDateString()}
      </h3>
      <ul className="grid w-full grid-cols-3 gap-2 md:grid-cols-4">
        {horarios.map((horario, index) => (
          <button
            onClick={() => handleHrs(horario.hora, index)}
            type="button"
            disabled={!horario.disponible}
            key={index}
            style={{
              color: horario.disponible ? "green" : "red",
              backgroundColor: selectedHrs === index ? "#d1d5db" : "",
            }}
            className={`${horario.disponible ? "cursor-pointer" : "cursor-not-allowed"} ${selectedHrs === index ? "border-gray-300" : ""} flex items-center justify-center rounded-xl border p-1 font-semibold shadow-lg`}
          >
            {horario.hora}
          </button>
        ))}
      </ul>
      <div className="flex min-h-8 w-full min-w-full items-start">
        {hora === "" && (
          <p className="mt-3 text-sm text-red-600">Ingrese fecha y hora</p>
        )}
      </div>
    </div>
  );
}

export default FormularioConCalendario;
