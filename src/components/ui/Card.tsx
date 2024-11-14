import { CardData } from "@/util/types";
import Image from "next/image";

export function Card({ title, img }: CardData) {
  return (
    <div className="flex md:flex-col items-center justify-around">
      <div className="hidden md:block">
        <Image src={img} width={180} height={175} alt={title} />
      </div>
      <div className="md:hidden">
        <Image src={img} width={128.57} height={125} alt={title} />
      </div>
      <p className="text-2xl font-semibold">{title}</p>
    </div>
  );
}
