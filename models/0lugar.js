import {Schema, model} from 'mongoose'

export {ModelLugar}

const LugarSchema = Schema({
    nombreLugar: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    objetosQueGuarda:{
        type: Array,
        default: ["vacio"]
    },
    lugarDondeEsta:{
        type: String,
        default: "general"
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,

    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    descripcion:{
        type: String
    },
    img: {
        type: String,
    },
    
})

const ModelLugar = model('Lugar', LugarSchema)
