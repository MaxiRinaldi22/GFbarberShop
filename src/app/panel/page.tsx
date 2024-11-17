"use client";

import db from "@/util/firestore";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useAdmin } from "@/hooks/useAdmin";
import { DashboardComponent } from "@/components/ui/DashboardComponent";
import DeleteItem from "@/components/ui/DeleteButton";

export default function Dashboard() {
  const [items, setItems] = useState<DocumentData[]>([]);

  const { admin } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!admin) {
      router.push("/login");
      return;
    }
  }, [router, admin]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clientes"));
        const fetchItems = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          hora: doc.data().hora,
        }));

        const sortedItems = [...fetchItems].sort((a, b) => {
          const dateA = convertToDate(a.hora);
          const dateB = convertToDate(b.hora);
          return dateA.getTime() - dateB.getTime();
        });

        setItems(sortedItems);
      } catch (e) {
        console.error("Error al obtener los items:", e);
      }
    };
    fetchItems();
  }, []);

  const convertToDate = (hora: string) => {
    const [datePart, timePart] = hora.split(" - ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [hours, minutes] = timePart.split(":").map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  };

  const groupByDate = (items: DocumentData[]) => {
    return items.reduce((groups: Record<string, DocumentData[]>, item) => {
      const datePart = item.hora.split(" - ")[0];
      if (!groups[datePart]) {
        groups[datePart] = [];
      }
      groups[datePart].push(item);
      return groups;
    }, {});
  };

  const groupedItems = groupByDate(items);

  const hoy = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];


  return (
    <section className="flex h-full w-full flex-col items-center justify-center md:py-10">
      <h2 className="pb-10 text-3xl font-semibold">P A N E L</h2>
      <div className="min-h-screen flex w-full flex-col gap-3 px-5 md:w-fit md:px-0">
        {Object.entries(groupedItems).map(([date, items]) => (
          <div
            key={date}
            className="flex w-full flex-col items-start justify-center"
          >
            <h3 className="flex pb-4 text-xl font-semibold">
              {date === hoy.split("-").reverse().join("/") ? "Hoy"  : date ===  tomorrow.split("-").reverse().join("/") ? "Mañana" : date}
            </h3>
            <div className="flex w-full flex-col gap-5">
              {items.map((item) => (
                <div
                  className="w-full border border-black p-2 md:w-96"
                  key={item.id}
                >
                  <DashboardComponent text={item.name} title="Nombre" />
                  <DashboardComponent text={item.phone} title="Telefono" />
                  <DashboardComponent text={item.mail} title="Mail" />
                  <DashboardComponent text={item.tipo} title="Tipo" />
                  <DashboardComponent text={item.hora} title="Hora" />
                  <DeleteItem id={item.id} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
