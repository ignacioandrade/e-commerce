const button = document.getElementById("button")
const contrasenia = document.getElementById("contrasenia")
const email = document.getElementById("email")



document.addEventListener("DOMContentLoaded", function(){

    button?.addEventListener("click", (e) => {
        if(email.value.length < 1){
            alert("Ingresa tu email")
        } else if (contrasenia.value.length < 1){
            alert("Ingresa tu contraseña")
        }else{
            window.location.href = "home.html"
        }
    });
    
    button?.addEventListener("click", (e) => {
        if (email.value) localStorage.setItem("text", email.value);
        else localStorage.removeItem("text");
    })
});




