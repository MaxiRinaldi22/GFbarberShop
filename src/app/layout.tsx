import type { Metadata } from "next";
import Header from "@/components/Header";
import { monserrat } from "@/util/font";
import { AdminContextProvider } from "@/context/AdminContext";
import { Footer } from "@/components/footer";
import "./globals.css";
import "aos/dist/aos.css";

export const metadata: Metadata = {
  title: "GF Barber Studio | Cortes Modernos y Arreglo de Barba en Maldonado",
  description:
    "Barbería en Maldonado con los mejores cortes modernos, arreglos de barba y afeitados clásicos. Atención profesional y estilo único. ¡Visítanos hoy!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={monserrat.className}>
        <Header />
        <AdminContextProvider>
          <main>{children}</main>
        </AdminContextProvider>
        <Footer />
      </body>
    </html>
  );
}
