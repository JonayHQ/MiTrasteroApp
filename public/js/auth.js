
//!Esto es la logica de validacion de Google Sign in

localStorage.removeItem("panelActivo")

const miFormulario = document.querySelector('form')

miFormulario.addEventListener('submit', event=>{
event.preventDefault()
const formData = {}
    
var url = (window.location.hostname.includes('localhost') )
? 'http://localhost:8080/api/auth'
: 'https://mitrasteroapp-production.up.railway.app/api/auth/'

for(let el of miFormulario.elements){
    if(el.name.length>0){
        formData[el.name] = el.value
    }
console.log(formData)
}

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

 var myInit = { method: 'POST',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(formData) };

 var myRequest = new Request(url+'/login', myInit);

 fetch( myRequest )
 .then(resp => resp.json() )
 .then( ({ msg, token })=> {
console.log(token)
    if(msg){
        return console.error(msg)
    }
    localStorage.setItem('token', token)
    window.location="trasteroV3.html"
 })
 .catch( console.warn );


}
)


function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    //console.log("id_token",response.credential)
  
 const id_token = response.credential
 var data = { id_token };
 var url = (window.location.hostname.includes('localhost') )
         ? 'http://localhost:8080/api/auth/'
         : 'https://mitrasteroapp-production.up.railway.app/api/auth/'

 var myHeaders = new Headers();
 myHeaders.append("Content-Type", "application/json");

 var myInit = { method: 'POST',
             headers: myHeaders,
             mode: 'cors',
             cache: 'default',
             body: JSON.stringify(data) };

 var myRequest = new Request(url + 'google', myInit);


 fetch( myRequest )
 .then(resp => resp.json() )
 .then( ({ token })=> {

    localStorage.setItem('token', token)
    window.location="chat.html"
 })
 .catch( console.warn );

 }


 const button = document.getElementById('google_signout')
button.onclick = ()=>{

 console.log(google.accounts.id)
 google.accounts.id.disableAutoSelect()

 google.accounts.id.revoke(localStorage.getItem('email'), done=>{
     localStorage.clear()
     location.reload()

 })

}
