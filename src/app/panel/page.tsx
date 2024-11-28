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
  const [reRender, setReRender] = useState(false);
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
  }, [reRender]);

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

  let groupedItems = groupByDate(items);

  // Convertir en uno para usar en la parte de abajo
  const hoy = new Date();

  const filteredItems = Object.fromEntries(
    Object.entries(groupedItems).filter(([date]) => {
      const [day, month, year] = date.split("/").map(Number);
      const parsedDate = new Date(year, month - 1, day);

      const normalizedToday = new Date(
        hoy.getFullYear(),
        hoy.getMonth(),
        hoy.getDate(),
      );
      const normalizedDate = new Date(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
        parsedDate.getDate(),
      );

      return normalizedDate >= normalizedToday;
    }),
  );

  groupedItems = filteredItems;

  const uruguayTimeZone = "America/Montevideo";

  const hoyUI = new Intl.DateTimeFormat("en-CA", {
    timeZone: uruguayTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .split("/")
    .reverse()
    .join("-");

  const tomorrow = new Intl.DateTimeFormat("en-CA", {
    timeZone: uruguayTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(Date.now() + 24 * 60 * 60 * 1000))
    .split("/")
    .reverse()
    .join("-");

    console.log("hoy", hoyUI);
    console.log("tomorrow", tomorrow);
    

  return (
    <section className="flex h-full w-full flex-col items-center justify-center md:py-10">
      <h2 className="pb-10 text-3xl font-semibold">P A N E L</h2>
      <div className="flex min-h-screen w-full flex-col gap-3 px-5 md:w-fit md:px-0">
        {Object.entries(groupedItems).map(([date, items]) => (
          <div
            key={date}
            className="flex w-full flex-col items-start justify-center"
          >
            <h3 className="flex pb-4 text-xl font-semibold">
              {date === hoyUI.split("-").reverse().join("/")
                ? "Hoy"
                : date === tomorrow.split("-").reverse().join("/")
                  ? "Mañana"
                  : date}
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
                  <DeleteItem
                    id={item.id}
                    reRender={reRender}
                    setReRender={setReRender}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
