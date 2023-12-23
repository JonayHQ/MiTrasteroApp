export {UI}


class UI {

    constructor() {
       
    
    }
    
    imprimirLugares(arregloLugaresGeneral, arregloLugaresS2, arregloTrastos){
        let texto =""
        let clickSubLugar
        let respuesta

        arregloLugaresGeneral.forEach((lugar,i) => {
          const {_id, nombreLugar, usuario, objetosQueGuarda, lugarDondeEsta} = lugar
          
          const todo = document.createElement('P')
           const parrafo = document.createElement('DIV')
           parrafo.setAttribute('id', `${i}-espacio ${nombreLugar}`)
           parrafo.classList.add('panelEspacioGeneral', 'border', 'border-black')
           // parrafo.classList.add('parrafoEspacio')
           // parrafo.setAttribute('id', allData[2][i].espPadre)
         
            const divSup = document.createElement('DIV')
            divSup.setAttribute('id', `${i}-divSuperior`)
            divSup.setAttribute('nameCSS', `divSuperior`)
                    //  divSup.classList.add('divSup')
            
            const divInf = document.createElement('DIV')
            divInf.setAttribute('id', `${i}-divInferior`)
            divInf.setAttribute('nameCSS', `divInferior`)
            
          //  divInf.classList.add('divInf')
            
            const parrafoNombre = document.createElement('P')
            parrafoNombre.setAttribute('id', `${i}-parrafoNombre`)
            parrafoNombre.classList.add('cabecerLugar')
          

            parrafoNombre.textContent = nombreLugar
  
            
    
 
         // parrafoNombre.classList.add('tituloEspacio')
  
  
  //?IMPRIMIR LOS TRASTOS QUE CONTIENE ESTE LUGAR(iteracion)
          const divNombresTrastos = document.createElement('DIV')
          
          divNombresTrastos.setAttribute('id', `${i}-divTrastos`)
          divNombresTrastos.setAttribute('nameCSS', `divTrastos`)
          if(arregloTrastos){
          objetosQueGuarda.forEach(idTrasto => {
              arregloTrastos.forEach(trasto => {
                const {_id, estado, nombreTrasto, usuario } = trasto
                if(_id===idTrasto){
                  const parrafoTrasto = document.createElement('P')
                  parrafoTrasto.textContent = nombreTrasto
                  //Boton de eliminar Trasto
                  const btnEliminarTrasto = document.createElement('button')
                  btnEliminarTrasto.textContent = "X"
                  btnEliminarTrasto.setAttribute('id', `${trasto._id}`)
                  btnEliminarTrasto.classList.add('btn', 'btn-danger','btn-sm')
                  btnEliminarTrasto.setAttribute('name', `btnEliminarTrasto`)
                  btnEliminarTrasto.setAttribute('name1', `${nombreTrasto}`)

                  
                  parrafoTrasto.appendChild(btnEliminarTrasto)
                  divNombresTrastos.appendChild(parrafoTrasto)
                  
                }
              });
          });
        }

        //?IMPRIMIR LOS LUGARESs2 QUE CONTIENE ESTE LUGAR(iteracion)
        const divNombresLugaresS2 = document.createElement('DIV')
        divNombresLugaresS2.setAttribute('id', `${i}-divLugarS2`)
        divNombresLugaresS2.classList.add("divLugarS2")
        if(arregloLugaresS2){
          arregloLugaresS2.forEach(lugarS2 => {
            if(lugarS2.lugarDondeEsta === _id){
              const parrafoLugarS2 = document.createElement('DIV')
              parrafoLugarS2.classList.add('panelEspacioGeneralSub2','cabecerLugarS2')
              
              const textoParraforLugarS2 = document.createElement('DIV')
              textoParraforLugarS2.classList.add('tituloLugarS2')
              textoParraforLugarS2.textContent = lugarS2.nombreLugar
              
              //imprime los trastos de los lugaresS2
              const divNombresTrastosS2 = document.createElement('DIV')
              divNombresTrastosS2.setAttribute('id', `${i}-divTrastosS2`)
              divNombresTrastosS2.setAttribute('nameCSS', `divTrastosS2`)

             
              const idTrastosS2 = lugarS2.objetosQueGuarda
              idTrastosS2.forEach(idTrastoS2 => {
                arregloTrastos.forEach(trasto => {
                    if(idTrastoS2===trasto._id){
                    
                    const parrafoTrastoS2 = document.createElement('DIV')
                    parrafoTrastoS2.textContent = trasto.nombreTrasto
                  
                    //Boton de eliminar TrastoS2
                    const btnEliminarTrastoS2 = document.createElement('button')
                    btnEliminarTrastoS2.textContent = "X"
                    btnEliminarTrastoS2.setAttribute('id', `${trasto._id}`)
                    btnEliminarTrastoS2.classList.add('btn', 'btn-danger','btn-sm')
                    btnEliminarTrastoS2.setAttribute('name', `btnEliminarTrasto`)
                    btnEliminarTrastoS2.setAttribute('name1', `${lugarS2.nombreLugar}`)
                    
                    parrafoTrastoS2.appendChild(btnEliminarTrastoS2)
                    
                    divNombresTrastosS2.appendChild(parrafoTrastoS2)
                    
                    }
                });
              });
              
              const divBtnAddTrastoS2 = document.createElement('DIV')
              divBtnAddTrastoS2.classList.add('btnAddTrastoS2')

                //Boton de eliminar LugarS2
                const btnEliminarLugarS2 = document.createElement('button')
                btnEliminarLugarS2.textContent = "X"
                btnEliminarLugarS2.setAttribute('id', `${lugarS2._id}`)
                btnEliminarLugarS2.classList.add('btn', 'btn-danger','btn-sm')
                btnEliminarLugarS2.setAttribute('name', `btnEliminarLugar`)
                btnEliminarLugarS2.setAttribute('name1', `${lugarS2.nombreLugar}`)

                //Boton añadir Trastos
                const btnAddTrastoS2 = document.createElement('button')
                btnAddTrastoS2.textContent = "+ Obj"
                btnAddTrastoS2.setAttribute('id', `${lugarS2._id}`)
                btnAddTrastoS2.classList.add('btn', 'btn-success','btn-sm')
                btnAddTrastoS2.setAttribute('name', `btnTrastosS2`)
                btnAddTrastoS2.setAttribute('name1', `${lugarS2.nombreLugar}`)

                //Boton de editar Lugar S2
                const btnEditarLugarS2 = document.createElement('button')
                btnEditarLugarS2.textContent = "Editar"
                btnEditarLugarS2.setAttribute('id', `${lugarS2._id}`)
                btnEditarLugarS2.classList.add('btn', 'btn-secondary', 'btn-sm')
                btnEditarLugarS2.innerHTML = `<svg id="${lugarS2._id}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>`
                btnEditarLugarS2.setAttribute('name', `btnEditarLugar`)
                btnEditarLugarS2.setAttribute('name1', `${lugarS2.nombreLugar}`)
                
                divBtnAddTrastoS2.appendChild(btnAddTrastoS2)
                textoParraforLugarS2.appendChild(btnEditarLugarS2)
                textoParraforLugarS2.appendChild(btnEliminarLugarS2)
                parrafoLugarS2.appendChild(textoParraforLugarS2)
                parrafoLugarS2.appendChild(divBtnAddTrastoS2)
                parrafoLugarS2.appendChild(divNombresTrastosS2)
                
                divNombresLugaresS2.appendChild(parrafoLugarS2)
                
                
               // divNombresTrastosS2.appendChild(btnAddTrastoS2)
                
                
                
                
                
                
                //divNombresLugaresS2.appendChild(divNombresTrastosS2)
                
            }
          });
        }
       const pbtnAdd = document.createElement('DIV')
        pbtnAdd.setAttribute('nameCSS', 'pbtnADD')
        //?BOTON AÑADIR TRASTO
         /*
          const btnAddTrasto = document.createElement('button')
          btnAddTrasto.textContent = "+ Obj"
          btnAddTrasto.setAttribute('id', `${_id}`)
          btnAddTrasto.classList.add( 'btn', 'btn-success', 'btn-sm') 
          btnAddTrasto.setAttribute('name', `boton`)
          btnAddTrasto.setAttribute('name1', `${nombreLugar}`)
     
          pbtnAdd.appendChild(btnAddTrasto)*/
        //?BOTON AÑADIR LUGARs2
        
        const btnAddLugarS2 = document.createElement('button')
        btnAddLugarS2.textContent = "+ Lugar"
        btnAddLugarS2.setAttribute('id', `${_id}`)
        btnAddLugarS2.setAttribute('name', `btnAddLugarS2`)
        btnAddLugarS2.classList.add( 'btn', 'btn-success', 'btn-sm') 
        btnAddLugarS2.setAttribute('name1', `${nombreLugar}`)

        pbtnAdd.appendChild(btnAddLugarS2)
        //Boton de eliminar Lugar General
        const btnEliminarLugar = document.createElement('button')
        btnEliminarLugar.textContent = "X"
        btnEliminarLugar.setAttribute('id', `${lugar._id}`)
        btnEliminarLugar.classList.add('btn', 'btn-danger','btn-sm')
        btnEliminarLugar.setAttribute('name', `btnEliminarLugar`)
        btnEliminarLugar.setAttribute('name1', `${lugar.nombreLugar}`)

        //Boton de editar Lugar General
        const btnEditarLugar = document.createElement('button')
        btnEditarLugar.textContent = "Editar"
        btnEditarLugar.setAttribute('id', `${lugar._id}`)
        btnEditarLugar.classList.add('btn', 'btn-secondary', 'btn-sm')
        btnEditarLugar.innerHTML = `<svg id="${lugar._id}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>`
        btnEditarLugar.setAttribute('name', `btnEditarLugar`)
        btnEditarLugar.setAttribute('name1', `${lugar.nombreLugar}`)

            parrafoNombre.appendChild(btnEliminarLugar)
            parrafoNombre.appendChild(btnEditarLugar)
            divSup.appendChild(parrafoNombre)
            //divSup.appendChild(btnAddTrasto)
            divSup.appendChild(divNombresTrastos)
             divSup.appendChild(pbtnAdd)
            divInf.appendChild(divNombresLugaresS2)
            parrafo.appendChild(divSup)
            parrafo.appendChild(divInf)
            todo.appendChild(parrafo)

            texto +=todo.innerHTML
    
    })

       
    respuesta = texto
return  respuesta

    }

  async guardarDBLugar (lugarObj) {
    
    let mensaje = {}

    let url = (window.location.hostname.includes('localhost') )
    ? 'http://localhost:8080/'
    : 'https://mitrasteroapp-production.up.railway.app/'

    
    
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-token", localStorage.getItem('token'));
        
        let myInitPOST = { method: 'POST',
                        headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: JSON.stringify(lugarObj) };
    
                        let myRequest = new Request(url+'api/lugar', myInitPOST);
        
                        await fetch( myRequest )
                        .then(resp => resp.json() )
                        .then( (respuesta)=> {
                          mensaje = Object.values(respuesta)
                        })
                        .catch( console.warn );

    
    return {el_backend_dice_esto: mensaje}
    
    }
   
  async obtenerEspacios (){

       let arregloLugares = []

        let url = (window.location.hostname.includes('localhost') )
        ? 'http://localhost:8080/'
        : 'https://mitrasteroapp-production.up.railway.app/'
        
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-token", localStorage.getItem('token'));
          
        let myInitGet = { method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'};

        let myRequestGet = new Request(url+'api/lugar', myInitGet);

        await fetch( myRequestGet )
        .then(resp => resp.json() )
        .then( (respuesta)=>  {
        arregloLugares = respuesta.lugarArr
        })
        .catch( console.warn );


    return arregloLugares

    }

  async guardarDBtrasto (trastoObj) {
    
      let mensaje = {}
  
      let url = (window.location.hostname.includes('localhost') )
      ? 'http://localhost:8080/'
      : 'https://mitrasteroapp-production.up.railway.app/'
      
          let myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("x-token", localStorage.getItem('token'));
          
          let myInitPOST = { method: 'POST',
                          headers: myHeaders,
                          mode: 'cors',
                          cache: 'default',
                          body: JSON.stringify(trastoObj) };
      
                          let myRequest = new Request(url+'api/trasto', myInitPOST);
          
                          await fetch( myRequest )
                          .then(resp => resp.json() )
                          .then( (respuesta)=> {
                            mensaje = Object.values(respuesta)
                          })
                          .catch( console.warn );
  
      return {el_backend_dice_esto: mensaje}
      
    }

  async obtenerTrastos() {

      let arregloTrastos = []

       let url = (window.location.hostname.includes('localhost') )
       ? 'http://localhost:8080/'
       : 'https://mitrasteroapp-production.up.railway.app/'
       
       let myHeaders = new Headers();
       myHeaders.append("Content-Type", "application/json");
       myHeaders.append("x-token", localStorage.getItem('token'));
           
       let myInitGet = { method: 'GET',
       headers: myHeaders,
       mode: 'cors',
       cache: 'default'};

       let myRequestGet = new Request(url+'api/trasto', myInitGet);

       await fetch( myRequestGet )
       .then(resp => resp.json() )
       .then( (respuesta)=>  {
       arregloTrastos = respuesta.trastoArr
       })
       .catch( console.warn );

   return arregloTrastos

   }

   async borrarDBtrasto (idTrasto) {
    
    let mensaje = {}

    let url = (window.location.hostname.includes('localhost') )
    ? 'http://localhost:8080/'
    : 'https://mitrasteroapp-production.up.railway.app/'
    
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-token", localStorage.getItem('token'));
        
        let myInitPUT = { method: 'PUT',
                        headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: JSON.stringify(idTrasto) };
    
                        let myRequest = new Request(url+'api/trasto', myInitPUT);
        
                        await fetch( myRequest )
                        .then(resp => resp.json() )
                        .then( (respuesta)=> {
                          mensaje = Object.values(respuesta)
                        })
                        .catch( console.warn );

    return {el_backend_dice_esto: mensaje}
    
  }

  async borrarDBLugar (idLugar) {
    
    let mensaje = {}

    let url = (window.location.hostname.includes('localhost') )
    ? 'http://localhost:8080/'
    : 'https://mitrasteroapp-production.up.railway.app/'
    
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-token", localStorage.getItem('token'));
        
        let myInitPUT = { method: 'PUT',
                        headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: JSON.stringify(idLugar) };
    
                        let myRequest = new Request(url+'api/lugar', myInitPUT);
        
                        await fetch( myRequest )
                        .then(resp => resp.json() )
                        .then( (respuesta)=> {
                          mensaje = Object.values(respuesta)
                        })
                        .catch( console.warn );

    return {el_backend_dice_esto: mensaje}
    
  }

  async editarLugar (newDataLugar) {
    
    let mensaje = {}

    let url = (window.location.hostname.includes('localhost') )
    ? 'http://localhost:8080/'
    : 'https://mitrasteroapp-production.up.railway.app/'
    
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-token", localStorage.getItem('token'));
        
        let myInitPUT = { method: 'PUT',
                        headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: JSON.stringify(newDataLugar) }; 
    
                        let myRequest =  new Request(url+'api/lugar/editar', myInitPUT);
        
                        await fetch( myRequest )
                        .then(resp => resp.json() )
                        .then( (respuesta)=> {
                          mensaje = Object.values(respuesta)
                        })
                        .catch( console.warn );

    return {el_backend_dice_esto: mensaje}
    
  }

 cargarBuscador(arregloTrastos,arregloLugares){

  listaTrastos.innerHTML = ""
    
    arregloTrastos.forEach(trasto => {
    const {_id, nombreTrasto} = trasto
  
    listaTrastos.innerHTML += `<p class=parrafoListaTrastos>${nombreTrasto}<span id="${_id}" hidden>${_id}</span></p>`
 
  });

  let objetoBuscado = {nombre: "", id: ""}
  let lugardelObjetoBuscado = ""
  let idlugarPadre = ""
  let nombreLugarPadre = ""
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
          divResultadoSearch.innerHTML += `<a id="btnIr" class="btnIr">Ir al lugar</a>`
         
  }); 
  

});
   
    
  }


}

