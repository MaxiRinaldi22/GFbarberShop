"use client";

import { AdminContextType } from "@/util/types";
import { useState } from "react";
import { createContext } from "react";

const AdminContext = createContext<AdminContextType | null>(null);

function AdminContextProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState(false);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export { AdminContext, AdminContextProvider };
