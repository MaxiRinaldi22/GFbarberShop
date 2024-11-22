"use client"

import { useEffect, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // Cambia el valor según tus necesidades
    };

    // Verificamos el tamaño inicial
    checkScreenSize();

    // Agregamos un listener para cambios en el tamaño de la ventana
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile;
}
