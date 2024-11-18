import { StaticImageData } from "next/image";

export type AdminContextType = {
  admin: boolean | null;
  setAdmin: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export type CardData = {
  title: string;
  img: StaticImageData;
  id: number
}

export type FormSubmitType = {
  name: string;
  phone: string;
  mail: string
  hora: string;
  tipo: "" | "corte" | "mecha" | "color";
}