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
    <div>
      <h1>dasboard</h1>
      {items.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.phone}</p>
          <p>{item.mail}</p>
        </div>
      ))}
    </div>
  );
}
