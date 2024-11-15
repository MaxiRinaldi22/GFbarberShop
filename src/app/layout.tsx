import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";
import { monserrat } from "@/util/font";
import { AdminContextProvider } from "@/context/AdminContext";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "GF",
  description: "Generated by create next app",
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
