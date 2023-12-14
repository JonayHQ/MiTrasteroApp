import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import { createServer } from 'http';
import { Server } from 'socket.io'


import { routerLugar } from '../routes/rutaLugar.js';
import { router } from '../routes/user.js'
import { routerAuth } from '../routes/auth.js'
import { dbConnection } from '../database/config.js'
import { routerTrasto } from '../routes/rutaTrasto.js';

export {Servidor}

class Servidor {

constructor()  {
    this.app = express()
    this.port = process.env.PORT
    this.server = createServer(this.app);
    this.io = new Server(this.server); 

    this.paths = {
        auth:       '/api/auth',
        usuarios:   '/api/usuarios',
        trasto:     '/api/trasto',
        lugar:      '/api/lugar'

    }
/* Estas dos lineas son sustituidas por las de arriba
    this.usuariosPath = '/api/usuarios'
    this.authPath ='/api/auth'
*/
    //Conectar a base de datos
    this.conectarDB()
    //Middlewares
    this.middlewares()
    //Rutas de mi aplicacion
    this.routes()

    this.sockets()
}

async conectarDB(){
    await dbConnection()
}

middlewares(){
    //CORS
    this.app.use( cors() )
    //Lectura y parseo del body
    this.app.use(express.json())
    //Directorior publico
    this.app.use(express.static('public'))

    //carga de archivos
    this.app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/',
        createParentPath: true
    }));

}

routes(){
    this.app.use(this.paths.lugar, routerLugar)
    this.app.use(this.paths.trasto, routerTrasto)
    this.app.use(this.paths.auth, routerAuth)
    this.app.use(this.paths.usuarios, router)
}

sockets(){

   // this.io.on('connection', socket =>socketController(socket,this.io))
}

listen(){
    this.server.listen(this.port, ()=>{
        console.log("servidor corriendo en puerto", this.port)
    })
}

}