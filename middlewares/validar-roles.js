import {request, response} from 'express'

export {esAdminRole, tieneRol}

const esAdminRole = (req= request, res= response, next)=>{

//*como es una middleware ubicado tras la validacion jwt, ya tengo el dato de los usuarios
    //aqui solo verifico que el dato existe y no esta undefined
    if(!req.usuario){
        return res.status(500).json({
            msg: "Se quiere verificar el role sin validar el token primero"
        })
    }

    const{rol, nombre} = req.usuario

    if(rol !== "ADMIN_ROLE"){
        return res.status(401).json({
            msg: `${nombre} no es administrador, no puede ejecutar esta orden`
        })
    }

next()
}


const tieneRol = (...roles)=>{

    return (req, res= response, next)=>{
        if(!req.usuario){
            return res.status(500).json({
                msg: "Se quiere verificar el role sin validar el token primero"
            })
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `${req.usuario.rol} este rol no es válido`
            })
        }
        next()
    }
    }