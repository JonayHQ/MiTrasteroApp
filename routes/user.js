import {Router} from 'express'
import {check} from 'express-validator'
import { usuariosGet, usuariosPost, usuariosPatch, usuariosDelete, usuariosPut } from '../controllers/user.js'
/*
import { validarCampos } from "../middlewares/validar-campos.js"; 
import { validarJWT } from "../middlewares/validar-jwt.js"; 
import { esAdminRole } from '../middlewares/validar-roles.js'; 
import { tieneRol } from '../middlewares/validar-roles.js';
*/
//*esta linea de abajo sustituye todo el codigo de arriba
import { validarCampos, validarJWT, esAdminRole, tieneRol} from '../middlewares/index.js';
import { emailDuplicado, esRolValido, existeUsuarioPorId } from '../helpers/db-validators.js';

export { router }

const router = Router()

router.get('/', usuariosGet)
router.put('/:id', [
    check('id', "No es un id valido").isMongoId(),
    check('id', "No es un id valido").custom(existeUsuarioPorId),
    check('rol').custom(esRolValido//...es igual a (rol)=>esRolValido(rol)),
    ),
    validarCampos
],usuariosPut)


router.post('/', [
    check('password', "La contraseña tiene que tener minimo 6 caracteres").isLength({min: 6}), 
    check('nombre', "El nombre es obligatorio").notEmpty(),
    check('correo', "El correo no es valido").isEmail(),
    check('correo').custom(emailDuplicado),
   // check('rol', "No es un rol válido").isIn(['ADMIN_ROLE','USER_ROLE']),  //Esto no se valida asi. Se crea una lista de perfiles....
   //...en mongo compass para usarlo de referencia.
    check('rol').custom(esRolValido//...es igual a (rol)=>esRolValido(rol)),
    ),
    validarCampos
   // aqui añado los middelwares que necesito para controlar el paso a la ruta
],usuariosPost)

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRol('USER_ROLE', 'ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', "No es un id valido").isMongoId(),
    check('id', "No es un id valido").custom(existeUsuarioPorId)
],usuariosDelete)




