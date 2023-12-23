import { response } from "express"

import { Modelo } from "../models/usuarios.js"
import { body } from "express-validator"
import { ModelLugar } from "../models/0lugar.js"
import { UI } from "../models/0UI.js" 
import { ModelTrasto } from "../models/0trasto.js"

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
    //borrar todos los trastos guardados del lugar.
    //pedir la coleccion de lugar los trastos que guarda
    const lugarArr =  await ModelLugar.find({estado:true}) 
    const trastosArr =  await ModelLugar.find({estado:true}) 
    const datosLugarEliminado = await ModelLugar.findById(req.body.id)

    console.log(req.body, "req.body")

if(datosLugarEliminado.lugarDondeEsta==="general"){
    lugarArr.forEach(async lugar => {
        //?Busca lugares hijos
        if(req.body.id===lugar.lugarDondeEsta){
            //?VACIA DE OBJETOS LOS SUBLUGARES   
            lugar.objetosQueGuarda.forEach( async trastoID => {
                if(trastoID!=="vacio"){
                    await ModelTrasto.findByIdAndDelete(trastoID)
                    //await ModelLugar.findByIdAndUpdate(lugar.id, {objetosQueGuarda:arrayTrastosVacio})
                }      
            })
            //?ELimina el sublugar
            await ModelLugar.findByIdAndDelete(lugar.id)
        }
    })
}else{ //Eliminar sublugar directamente
    lugarArr.forEach(async lugar => {
        //?Busca lugares hijos
        if(req.body.id===lugar.id){
            //?VACIA DE OBJETOS del LUGAR
            lugar.objetosQueGuarda.forEach( async trastoID => {
                if(trastoID!=="vacio"){
                    await ModelTrasto.findByIdAndDelete(trastoID)
                    //await ModelLugar.findByIdAndUpdate(lugar.id, {objetosQueGuarda:arrayTrastosVacio})
                }
            })
        }
    })
}

//?Elimina el lugar seleccionado
const lugarElminado = await ModelLugar.findByIdAndDelete(req.body.id)

    res.json({msg:`El lugar ha sido borrado`})
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


    