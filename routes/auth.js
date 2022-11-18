/**
 * path: /api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario,login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// NUEVO USUARIO
router.post( '/new', [
  // Middlewars como validación de seguridad
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  check('password','La contraseña es obligatoria').not().isEmpty(),
  check('email','El email es obligatorio').isEmail(),
  validarCampos
] ,crearUsuario);

// LOGIN
router.post( '/', [
  check('password','La contraseña es obligatoria').not().isEmpty(),
  check('email','El email es obligatorio').isEmail()
] ,login);

// RENOVAR JWT
router.get( '/renew', validarJWT, renewToken);


module.exports = router;