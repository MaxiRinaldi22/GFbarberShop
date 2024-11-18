"use server";

import { FormSubmitType } from "../types";
import { sendEmail } from "./brevo";
import { handleFormSubmit } from "./formSubmit";

type submitData = {
  formData: FormSubmitType;
};

export const handleSubmit = async ({ formData }: submitData) => {
  const { name, phone, mail, hora, tipo } = formData;

  handleFormSubmit({
    name,
    phone,
    mail,
    hora,
    tipo,
  });

  await sendEmail({
    to: [
      {
        email: mail as string,
        hora: hora as string,
        name: name as string,
        tipo: tipo as string,
      },
    ],
  });
};
