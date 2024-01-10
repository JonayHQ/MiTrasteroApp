Esta app consiste en tener un registro de todo los trastos que guardamos en casa o en nuestro trastero y que no usamos de manera habitual. 

El propósito de hacer esta app ha sido el practicar lo aprendido y además poner en producción una app desde cero,
de esta manera tener un mapa completo de todo lo necesario para alcanzar este objetivo.
La aplicación se compone de una parte pública que sirve con interfaz para el usuario. Se ha desarrollado haciendo uso exclusivamente de HTML, CSS y JS, apoyándome 
en bootstrap para dar estilo a algunos elementos. Todo el contenido se encuentra en la carpeta "public".
 Para el desarrollo del código se hace uso de clases y funciones asíncronas. Las peticiones al backend se realizan usando la "FETCH"

Algunos parámetros se mantienen persistentes por medio de localStorage.

Para el desarrollo del backend se hace uso de NODE.JS y varios paquetes npm para mayor simplicidad, como por ejemplo:
  *express:  simplifica la incorporación de las peticiones y respuestas HTTP, enrutamiento y middleware.
  *jsonwebtoken: que me permite generar claves temporales para los usuarios que ingresan a la app, además de su verificación.
  *dotenv: para gestionar las variables de entorno del proyecto.

El punto de partida del backend se encuentra en el archivo models/server.js que nos permite servir el frontEnd dispuesto en la carpeta public,
así como gestionar las distintas peticiones http(get,post,put,delete) para las distintas rutas.

El paso dos del backend pasa por la carpeta "/routes", donde se disparan distintas funciones en base al tipo de petición y la ruta a la que se pide.
En este punto se añaden los middlewares que me permite controlar peticiones incompletas o erróneas o no autorizadas.

El último paso estaría en la carpeta "/controllers" donde se gestiona la información recibida en la petición para posteriormente dar una respuesta desde el backend al frontend.

La aplicación se encuentra conectada en la parte del backend con una base de datos ubicada en MongoDB, la gestión de la informacion estructuracion de datos y conexión a la propia base de datos se realiza mediante el npm de moongose.
*mongoose: me permite la conexión con la base de datos, ademas de estructurar la base de datos mediante las herramientas de Schema, model propias de mongoose.


