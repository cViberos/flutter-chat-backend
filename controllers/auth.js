const {response} = require('express');
const Bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/jwt');

const crearUsuario = async(req, res = response ) => {

  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email: email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya esta registrado'
      })
    }

    const usuario = new Usuario( req.body );

    // GENERAR MI JWT
    const token = await generarJWT( usuario.id );

    // ENCRIPTAR CONTRASEÑA
    var salt = Bcrypt.genSaltSync();
    usuario.password = Bcrypt.hashSync( password, salt);

    // GRABAR EN LA BASE DE DATOS
    await usuario.save();

    // Responder en formato json al usuario
    res.json({
      ok: true,
      usuario,
      token
    });

  } catch (error) {
    
    console.log(error);
    return res.status(500).json({
      ok:false,
      msg: 'Hable con el administrador'
    })

  }

};

const login = async(req, res = response) => {

  const { email, password } = req.body;

  try {
    
    // EXTRAER USUARIO SEGUN EL EMAIL
    const usuariosDB = await Usuario.findOne({ email: email });
    if (!usuariosDB) {
      return res.status(400).json({
        ok: false,
        msj: 'Email no encontrado'
      });
    };

    // VALIDAR PASSWORD
    const validarPassword = Bcrypt.compareSync( password, usuariosDB.password );
    if (!validarPassword) {
      return res.status(400).json({
        ok: false,
        msj: 'La contraseña no es valida'
      });
    };

    // GENERAR EL JWT
    const token = await generarJWT( usuariosDB.id );

    // RESPUESTA AL CLIENTE
    res.json({
      ok: true,
      usuario: usuariosDB,
      token
    });

  } catch (error) {
    
    // MENSAJE DE ERROR PARA EL CLIENTE
    console.log(error);
    return res.status(500).json({
      ok:false,
      msg: 'Hable con el administrador'
    })

  }
};

const renewToken = async( req, res = response) => {

  const uid = req.uid;
  const token = await generarJWT( id );
  const usuario = await Usuario.findById( uid );

  res.json({
      ok: true,
      usuario,
      token
  });
};

module.exports = {
  crearUsuario,
  login,
  renewToken
};