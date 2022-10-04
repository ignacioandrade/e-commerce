const PRODUCT_INFO = PRODUCT_INFO_URL + localStorage.getItem("products_info") + EXT_TYPE;
const PRODUCT_COMMENTS_INFO = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("products_info") + EXT_TYPE;
let INFO_OF_PROD = document.getElementById("info-products")
const COM_CONT = document.getElementById("comentarios")


document.addEventListener("DOMContentLoaded", (e)=>{
    function productInformation(Info){
        INFO_OF_PROD.innerHTML += `
        <div class="m-4">
        <h1 class="mb-1"><u>${Info.name}</u></h1> <br>
        <h5><b> <u>Precio</u> </b></h5>
        <p>${Info.cost}</p>
        <p><strong> <u>Descripción</u> </strong></p>
        <p>${Info.description}</p>
        <p><strong><u> Categoria </u></strong></p>
        <p>${Info.category}</p>
        <p><strong> <u>Cantidad de vendidos</u> </strong></p>
        <p>${Info.soldCount}</p>
        <p><strong> <u>Imágenes ilustrativas</u> </strong></p>

        <div class="row">
        <div class="col-3">
        <img class="img-thumbnail" src="${Info.images[0]}"></img>
        </div>
        <div class="col-3">
        <img class="img-thumbnail" src="${Info.images[1]}"></img>
        </div>
        <div class="col-3">
        <img class="img-thumbnail" src="${Info.images[2]}"></img>
        </div>
        <div class="col-3">
        <img class="img-thumbnail" src="${Info.images[3]}"></img>
        </div>
        </div> <br>
        `

    }
    getJSONData(PRODUCT_INFO).then(function(resultObj){  
        if (resultObj.status === "ok"){
            Info = resultObj.data
            productInformation(Info)
        }
    });
})


function showComments(Comments) { 
    let comentarios = ""; 
    for (let annotation of Comments) { 
    
        comentarios += `
    <div class="row">
    <div class="list-group-item" ><p><strong>${annotation.user}</strong> ${annotation.dateTime}</p>`

    for(let i = 0; i < 5; i++){    
        if (i < annotation.score){
            comentarios += `<span class="fa fa-star checked"></span>`
        } else {
            comentarios += `<span class="fa fa-star"></span>`
        }
      };
      comentarios+= ` 
      <p>${annotation.description} </p> 
    </div>
    </div>
    `  
    COM_CONT.innerHTML = comentarios; 
    }
}

getJSONData(PRODUCT_COMMENTS_INFO).then(function(resultObj){ 
    if (resultObj.status === "ok"){
        Comments = resultObj.data
        showComments(Comments)
    }
});










// DESAFIATE ENTREGA 3 

function checkCache() {
    if (JSON.parse(localStorage.getItem("productsList")) === null) {
        let products = [];
        localStorage.setItem("productsList", JSON.stringify(products));
    } else {
        loadList();
    }
}

let addProduct = () => {
    clearList();

    let productsTemp = JSON.parse(localStorage.getItem("productsList"));

    let item = document.getElementById("item");

    if (item.value) {
        productsTemp.push(item.value);
    } else {
        alert("Debe ingresar un ítem");
    };

    item.value = "";

    localStorage.setItem("productsList", JSON.stringify(productsTemp));

    loadList();
}

let deleteProducts = () => {
    let products = [];
    localStorage.setItem("productsList", JSON.stringify(products));
}

let loadList = () => {
    let contenedor = document.getElementById("nuevo-comentario");
    let productsTemp = JSON.parse(localStorage.getItem("productsList"));
    productsTemp.forEach(item => {
        contenedor.innerHTML += ulElement(item);
    })
}

let clearList = () => {
    let contenedor = document.getElementById("nuevo-comentario");
    contenedor.innerHTML = "";
}

let clearAll = () => {
    deleteProducts();
    clearList();
}

const ulElement = (item) => {
    return `<li> ${item} </li>`
}

checkCache()

