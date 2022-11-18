const jwt = require('jsonwebtoken');

const validarJWT = ( req, res, next ) => {

    // LEER TOKEN
    const token = req.header('x-token');

    // SE RECIBIO UN TOKEN?
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    // VALIDAMOS EL TOKEN
    try {

        const {uid} = jwt.verify( token, process.env.JWT_KEY );
        req.uid = uid;

        next();

    } catch (error) {

        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });

    }
    
};

module.exports = {
    validarJWT
};