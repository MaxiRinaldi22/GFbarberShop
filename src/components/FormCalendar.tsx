"use client";

import db from "@/util/firestore";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../components/CustomCalendar.css";

function FormularioConCalendario({
  setHora,
}: {
  setHora: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date>(new Date());
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
  const [selectedHrs, setSelectedHrs] = useState(0);
  const [horarios, setHorarios] = useState([
    { hora: "09:00", disponible: true },
    { hora: "10:00", disponible: true },
    { hora: "11:00", disponible: true },
    { hora: "12:00", disponible: true },
    { hora: "13:00", disponible: true },
    { hora: "14:00", disponible: true },
    { hora: "15:00", disponible: true },
    { hora: "16:00", disponible: true },
    { hora: "17:00", disponible: true },
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
  }, []);

  useEffect(() => {
    setHora(
      `${fechaSeleccionada.toLocaleDateString()} - ${horarioSeleccionado}`,
    );
  }, [horarioSeleccionado, fechaSeleccionada]);

  useEffect(() => {
    const fecha = fechaSeleccionada.toLocaleDateString();
    const horariosDisponibles = horarios.map((horario) => ({
      ...horario,
      disponible: !items.some(
        (item) => item.hora === `${fecha} - ${horario.hora}`,
      ),
    }));
    setHorarios(horariosDisponibles);
  }, [items, fechaSeleccionada, horarios]);

  return (
    <div className="flex flex-col pt-5">
      <h3 className="pb-2 text-xl">Selecciona una fecha:</h3>
      <Calendar
        onChange={(value) => manejarFechaSeleccionada(value as Date)}
        value={fechaSeleccionada}
      />

      <h3 className="py-2 text-base">
        Horarios para el {fechaSeleccionada.toLocaleDateString()}
      </h3>
      <ul className="grid grid-cols-4 gap-2">
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
            className={`${horario.disponible ? "cursor-pointer" : "cursor-not-allowed"} ${selectedHrs === index ? "border-gray-300" : ""} flex items-center justify-center rounded-full border p-1 font-semibold shadow-lg`}
          >
            {horario.hora}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default FormularioConCalendario;
