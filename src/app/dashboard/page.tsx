"use client";

import db from "@/util/firestore";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useAdmin } from "@/hooks/useAdmin";

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
    <section className="mt-[10vh] flex min-h-[92vh] w-full flex-col items-center md:mt-[8vh] md:py-10">
      <h2 className="pb-10 text-3xl font-semibold">D A S H B O A R D</h2>
      <div className="flex w-full items-center flex-col gap-3 px-5 md:px-0">
        {items.map((item) => (
          <div className="w-full border border-black p-2 md:w-96" key={item.id}>
            <p className="flex gap-2 font-semibold">
              Nombre:
              <span className="font-normal">{item.name}</span>
            </p>
            <p className="flex gap-2 font-semibold">
              Telefono:
              <span className="font-normal">{item.phone}</span>
            </p>
            <p className="flex gap-2 font-semibold">
              Mail:
              <span className="font-normal">{item.mail}</span>
            </p>
            <p className="flex gap-2 font-semibold">
              Hora:
              <span className="font-normal">{item.hora}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
