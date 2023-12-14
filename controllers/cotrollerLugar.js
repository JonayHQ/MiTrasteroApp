import { response } from "express"

import { Modelo } from "../models/usuarios.js"
import { body } from "express-validator"
import { ModelLugar } from "../models/0lugar.js"
import { UI } from "../models/0UI.js" 

export{crearLugar, obtenerLugares,eliminarLugar, editarLugar}

//algo
const crearLugar = async (req, res = response)=>{

    console.log(req.body)

    const nombre = req.body.nombre.toUpperCase()
    console.log(nombre)
    const lugarDb = await ModelLugar.findOne({nombreLugar:nombre})
    
    if(lugarDb){
        return res.status(400).json({
            msg: `El lugar ${nombre}, ya existe`
        })
        }
    
    //*Generar la informacion a guardar
    const data = {
    nombreLugar: nombre,
    usuario: req.usuario._id,
    lugarDondeEsta: req.body.lugarDondeEsta
    }
    console.log(data)
    //*Grabar en base de datos MongoCompass
    const lugar = new ModelLugar(data)
    
    await lugar.save()
    
    res.status(201).json({
    msg: `El nuevo lugar "${nombre}" ha sido guardado`

    })
    
    }


const obtenerLugares = async (req, res=response)=>{
    
        const query = {estado:true}
        
        //*Lo pongo dentro de una promesa para que se ejecuten a la vez y sea mas rapido
        //const respuesta = await Promise.all([
        const lugarArr =  await ModelLugar.find(query)      

            res.json({
                lugarArr
            })
        
        
        }

const eliminarLugar = async (req, res=response)=>{
    const lugarElminado = await ModelLugar.findByIdAndUpdate(req.body.id, {estado: false}, {new:true})
    res.json({msg:`El trasto ha sido borrado`})
    }

const editarLugar = async (req, res=response)=>{
    console.log(req.body)
    const nombre = req.body.nombreLugar.toUpperCase()
    const lugarDb = await ModelLugar.findOne({nombreLugar:nombre})
    
    if(lugarDb){
        return res.status(400).json({
            msg: `El lugar ${nombre}, ya existe`
        })
        }
    const lugarEditado= await ModelLugar.findByIdAndUpdate(req.body.id, {nombreLugar: nombre}, {new:true})
    res.json({msg:`El nombre ha sido modificado`})
    }

const obtenerUnProducto = async (req, res=response)=>{

    const {id} = req.params
    
    const producto = await ModelProducto.findById(id)
        .populate('Usuario','nombre')
    
        res.json(producto)
    
    }

const actualizarProducto = async (req, res=response)=>{

    const {id} = req.params
    const {estado, usuario, ...data} = req.body
    const query = {estado:true}
    
    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id;
    
  

    const [producto, categoria] = await Promise.all([
        ModelProducto.findByIdAndUpdate(id, data, {new: true}),
        ModelProducto.find(query)
            .populate('categoria','nombre')
        ]
    )
    
    res.json({producto,categoria})
    
    }


const borrarProducto = async (req, res=response)=>{

    const {id} = req.params
    
    const productoBorrado = await ModelProducto.findByIdAndUpdate(id, {estado:false}, {new:true} )
    
    res.json(`El producto ${productoBorrado.nombre} ha sido borrado`)

    }
    