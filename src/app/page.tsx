import { Hero } from "@/components/Hero";
import { Card } from "@/components/ui/Card";
import { Imagenes } from "@/components/ui/Imagenes";
import { CARD_ITEMS } from "@/util/const";
import { lora } from "@/util/font";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="flex w-full flex-col items-center justify-center px-10 py-10 pb-0">
        <h2
          className={`${lora.className} pt-5 text-3xl font-semibold md:text-4xl`}
        >
          · · S E R V I C I O S · ·
        </h2>
        <div className="flex flex-col pb-10 md:py-16 gap-5 pt-10 md:flex-row md:gap-24">
          {CARD_ITEMS.map((item) => (
            <Card key={item.title} title={item.title} img={item.img} />
          ))}
        </div>
      </section>
      <div className="flex flex-col items-center justify-center pt-0 gap-10 py-10">
        <h2
          className={`${lora.className} pt-5 text-3xl font-semibold md:text-4xl`}
        >
          · · C L I E N T E S · ·
        </h2>
        <Imagenes />
      </div>
    </>
  );
}
