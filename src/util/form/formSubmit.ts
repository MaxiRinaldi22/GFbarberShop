import { collection, addDoc } from "firebase/firestore";
import { FormSubmitType } from "@/util/types";
import db from "../firestore";

const handleFormSubmit = async ({
  name,
  phone,
  mail,
  hora,
  tipo,
}: FormSubmitType) => {
  try {
    await addDoc(collection(db, "clientes"), {
      name: name,
      phone: phone,
      mail: mail,
      hora: hora,
      tipo: tipo,
    });
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
  }
};

export { handleFormSubmit };
