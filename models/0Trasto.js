import {Schema, model} from 'mongoose'

export {ModelTrasto}

const TrastoSchema = Schema({
    nombreTrasto: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    lugarDondeEsta:{
        type: String
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
    }
})

const ModelTrasto = model('Trasto', TrastoSchema)