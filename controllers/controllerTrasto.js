import { response } from "express"

import { body } from "express-validator"
import { ModelTrasto } from "../models/0Trasto.js"
import { ModelLugar } from "../models/0lugar.js"

export{crearTrasto, obtenerTrastos, eliminarTrasto}


const crearTrasto = async (req, res = response)=>{

   // console.log(req.body, "ln16")

    const nombre = req.body.nombre.toUpperCase()
  //  console.log(nombre)
    
    //*Generar la informacion a guardar
    const data = {
    nombreTrasto: nombre,
    usuario: req.usuario._id
    }
  //  console.log(data, "ln26")
    //*Grabar en base de datos MongoCompass
    const trasto = new ModelTrasto(data)
   
    await trasto.save({new: true}) //me devuelve la data del TRASTO recien guardado con su id
    //console.log(trasto,req.body.idLugar,"trasto guardado")
// Extraigo ID del trasto
let idTrasto = trasto._id.toString()

//Llamo a la coleccion del lugares
const {objetosQueGuarda} = await ModelLugar.findById(req.body.idLugar)

//añado la id del Trasto en lugar donde guardo el objeto
objetosQueGuarda.push(idTrasto)

// Edito en la coleccion de LUGAR con el nuevo objeto.
let objetosQueGuardaActualizada = {objetosQueGuarda}
//console.log(objetosQueGuardaActualizada, "lo que guarda actualizado")
    // añado el objeto al lugar al que pertenece
const lugarActualizado = await ModelLugar.findByIdAndUpdate(req.body.idLugar, objetosQueGuardaActualizada, {new: true})
    //! Que me devuelva el ID que acabo de guardar

    res.status(201).json({
    msg: `Tu trasto "${nombre}" ha sido guardado`,
    })
    
}

const obtenerTrastos = async (req, res=response)=>{
    const query = {estado:true}
        const trastoArr =  await ModelTrasto.find(query)      
            res.json({
                trastoArr
            })
}

const eliminarTrasto = async (req, res=response)=>{
//console.log(req.body)
const idParaEliminar = req.body.id
const trastoElminado = await ModelTrasto.findByIdAndUpdate(req.body.id, {estado: false})
//borrar el trasto del arreglo del lugar.
    //pedir la coleccion de lugar los trastos que guarda
    const query = {estado:true}
    const lugarArr =  await ModelLugar.find(query)  
console.log(lugarArr)
lugarArr.forEach(lugar => {
    lugar.objetosQueGuarda.forEach( async trastoID => {
        if(trastoID===idParaEliminar){
            console.log(trastoID, "trasto que quiero borrar encontrado")
            console.log(lugar.id, "id del lugar que guarda el trasto")
            
            console.log(lugar.objetosQueGuarda, "arreglo objetos que guarda")

            const objetosQueGuardaActualizado = lugar.objetosQueGuarda.filter(idTrasto =>idTrasto!==idParaEliminar)

            let objetosQueGuardaActualizadoOBJ = {objetosQueGuarda:objetosQueGuardaActualizado}
            console.log(objetosQueGuardaActualizado, "actualizado")

            await ModelLugar.findByIdAndUpdate(lugar.id, objetosQueGuardaActualizadoOBJ)
            
           
        }
    });
    
});

//Eliminar el trasto de la coleccion de trastos
await ModelTrasto.findByIdAndUpdate(idParaEliminar, {estado:false}, {new:true} )
    res.json({msg:`El trasto ha sido borrado`})
   
    }