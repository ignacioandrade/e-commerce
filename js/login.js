const button = document.getElementById("button")
const contrasenia = document.getElementById("contrasenia")
const email = document.getElementById("email")

button.addEventListener("click", (e) => {
    if(email.value.length < 1){
        alert("Ingresa tu email")
    } else if (contrasenia.value.length < 1){
        alert("Ingresa tu contraseña")
    }else{
        window.location.href = "home.html"
    }
})