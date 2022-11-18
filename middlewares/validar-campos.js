const { validationResult } = require("express-validator");

const validarCampos = (req,res,next) => {

  /**
   * IMPORTANTE: cada vez que usamos un middleware tenemos que ejecutar una instrucción callback
   * llamado next para indicar que tenemos que movernos al siguiente middleware o al manejador o
   * al controllador de la ruta.
   */

  const errores = validationResult(req);
  if ( !errores.isEmpty() ) {
    return res.status(400).json({
      ok: false,
      // mapped() muestra un mapa completo de los errores
      errors: errores.mapped()
    })
  };

  next();
}

module.exports = {
  validarCampos
}