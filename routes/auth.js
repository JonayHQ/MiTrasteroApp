import {Router} from 'express'
import {check} from 'express-validator'

import { validarCampos, validarJWT } from '../middlewares/index.js';

import { login, googleSign, reautenticarToken } from '../controllers/auth.js';

export { routerAuth }

const routerAuth = Router();

routerAuth.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );

routerAuth.post('/google',[
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSign );

routerAuth.get('/', validarJWT, reautenticarToken );



