import jwt from 'jsonwebtoken'
import {Modelo} from '../models/usuarios.js'

export {generarJWT, comprobarJWT}

const generarJWT = (uid="") => {


    return new Promise( (resolve, reject) => {

        const payload = {uid}

        //intruccion generar jsonwebtoken
        jwt.sign(payload, process.env.PRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token)=>{
            if(err){
                console.log(err)
                reject("No se pudo generar el token")
            }else{
                resolve(token)
            }
        })

    })

}

const comprobarJWT = async (token="")=>{

try {
    if(token.length<10){
        return null
    }

    const {uid} = jwt.verify(token, process.env.PRIVATEKEY)

    const usuario  = await Modelo.findById(uid)

    if(usuario && usuario.estado){
        return usuario
    }else{
        return null
    }

} catch (error) {
    return null
}


}