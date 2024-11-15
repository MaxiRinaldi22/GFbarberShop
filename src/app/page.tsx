import { Hero } from "@/components/Hero";
import { Card } from "@/components/ui/Card";
import { Imagenes } from "@/components/ui/Imagenes";
import { CARD_ITEMS } from "@/util/const";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="flex w-full flex-col px-10 py-5 md:h-[40vh] md:flex-row md:items-center md:justify-center md:gap-24">
        {CARD_ITEMS.map((item) => (
          <Card key={item.title} title={item.title} img={item.img} />
        ))}
      </section>
      <Imagenes />
      <section className="h-[10vh]"></section>
    </>
  );
}
