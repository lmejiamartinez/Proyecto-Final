require('dotenv').config();
const nodemailer = require('nodemailer');

console.log("EMAIL:", process.env.EMAIL_USER);
console.log("PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Error de conexión:", error.message);
  } else {
    console.log("✅ Conexión exitosa con Gmail. Transporter funcionando.");
  }
});

transporter.sendMail({
  from: `"Sistema SENA" <${process.env.EMAIL_USER}>`,
  to: "tu-correo-personal@gmail.com", // prueba con un correo tuyo
  subject: "Prueba de conexión",
  html: "<p>Este es un correo de prueba desde tu backend 🎉</p>",
}, (err, info) => {
  if (err) {
    console.error("❌ Error al enviar:", err.message);
  } else {
    console.log("✅ Correo enviado:", info.response);
  }
});
