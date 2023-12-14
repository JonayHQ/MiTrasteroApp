import { response } from "express"
import bcryptjs from "bcryptjs";
import { Modelo } from "../models/usuarios.js"
import { generarJWT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";


export {login, googleSign, reautenticarToken}


const login =  async(req, res = response)=>{
    
    const {correo, password} = req.body
//console.log(correo)
try {
    
    //*verificar si el email existe
const usuario = await Modelo.findOne({correo})
    if (!usuario){
    return res.status(400).json({
        msg: 'Usuario / Password nos son correctos - correo'
    })
    }

    //*si el usuario esta activo
    if (usuario.estado===false){
    return res.status(400).json({
        msg: 'Usuario / Password nos son correctos - Estado:false'
    })
    }
    //verificar la contraseña
const validPassword = bcryptjs.compareSync(password, usuario.password)
    if (!validPassword){
        return res.status(400).json({
            msg: 'Usuario / Password nos son correctos - Password no es correcto'
        })

    }

    //Generar JWT
    const token = await generarJWT(usuario.id)

    res.json({
        usuario,
        token        
    })

} catch (error) {
    console.log(error)
    return res.status(500).json({
        msg: "Hable con el administrador"
    })
}

   
}

const googleSign = async (req,res=response)=>{

        const {id_token} = req.body
try {

    const googleUser = await googleVerify(id_token)
    const {nombre, correo, foto} = googleUser
    let usuario = await Modelo.findOne({correo})

    //Si no existe en nuestra base de datos le pido datos
    if(!usuario){
        const data = {
            nombre,
            correo,
            password: ":P",
            foto,
            rol: "USER_ROLE",
            google:true

        }

        usuario = new Modelo(data)
        await usuario.save()


    }

    if(!usuario.estado){
        return res.status(401).json({
            msg: "Hable con el administrador, usuario bloqueado"
        })
    }

    //Generar JWT
    const token = await generarJWT(usuario.id)


    res.json({
        msg: "Recibe bien el token de google",
        usuario,
        token    
    })


} catch (error) {
    res.status(400).json({
        msg: "El token de google no se pudo verificar"
    })

}


}

const reautenticarToken = async (req, res=response)=>{

const {usuario} = req

const token = await generarJWT(usuario.id)

res.json({usuario, token})

}