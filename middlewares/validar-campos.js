export {validarCampos}

import {validationResult} from "express-validator" 


    //Express validator(middleware) acumula los errores en esta constante, si tras verificar..
    //...me sale la constante vacia es que no hubo errores de validacion

const validarCampos = (req, res, next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }
    
    next()

}