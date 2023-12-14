
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then(resgistro=> console.log("Service worker se instaló correctamente....", resgistro )) 
    .catch(error => console.log("Service Worker no se instaló....", error))
}else{

    console.log("Service worker no soportado....")

}