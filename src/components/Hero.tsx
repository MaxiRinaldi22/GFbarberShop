import Image from "next/image";
import hero from "/public/hero.jpeg";
import heroPc from "/public/heroPc.jpeg";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full">
      <div className="relative md:hidden">
        <Image
          src={hero}
          priority
          className="h-[40vh] w-full object-cover"
          style={{ objectPosition: "center 30%" }}
          alt="Foto de un corte"
        />
      </div>
      <div className="hidden w-full md:block">
        <Image
          src={heroPc}
          className="h-[40vh] md:h-[50vh] w-full object-cover "
          alt="Foto de un corte"
          style={{ objectPosition: "center 34%" }}
        />
      </div>
      <div className="absolute inset-0 md:h-[50vh] h-[40vh] bg-black opacity-40"></div>
      <h1 className="absolute left-[50%] top-[30%] flex w-full translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-1 text-3xl font-[500] text-white md:mt-5 md:text-4xl">
        <span>Tu estilo </span>
        <span>Tu elección</span>
        <span className="mt-5 text-4xl font-semibold tracking-wider md:mt-9 md:text-5xl">
          NUESTRA PASION
        </span>
      </h1>
      <button className="absolute left-[50%] top-[75%] translate-x-[-50%] translate-y-[-50%] rounded-xl border-2 border-white px-6 py-2 text-lg font-[500] text-white transition duration-300 hover:bg-white hover:text-black">
        <Link href="/agenda">Agendá tu hora</Link>
      </button>
    </section>
  );
}
