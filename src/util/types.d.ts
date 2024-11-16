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