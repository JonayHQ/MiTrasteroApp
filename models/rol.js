
import {Schema, model} from 'mongoose'

export {ModelRole}


const RolSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
})

const ModelRole = model('Rol', RolSchema)