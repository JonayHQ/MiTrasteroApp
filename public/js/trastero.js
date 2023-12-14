import {UI} from '../js/UI.js'

const ui = new UI()

const divArbolPrincipalH = document.querySelector('#divArbolPrincipal')
const divLugarNuevoH = document.querySelector('#divLugarNuevo')
const divElementoNuevoH = document.querySelector('#divElementoNuevo')
const divResultadoSearchH = document.querySelector('#divResultadoSearch')
const inputSearch = document.querySelector('#inputSearch')

const inputNombreLugar = document.querySelector('#inputNombreLugar')

const txtUid = document.querySelector('#txtUid')
const txtMensaje= document.querySelector('#txtMensaje')
const ulUsuarios= document.querySelector('#ulUsuarios')
const ulMensajes= document.querySelector('#ulMensajes')
const btnSalir= document.querySelector('#btnSalir')
const btnNuevoLugar = document.querySelector('#btnNuevoLugar')

const divEspacios = document.querySelector('#divEspacios')



let usuario = null
let socket = null
let arregloLugares = []

const init = async () => {
    //!AQUI METER UN PROMISE ALL, para ir mas rapido
    const arregloLugares =  await ui.obtenerEspacios()
    const arregloTrastos =  await ui.obtenerTrastos()


let cargarBuscador = ui.cargarBuscador(arregloTrastos)
//? PANEL DE BUSCAR TRASTO
let objetoBuscado = {nombre: "", id: ""}
let lugardelObjetoBuscado = ""

inputSearch.addEventListener('input', (e)=>{
    arregloTrastos.forEach(trasto => {
        const { _id, nombreTrasto} = trasto
        if(e.target.value === _id){
            inputSearch.value = nombreTrasto
            objetoBuscado.nombre = nombreTrasto
            objetoBuscado.id =_id
        }

    });

    arregloLugares.forEach(lugar => { 
        const {objetosQueGuarda} = lugar
        objetosQueGuarda.forEach(trastoGuardado => {
                if(trastoGuardado===objetoBuscado.id){
                    lugardelObjetoBuscado = lugar.nombreLugar
                }
            });
    });
    
divResultadoSearchH.innerHTML = `El trasto ${objetoBuscado.nombre} se encuentra en ${lugardelObjetoBuscado}`
})


//filtrar por Lugares Generales
const arregloLugaresS1 = arregloLugares.filter((lugar) => lugar.lugarDondeEsta === "general")
//filtrar por lugaresS2
const arregloLugaresS2 = arregloLugares.filter((lugar) => lugar.lugarDondeEsta !== "general")

    //*IMPRIME LA LISTA DE LUGARES y SUS BOTONES
    const lugaresHTML = ui.imprimirLugares(arregloLugaresS1,arregloLugaresS2, arregloTrastos)
    divEspacios.innerHTML = ""
    divEspacios.innerHTML = lugaresHTML


 //? MODULO ACORDEON
 
 const panelesCabecera = document.querySelectorAll('.cabecerLugar')
 let panelActivo = JSON.parse(localStorage.getItem("panelActivo"))

panelesCabecera.forEach(espacioCabecera => {
//Este modulo hacer persistente el panel activo o abierto.
    if(espacioCabecera.id===panelActivo){
        espacioCabecera.parentElement.parentElement.classList.remove('panelEspacioGeneral')
        espacioCabecera.parentElement.parentElement.classList.add('panelEspacioGeneralActivo')
    }
    espacioCabecera.addEventListener('click', (e)=>{
        panelActivo = e.target

        if(e.target.parentElement.parentElement.classList.contains('panelEspacioGeneral')){
            e.target.parentElement.parentElement.classList.remove('panelEspacioGeneral')
            e.target.parentElement.parentElement.classList.add('panelEspacioGeneralActivo')
    //Este modulo hacer persistente el panel activo o abierto.
            localStorage.setItem("panelActivo", JSON.stringify(panelActivo.id)) 

        }else{
            e.target.parentElement.parentElement.classList.remove('panelEspacioGeneralActivo')
            e.target.parentElement.parentElement.classList.add('panelEspacioGeneral')
    //Este modulo elimina el panel activo o abierto del localstorage al cerrarse
            localStorage.removeItem("panelActivo")
        }

    })
 });

    //? MODULO IMPRIMIR BOTONES "AÑADIR OBJETOS"
    //Crea eventos para el boton añadir objetos
    const btnAñadirCosa = document.getElementsByName('boton')
    btnAñadirCosa.forEach(btn => {
        btn.addEventListener('click', async (e)=>{
            let nuevoObjeto = prompt("Añade un objeto");
            if(nuevoObjeto.length ===0){ return}
            let trastoObj = {
                nombre: nuevoObjeto, 
                estado: "true",
                idLugar: e.target.id
            }

            let mensajeConfirmacion = await ui.guardarDBtrasto(trastoObj)
                console.log(mensajeConfirmacion)
                init()
        })

    });


 //? MODULO IMPRIMIR BOTONES "AÑADIR LUGARs2"
    //Crea eventos para el boton añadir objetos
    const btnAddLugarS2 = document.getElementsByName('btnAddLugarS2')
    btnAddLugarS2.forEach(btn => {
        btn.addEventListener('click', async (e)=>{
            let nuevoEspacio = prompt("Añade un espacio");
            if(nuevoEspacio.length ===0){ return}
            let lugarObj = {
                nombre: nuevoEspacio, 
                estado: "true",
                lugarDondeEsta: e.target.id
            }
        
            let mensajeConfirmacion = await ui.guardarDBLugar(lugarObj)
            alert(mensajeConfirmacion.el_backend_dice_esto[0])
            init()
        })

    });
  
//? MODULO IMPRIMIR BOTONES "AÑADIR OBJETOS A LUGARs2"
    //Crea eventos para el boton añadir objetos
    const btnTrastosS2 = document.getElementsByName('btnTrastosS2')
    btnTrastosS2.forEach(btn => {
        btn.addEventListener('click', async (e)=>{
            let nuevoObjeto = prompt("Añade un objeto");
            if(nuevoObjeto.length ===0){ return}
            let trastoObj = {
                nombre: nuevoObjeto, 
                estado: "true",
                idLugar: e.target.id
            }

            let mensajeConfirmacion = await ui.guardarDBtrasto(trastoObj)
            alert(mensajeConfirmacion.el_backend_dice_esto[0])
            init()
        })

    });

    const btnEliminarTrasto = document.getElementsByName('btnEliminarTrasto')
    btnEliminarTrasto.forEach(btn => {
        btn.addEventListener('click', async (e)=>{
            
            let confirmacionDelete = confirm(`Seguro que desea borrar`);
            if(!confirmacionDelete){ return}
            console.log(e.target.id)
            let idTrasto = {
                id: e.target.id
            }
            //Peticion a BD y borrar
            let mensajeConfirmacion = await ui.borrarDBtrasto(idTrasto)
            alert(mensajeConfirmacion.el_backend_dice_esto[0])
            init()
        })

    });

//Da Servicio al boton de borrar lugar
const btnEliminarLugar = document.getElementsByName('btnEliminarLugar')
    btnEliminarLugar.forEach(btn => {
        btn.addEventListener('click', async (e)=>{
            
            let confirmacionDelete = confirm(`Seguro que desea borrar`);
            if(!confirmacionDelete){return}
            console.log(e.target.id)
            let idLugar = {
                id: e.target.id
            }
            
            //Peticion a BD y borrar
            let mensajeConfirmacion = await ui.borrarDBLugar(idLugar)
            alert(mensajeConfirmacion.el_backend_dice_esto[0])
            init()
        })

    });

//?CREAR BOTON EDITAR Y DAR SERVICIO

const btnEditarLugar = document.getElementsByName('btnEditarLugar')
btnEditarLugar.forEach(btn => {
        btn.addEventListener('click', async (e)=>{
            
            let editarLugar = prompt(`Nuevo nombre`);
            if(editarLugar.length === 0){return}
            console.log(e.target.id)
            let newDataLugar= {
                nombreLugar: editarLugar,
                id: e.target.id
            }
            
            //Peticion a BD y borrar
            let mensajeConfirmacion = await ui.editarLugar(newDataLugar)
            alert(mensajeConfirmacion.el_backend_dice_esto[0])
            init()
        })

});

}

init()

btnNuevoLugar.addEventListener('click', async (e)=>{
const nombreLugar = prompt("Añade un nuevo espacio")
if(nombreLugar.length ===0){ return}
let lugarObj = {nombre: nombreLugar, estado: "true"}

//?------  GRABAR NUEVO LUGAR Y EL BACKEND NOS DEVUELVE RESPUESTA DE CONFIRMACION ---------
let mensajeConfirmacion = await ui.guardarDBLugar(lugarObj)
console.log(mensajeConfirmacion)

init()


})


const validarJWT = async ()=>{

var url = (window.location.hostname.includes('localhost') )
    ? 'http://localhost:8080/api/auth/'
    : 'https://mitrasteroapp-production.up.railway.app/api/auth/'

const token = localStorage.getItem('token') || ""

if(token.length < 10){
    window.location = "index.html"
    throw new Error("El token no es valido")

}
const resp = await fetch (url, {
    headers:{"x-token": token}
}

)
const {usuario: userDB, token: tokenDB} = await resp.json()

localStorage.setItem('token', tokenDB)

usuario = userDB

}
