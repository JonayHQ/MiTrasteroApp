import { ModelLugar } from './0lugar.js'

export {UI}


class UI {

constructor() {
   

}

obtenerLugares(){
    
        const query = {estado:true}
        let lugaresArreglo = []
            lugaresArreglo = ModelLugar.find(query)
               
console.log(lugaresArreglo)



    }



get objetosArr(){
    return Object.values(this.objetos)
}

guardarNuevoLugar(nombreLugar, lugarDondeEsta , usuario, foto){
new ModelLugar(nombreLugar, lugarDondeEsta, usuario, foto)

}



}