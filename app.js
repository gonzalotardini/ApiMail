const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Importar cors
require('dotenv').config();

const app = express();

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de CORS
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://giovanelli-tardini-web.vercel.app', // Tu dominio de producción
      'http://localhost:8080' // Origen de desarrollo
    ];
    if (allowedOrigins.includes(origin) || !origin) { // Permitir orígenes de la lista y solicitudes sin origen (como desde Postman)
      callback(null, true);
    } else {
      callback(new Error('No autorizado por CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'], // Añadir 'OPTIONS'
  allowedHeaders: ['Content-Type']
}));

// Manejar solicitudes OPTIONS para CORS
app.options('*', cors());

// Configuración del transporte de correo electrónico (Nodemailer)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Ruta para el envío de correos electrónicos
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }

    res.status(200).send('Correo electrónico enviado: ' + info.response);
  });
});

// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});