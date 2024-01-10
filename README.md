Esta app consiste en tener un registro de todo los trastos que guardamos en casa o en nuestro trastero y que no usamos de manera habitual. 

El propósito era hacer una app muy sencilla con el objetivo principal de tener un mapa completo de todo lo necesario para desplegar una aplicación y asi poner en práctica los conocimientos adquiridos en los distintos cursos que he realizado.

La aplicación se compone de una parte pública que sirve como interfaz para el usuario. Se ha desarrollado exclusivamente con HTML, CSS y JS, apoyándome 
en bootstrap para dar estilo a algunos elementos. Todo el contenido se encuentra en la carpeta "public".
Para el desarrollo del código se hace uso de clases y funciones asíncronas. Las peticiones al backend se realizan por medio de la herramienta "FETCH"
Algunos parámetros se mantienen persistentes por el uso de localStorage.

Para el desarrollo del backend se hace uso de NODE.JS y varios paquetes npm que permiten simplicidad en el código, como por ejemplo:
  *express:  simplifica la gestión de las peticiones y respuestas HTTP, enrutamiento y middlewares.
  *jsonwebtoken: que me permite generar claves temporales para los usuarios que ingresan a la app, además de su verificación.
  *dotenv: para gestionar las variables de entorno del proyecto.

Respecto al backend, el punto de partida se encuentra en el archivo models/server.js que nos permite servir el frontEnd dispuesto en la carpeta "public",
así como gestionar las distintas peticiones http(get,post,put,delete) para las distintas rutas.

El paso dos del backend pasa por la carpeta "/routes", donde se invocan distintas funciones en base al tipo de petición y la ruta desde la que se solicita la petición.
En este punto se añaden los middlewares que me permite controlar peticiones incompletas, erróneas o no autorizadas.

El último paso estaría en la carpeta "/controllers" donde se gestiona la información recibida en la petición para posteriormente dar una respuesta desde el backend al frontend.

La aplicación se encuentra conectada en la parte del backend con una base de datos ubicada en MongoDB, la gestión de la información estructuración de datos y conexión a la propia base de datos se realiza mediante el npm de moongose.
*mongoose: me permite la conexión con la base de datos, además de estructurar la base de datos mediante las herramientas de Schema, model propias de mongoose.

Por ultimo en la carpeta public tenemos los archivos sw.js y manifest.json, que mediante la instalación de un service worker hace que la página web sea instalable
convirtiendola en una Progressive Web Aplication (PWA).
