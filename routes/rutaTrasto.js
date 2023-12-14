import {Router} from 'express'
import {check} from 'express-validator'

import { validarCampos, validarJWT, esAdminRole, tieneRol} from '../middlewares/index.js';

export { routerTrasto }

const routerTrasto = Router()


import { crearTrasto, obtenerTrastos, eliminarTrasto} from '../controllers/controllerTrasto.js';

//* Crear una producto - Privado - cualquier con token valido 
routerTrasto.post('/', [
    validarJWT,
    check('nombre', "El nombre es obligatorio").notEmpty(),
    validarCampos
], crearTrasto)


//* Obtener todas las categorias - Publico
routerTrasto.get('/', obtenerTrastos)

routerTrasto.put('/',[
    validarJWT,
    //check('id', "No es una id de mongo válido").isMongoId(),
    //check('id').custom(existeProducto),
    //check('nombre', "El nombre es obligatorio").notEmpty(),
    validarCampos,
], eliminarTrasto)


/*

//* Obtener una categoria - Publico
routerProductos.get('/:id',[
    validarJWT,
    check('id', "No es una id de mongo válido").isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
    
], 
obtenerUnProducto)


//* Actualizar una categoria - Privado - cualquier con token valido 
routerProductos.put('/:id',[
    validarJWT,
    check('id', "No es una id de mongo válido").isMongoId(),
    check('id').custom(existeProducto),
    check('nombre', "El nombre es obligatorio").notEmpty(),
    validarCampos,
], actualizarProducto)




*/