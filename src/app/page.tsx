import { Hero } from "@/components/Hero";
import { Card } from "@/components/ui/Card";
import { Imagenes } from "@/components/ui/Imagenes";
import { CARD_ITEMS } from "@/util/const";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="px-10 py-5 flex flex-col md:flex-row w-full md:justify-center md:items-center md:gap-24 md:h-[40vh]"> 
        {CARD_ITEMS.map((item) => (
          <Card key={item.title} title={item.title} img={item.img} />
        ))}
      </section>
      <Imagenes />
      <section className="h-[10vh]"></section>
    </>
  );
}
