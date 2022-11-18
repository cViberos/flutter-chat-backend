const express = require('express');
const path = require('path');
require('dotenv').config();

// DB CONFIG metodo 1
// const {dbConnection} = require('./database/config');
// dbConnection();

// DB CONFIG metodo 2
require('./database/config').dbConnection();

// APP DE EXPRESS
const app = express();

// LECTURA Y PARSEO DEL BODY
app.use( express.json() );


// SERVIDOR DE SOCKETS
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Path público
const publicPath = path.resolve(__dirname, 'public');
// Usamos la carpeta publica
app.use( express.static(publicPath) );


// MIS RUTAS
app.use( '/api/login', require('./routes/auth') );


// Corremos el servidor
server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);

  console.log('Servidor corriendo en puerto!!!', process.env.PORT);
})