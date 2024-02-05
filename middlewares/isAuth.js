const jwt = require('jsonwebtoken');
const secret = 'alfabeta';

function jwtVerify(req, res, next){
    //Obtener el token de la request
    const token = req.headers.authorization;

    if(!token){
        return res.status(400).send({
            ok: false,
            message:"No se proporciono un token"
        })
    }

    jwt.verify(token, secret, (error, payload)=>{
        // En esta funcion, marcamos 2 caminos.
        
        //El token es incorrecto, tiene un error entonces nosotros deberiamos cortar la request y devolver una respuesta o mensaje de error
        if(error){
            return res.status(401).send({
                ok:false,
                message: "No tienes autorizacion"
            })
        }

        //el otro camino es que el token sea correcto, entonces vamos a continuar con la ejecucion de la peticion y agregar el payload a la request
        req.user = payload.user;
        //Continuamos hacia el controlador(Funcion) correspondiente
        next();
    })

}


module.exports = jwtVerify;