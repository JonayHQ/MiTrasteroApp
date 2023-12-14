
import { request, response } from 'express'
import jwt from 'jsonwebtoken'
import { Modelo } from '../models/usuarios.js' 
import { header } from 'express-validator'

export {validarJWT}

const validarJWT = async (req= request, res=response, next)=>{

const token = req.header("x-token")

//console.log(req.header("x-token"))

if (!token){
return res.status(404).json("No hay token en la peticion")
}

try {
    const { uid } = jwt.verify(token, process.env.PRIVATEKEY)

    const usuario = await Modelo.findById( uid ) 

    if(!usuario){
        return res.status(401).json({
            msg: "Token no valido - usuario no existe en BaseDatos"
        })
    }

    //Verificar si el estado esta en true
    if(!usuario.estado){
        return res.status(401).json({
            msg: "Token no valido - usuario de baja de la BaseDatos"
        })

    }

    req.usuario = usuario
    next()
} catch (error) {
    console.log(error);
    res.status(401).json({
        msg: "Token no válido"
    })
}

//console.log("Token:",token)

}