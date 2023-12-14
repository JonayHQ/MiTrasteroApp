
import { ModelRole } from '../models/rol.js';
import { Modelo } from '../models/usuarios.js';

export { esRolValido, emailDuplicado, existeUsuarioPorId, coleccionesPermitidas }

const esRolValido = async (rol="")=>{
    const existeRol = await ModelRole.findOne({rol}) // Aqui esta buscando en la coleccion de la MongoDB
    if(!existeRol){
        throw new Error(`El rol ${rol} no es valido`)
    }
   }

const emailDuplicado = async (correo="")=>{
const existeEmail = await Modelo.findOne({correo})
if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado`)
}
}

const existeUsuarioPorId = async (id="")=>{
    const existeUsuarioId = await Modelo.findById(id)
    if (!existeUsuarioId) {
            throw new Error(`El id ${id} no existe`)
    }
    }

const coleccionesPermitidas = async (coleccion='', colecciones = [])=>{

const incluida = colecciones.includes(coleccion)
if(!incluida){

throw new Error(`La ${coleccion} no esta incluida en las colecciones permitidas ${colecciones}`);
}

return true

}