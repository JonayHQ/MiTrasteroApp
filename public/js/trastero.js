import {UI} from '../js/UI.js'

import {validarJWT} from './helpers.js'

const ui = new UI()

const divArbolPrincipalH = document.querySelector('#divArbolPrincipal')
const divLugarNuevoH = document.querySelector('#divLugarNuevo')
const divElementoNuevoH = document.querySelector('#divElementoNuevo')
const divResultadoSearch = document.querySelector('#divResultadoSearch')
const inputSearch = document.querySelector('#inputSearch')

const inputNombreLugar = document.querySelector('#inputNombreLugar')

const txtUid = document.querySelector('#txtUid')
const txtMensaje= document.querySelector('#txtMensaje')
const ulUsuarios= document.querySelector('#ulUsuarios')
const ulMensajes= document.querySelector('#ulMensajes')
const btnSalir= document.querySelector('#btnSalir')
const btnNuevoLugar = document.querySelector('#btnNuevoLugar')

const divEspacios = document.querySelector('#divEspacios')
const listaTrastos = document.querySelector('#listaTrastos')




let socket = null
let arregloLugares = []


//?PETICION A BASE DE DATOS SOBRE INFO DE TRASTOS Y ESPACIOS
const init = async () => {

    validarJWT()

    //!AQUI METER UN PROMISE ALL, para ir mas rapido
    const arregloLugares =  await ui.obtenerEspacios()
    const arregloTrastos =  await ui.obtenerTrastos()


//?CREAR MODAL DEL BUSCADOR
const btnOpenModal = document.querySelector("[data-open-modal]")
const btnCloseModal = document.querySelector("[data-close-modal]")
const modal = document.querySelector("[data-modal]")
    
btnOpenModal.addEventListener('click', ()=>{
inputSearch.value=""
divResultadoSearch.innerHTML=""
  modal.showModal()
  ui.cargarBuscador(arregloTrastos, arregloLugares)
    })
 btnCloseModal.addEventListener('click', ()=>{
  modal.close()
    })

 //? PANEL DE BUSCAR TRASTO
let cargarBuscador = ui.cargarBuscador(arregloTrastos, arregloLugares)

let objetoBuscado = {nombre: "", id: ""}
let lugardelObjetoBuscado = ""
let idlugarPadre = ""
let nombreLugarPadre = ""

inputSearch.addEventListener('input', (e)=>{
    listaTrastos.innerHTML= ""
    arregloTrastos.forEach(trasto => {
        const { _id, nombreTrasto} = trasto

       if( nombreTrasto.includes((inputSearch.value.toLowerCase()))){
        console.log(nombreTrasto)
        listaTrastos.innerHTML+= `<p class=parrafoListaTrastos>${nombreTrasto}<span id="${_id}" hidden>${_id}</span></p>`
       }
       
    })
    //?HACE SELECCIONABLE LOS TRASTOS FILTRADOS
        const p = document.querySelectorAll('.parrafoListaTrastos')
        p.forEach(parrafo => {
            parrafo.addEventListener('click', e=>{
                objetoBuscado = {nombre: e.target.outerText, id: e.target.firstElementChild.innerText}
                arregloLugares.forEach(lugar => { 
                    const {objetosQueGuarda} = lugar
                    objetosQueGuarda.forEach(trastoGuardado => {
                            if(trastoGuardado===objetoBuscado.id){
                                lugardelObjetoBuscado = lugar.nombreLugar
                                idlugarPadre = lugar.lugarDondeEsta
                            }
                        });
                });

                arregloLugares.forEach(lugar => {
                    if(idlugarPadre===lugar._id){
                      nombreLugarPadre = lugar.nombreLugar
                      console.log(nombreLugarPadre)
                    }     
                  });

                divResultadoSearch.innerHTML = `El trasto <span style="font-weight:bolder">${objetoBuscado.nombre}</span> se encuentra en ${lugardelObjetoBuscado} en ${nombreLugarPadre}`
        });
        

    });

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
            //alert(mensajeConfirmacion.el_backend_dice_esto[0])
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
           // alert(mensajeConfirmacion.el_backend_dice_esto[0])
            init()
        })

    });

    const btnEliminarTrasto = document.getElementsByName('btnEliminarTrasto')
    btnEliminarTrasto.forEach(btn => {
        btn.addEventListener('click', async (e)=>{
            
            let confirmacionDelete = confirm(`Seguro que desea borrar`);
            if(!confirmacionDelete){return}
            let idTrasto = {
                id: e.target.id
            }
            //Peticion a BD y borrar
            let mensajeConfirmacion = await ui.borrarDBtrasto(idTrasto)
          //  alert(mensajeConfirmacion.el_backend_dice_esto[0])
            init()
        })

    });

//Da Servicio al boton de borrar lugar
const btnEliminarLugar = document.getElementsByName('btnEliminarLugar')
    btnEliminarLugar.forEach(btn => {
        btn.addEventListener('click', async (e)=>{
            
            let confirmacionDelete = confirm(`Seguro que desea borrar`);
            if(!confirmacionDelete){return}
            
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
            if(!editarLugar){init()
                return}
            if(editarLugar.length === 0){
                init()
                return}

            let newDataLugar= {
                nombreLugar: editarLugar,
                id: e.target.id
            }
            
            //Peticion a BD y borrar
            let mensajeConfirmacion = await ui.editarLugar(newDataLugar)
            //alert(mensajeConfirmacion.el_backend_dice_esto[0])
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

init()


})




