"use client";

import { AdminContextType } from "@/util/types";
import { useEffect, useState } from "react";
import { createContext } from "react";

const AdminContext = createContext<AdminContextType | null>(null);

function AdminContextProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const storedAdmin = sessionStorage.getItem("admin") === "true";
    setAdmin(storedAdmin);
  }, []);

  useEffect(() => {
    if (admin !== null) {
      sessionStorage.setItem("admin", admin.toString());
    }
  }, [admin]);

  if (admin === null) return null;

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export { AdminContext, AdminContextProvider };
