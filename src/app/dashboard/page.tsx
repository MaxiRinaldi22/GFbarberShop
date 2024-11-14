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


  return (
    <section className="flex min-h-[92vh] w-full flex-col items-center md:mt-[8vh] md:py-10">
      <h2 className="pb-10 text-3xl font-semibold">P A N E L</h2>
      <div className="flex w-full flex-col items-center gap-3 px-5 md:px-0">
        {items.map((item) => (
          <div className="w-full border border-black p-2 md:w-96" key={item.id}>
            <DashboardComponent text={item.name} title="Nombre" />
            <DashboardComponent text={item.phone} title="Telefono" />
            <DashboardComponent text={item.mail} title="Mail" />
            <DashboardComponent text={item.hora} title="Hora" />
            <DeleteItem id={item.id} />
          </div>
        ))}
      </div>
    </section>
  );
}
