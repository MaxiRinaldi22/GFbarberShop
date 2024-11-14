import Image from "next/image";

// Imagenes
import cliente1 from "/public/clientes/cliente1.png";
import cliente2 from "/public/clientes/cliente2.png";
import cliente3 from "/public/clientes/cliente3.png";
import cliente4 from "/public/clientes/cliente4.png";
import cliente5 from "/public/clientes/cliente5.png";

export function Imagenes() {
  return (
    <section className="flex flex-col items-center  justify-center gap-5 px-5 md:flex-row">
      <Image src={cliente1} alt="Clientes"  width={360} height={560}></Image>
      <Image src={cliente2} alt="Clientes" width={360} height={560} ></Image>
      <Image src={cliente3} alt="Clientes"  width={360} height={560}></Image>
      <Image src={cliente4} alt="Clientes" width={360} height={560} ></Image>
      <Image src={cliente5} alt="Clientes"  width={360} height={560}></Image>
    </section>
  );
}
