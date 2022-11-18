const mongoose = require('mongoose');

const dbConnection = async() => {
  try {

    // Promesa o como future
    mongoose.connect(process.env.DB_CNN);
    console.log('DB online');

  } catch (error) {

    console.log(error);
    throw new Error('Error en la base de datos, por favor hable con el admin');

  }
}

module.exports = {
  dbConnection
}