import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

// Configuración del transportador de correo con las credenciales
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    secure: false, // Se establece como 'false' para usar TLS
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // Desactiva la validación estricta de certificados
    },
  });

// Función para enviar un correo de prueba
async function sendTestEmail() {
  const mailOptions = {
    from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
    to: 'jesus_aranda_rdz@hotmail.com', // Cambia a la dirección de correo donde quieres recibir el correo de prueba
    subject: 'Correo de prueba',
    text: 'Este es un correo de prueba enviado desde Nodemailer.',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo de prueba enviado:', info.response);
  } catch (error) {
    console.log('Error al enviar el correo:', error);
  }
}

// Llamar a la función para enviar el correo de prueba
sendTestEmail();
