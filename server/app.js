// import express from 'express';
// import cors from 'cors'; // Importar el paquete cors
// import bodyParser from 'body-parser'; // Importar el paquete body-parser
// import nodemailer from 'nodemailer';
const express = require ('express')
const cors = require ('cors')
const bodyParser = require ('body-parser')
const nodemailer = require ('nodemailer')


const app = express();

// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar opciones de cors
// const corsOptions = {
//   origin: 'http://localhost:5173', // Reemplazar con el origen de tu aplicación de React
//   optionsSuccessStatus: 200 // Opcional
// };

const corsOptions = {
  origin: 'https://wedev-sj.netlify.app',
  optionsSuccessStatus: 200
};


// Habilitar CORS para todas las rutas
app.use(cors(corsOptions));

// Configura el middleware para procesar datos JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Maneja la solicitud de tu formulario y envía el correo electrónico
app.post('/enviar-correo', (req, res) => {
  const { nombre, email, mensaje } = req.body;

  // Aquí puedes usar una librería de envío de correos electrónicos, como Nodemailer,
  // para enviar el correo electrónico con los datos del formulario
  // Por ejemplo:
  // const nodemailer = require('nodemailer');
  // import nodemailer from 'nodemailer';


  // Configura el transporte de correo electrónico
  const transporter = nodemailer.createTransport({
    // Configura la información de tu proveedor de correo electrónico
    // Por ejemplo, para usar el servicio de correo electrónico de Gmail:
    service: 'gmail',
    auth: {
      user: 'michvirh@gmail.com',
      // user: 'securesally@gmail.com',
      pass: 'grasmrzpnapdbmii',
    },
  });

  // Configura el contenido del correo electrónico
  const mailOptions = {
    from: 'virhuezmichael@gmail.com',
    to: 'michvirh@gmail.com',
    subject: 'Formulario de contacto',
    html: `
      <h1>Formulario de contacto</h1>
      <p>Nombre: ${nombre}</p>
      <p>Email: ${email}</p>
      <p>Mensaje: ${mensaje}</p>
    `,
  };

  // Envía el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al enviar el correo electrónico');
    } else {
      console.log(`Correo electrónico enviado: ${info.response}`);
      res.status(200).send('Correo electrónico enviado exitosamente');
    }
  });
});

// Inicia el servidor en el puerto que prefieras
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Servidor Node.js iniciado en el puerto ${port}`);
// });

app.set('port', process.env.PORT || 3000); // Configuro puerto de servidor

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`)
})
