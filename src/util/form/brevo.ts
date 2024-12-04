import * as brevo from "@getbrevo/brevo";

const appiInstance = new brevo.TransactionalEmailsApi();

appiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.NEXT_PUBLIC_BREVO_API_KEY as string,
);

type Params = {
  to: { email: string; hora: string; name: string; tipo: string, phone: string }[];
};

export async function sendEmail({ to }: Params) {
  try {
    const day = to[0].hora.split(" - ")[0];
    const time = to[0].hora.split(" - ")[1];

    const stpmEmail = new brevo.SendSmtpEmail();
    const ownwerEmail = new brevo.SendSmtpEmail();

    stpmEmail.subject = "Confirmación de tu reserva";
    stpmEmail.to = to;
    stpmEmail.htmlContent = `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f7f7f7;
        margin: 0;
        padding: 0;
        
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 8px;
        overflow: hidden;
      }
      .header {
        max-width: 600px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
        color: white;
        padding: 20px 0;
      }
      .header img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        padding: 0 20px;
      }
      .header h1 {
       font-size: 12px;
        font-weight: 400;
        margin: 0;
      }
      .content {
        padding: 20px;
        font-size: 16px;
        line-height: 1.6;
        color: #333333;
      }
      .footer {
        text-align: center;
        padding: 10px;
        background-color: #eeeeee;
        font-size: 12px;
        color: #666666;
      }
      .button {
        display: inline-block;
        margin: 20px 0;
        padding: 10px 20px;
        background-color: #4caf50;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Cabecera -->
      <div class="header">
        <img src="https://www.gfbarberstudio.com/logoBW.png" alt="Logo GF Barber Studio"/>
      </div>
      <!-- Contenido principal -->
      <div class="content">
        <h1 style="font-size: x-large">¡Hola, ${to[0].name}!</h1>
        <p>
          Tu reserva ha sido registrada correctamente. Aquí tienes los detalles:
        </p>
        <ul>
          <li><strong>Fecha:</strong> ${day} </li>
          <li><strong>Hora:</strong> ${time} </li>
          <li><strong>Tipo:</strong> ${to[0].tipo}</li>
        </ul>
        <p>
          Si hay algún error en esta información o necesitas realizar un cambio,
          por favor contáctanos al <strong>(+598) 099 250 338</strong> lo antes
          posible.
        </p>
        <p>¡Gracias por elegirnos!</p>
      </div>
      <!-- Pie de página -->
      <div class="footer">
        <p>&copy; 2024 GF Barber Studio | Todos los derechos reservados.</p>
      </div>
    </div>
  </body>
</html>
`;

    ownwerEmail.subject = "Nuevo turno registrado";
    ownwerEmail.to = [
      { email: "gfbarberstudio13@gmail.com", name: "GF Barber Studio" },
    ];
    ownwerEmail.htmlContent = `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f7f7f7;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 8px;
        overflow: hidden;
      }
      .content {
        padding: 20px;
        font-size: 16px;
        line-height: 1.6;
        color: #333333;
      }
      .footer {
        text-align: center;
        padding: 10px;
        background-color: #eeeeee;
        font-size: 12px;
        color: #666666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="content">
        <h1>¡Nuevo turno registrado!</h1>
        <p>Se ha registrado un nuevo turno con los siguientes detalles:</p>
        <ul>
          <li><strong>Cliente:</strong> ${to[0].name}</li>
          <li><strong>Fecha:</strong> ${day}</li>
          <li><strong>Hora:</strong> ${time}</li>
          <li><strong>Tipo:</strong> ${to[0].tipo}</li>
          <li><strong>Email:</strong> ${to[0].email}</li>
          <li><strong>Telefono:</strong> ${to[0].phone}</li>
        </ul>
      </div>
      <div class="footer">
        <p>&copy; 2024 GF Barber Studio</p>
      </div>
    </div>
  </body>
</html>`;

    stpmEmail.sender = {
      name: "GF Barber Studio",
      email: "no-reply@gfbarberstudio.com",
    };

    await appiInstance.sendTransacEmail(stpmEmail);

    ownwerEmail.sender = {
      name: "GF Barber Studio",
      email: "no-reply@gfbarberstudio.com",
    };

    await appiInstance.sendTransacEmail(ownwerEmail);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
}
