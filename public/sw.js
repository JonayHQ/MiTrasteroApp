//?Estos son los archivos cacheados para funcionar offline
const archivos = [
    "/",
    "index.html",
    "trasteroV3.html",
    "/js/app.js",
    "/js/auth.js",
    "/js/trastero.js",
    "/js/UI.js",
    "/js/style.css"
]
const nombreCache = 'MiTrastero_0.1.3'

// Instalar SW, solo se instala una vez
self.addEventListener('install', e=>{
    console.log("instalando el Service Worker")
   // console.log(e)

    e.waitUntil(
        caches.open(nombreCache)
            .then(cache => {
                console.log('cacheando')
                cache.addAll(archivos)
            })
    )

    //cachear mi app para que funcione offline


})

//activar el SW
self.addEventListener('activate', e=>{
console.log("service worker activado")
//console.log(e)

e.waitUntil(
    caches.keys()
        .then( keys => {
            let arregloUltimaversion
            keys.forEach(key => {
                if(key!==nombreCache){
                    caches.delete(key)
                }
                 arregloUltimaversion = keys.filter(key => key===nombreCache)
                console.log(arregloUltimaversion)
            });
        return  arregloUltimaversion
           
        })
        
    )
    
})

//Evento fetch para descargar archivo estatico y hacerlo instalable
self.addEventListener('fetch', e=>{
    console.log("fetch....")

   
/*//PARA hacer que lea del cache y pueda verse offline. Pero con este proyecto no puedo pq tira de bootstrap online
    e.respondWith(
        caches.match(e.request)
            .then (respuestaCache=>{
                return respuestaCache
            .catch(()=> caches.match('/error.html')) //esto es para que muestre una pagina de error en caso de fallo en conexion

            })
    )*/
})