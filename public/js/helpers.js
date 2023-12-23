export {validarJWT}
let usuario = null
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