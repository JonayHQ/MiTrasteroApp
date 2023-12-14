import { request, response } from "express"
import { Modelo } from "../models/usuarios.js"
import bcryptjs from "bcryptjs";

export {usuariosGet, usuariosPost, usuariosPatch, usuariosDelete, usuariosPut}

const usuariosGet = async (req=request, res = response)=>{

   // const {q, nombre = "No name", apiKey} = req.query
const {limite=5, desde = 0} = req.query
const query = {estado:true}
/*    
const usuarios = await Modelo.find(query)
    .skip(Number(desde))
    .limit(Number(limite))

const total= await Modelo.countDocuments(query)
*/

//*Lo pongo dentro de una promesa para que se ejecuten a la vez y sea mas rapido
//const respuesta = await Promise.all([
const [total, usuarios] = await Promise.all([
    Modelo.countDocuments(query),
    Modelo.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]
)

    res.json({
        total,
        usuarios
    })
}

const usuariosPut = async (req, res)=>{

const  {id} = req.params
const {_id,password,google, correo, ...resto} = req.body

// Validar base datos
if(password){
    const salt = bcryptjs.genSaltSync(10)
    resto.password = bcryptjs.hashSync(password, salt) 

}

const usuario = await Modelo.findByIdAndUpdate(id, resto, {new:true})

    res.json(usuario)
}

const usuariosPost = async (req, res)=>{

const {nombre,correo,password, rol} = req.body
const usuario = new Modelo({nombre,correo,password, rol})

//Encritar contraseña
const salt = bcryptjs.genSaltSync(10)
usuario.password = bcryptjs.hashSync(password.toString(), salt) 
//tengo que ponerle el string porque el tipo de dato que configure es un string

//para grabar registro de usuario
await usuario.save()

    res.json({
        usuario
    })
}


const usuariosDelete = async (req, res)=>{
    
    const {id} = req.params

    const uid = req.uid
  
    //!Esta no es la mejor manera de borrar porque borra fisicamente el usuario.
    //const usuarioBorrado = await Modelo.findByIdAndDelete(id)

    //* Manera mas recomendada
    const usuarioBorrado = await Modelo.findByIdAndUpdate(id, {estado: false})
    const usuarioAutenticado = req.usuario

    res.json({
        usuarioBorrado,
        usuarioAutenticado, 
        msg:`El usuario ${usuarioBorrado.nombre} ha sido borrado por ${usuarioAutenticado.nombre}`
    }) 
}


const usuariosPatch = (req, res)=>{
    res.json({
        msg: "patch API- desde controlador"
    })
}