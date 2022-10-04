let prodID = localStorage.getItem("catID");
const CAR_URL = PRODUCTS_URL+prodID+EXT_TYPE;
const container_products = document.getElementById("car-list-container");

// Para entrega 2 
/*const btnFilter = document.getElementById("filterPrice")
const btnClearFilter = document.getElementById("clearRangeFilter")
const asc_by_price = document.getElementById("sortAscPrice")
const desc_by_price = document.getElementById("sortDescPrice")
const relevant = document.getElementById("relevance")



function productsData(dataArray) {
    for (const item of dataArray) {
        container_products.innerHTML += `
        <div onclick="setCatID(${item.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${item.image}" alt="${item.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${item.name} - ${item.currency} ${item.cost} </h4>
                            <small class="text-muted">${item.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${item.description}</p>
                    </div>
                </div>
            </div>`
    }
};

function getProducts(){
    let car = fetch(CAR_URL);
    car.then(function(response){
        return response.json();
    })
    .then(function(json){
        productsData(json.products);
    });
}


// Para entrega 2 
function arrange (){
    fetch(CAR_URL)
    .then (response => {
        return response.json();
    })
    .then (data => {
        const products = data.products;
        asc_by_price.addEventListener("click", ()=>{
            products
            .sort((a,b) => {
                if (a.cost < b.cost) return  1;
                if (a.cost > b.cost) return -1;
                return 0
            });
            container_products.innerHTML ="";
            productsData(products)
        });
        desc_by_price.addEventListener("click", () => {
            products
            .sort((a,b) => {
                if (a.cost < b.cost) return -1;
                if (a.cost > b.cost) return 1;
                return 0;
            });
            container_products.innerHTML ="";
            productsData(products);
        });
        relevant.addEventListener("click", ()=>{
            products
            .sort((a,b)=>{
                if (a.soldCount < b.soldCount) return 1;
                if (a.soldCount > b.soldCount) return -1;
                return 0;
            });
            container_products.innerHTML = "";
            productsData(products)
        });  

    });
};

document.addEventListener("DOMContentLoaded", ()=>{
    getProducts();
    arrange();
});*/









const ORDER_ASC_BY_PRICE = "ascPrice";
const ORDER_DESC_BY_PRICE = "descPrice";
const ORDER_BY_PROD_COUNT = "relevance";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortCategories(criteria, array){ 
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {      
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){   
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){     
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showCategoriesList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name+" "+category.currency+" "+category.cost}</h4>
                            <small class="text-muted">${category.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `
        }
        document.getElementById("car-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;  
    if(categoriesArray != undefined){ 
        currentCategoriesArray = categoriesArray;
    }
    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);
    showCategoriesList();
}


document.addEventListener("DOMContentLoaded", function(e){      
    getJSONData(CAR_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data.products
            showCategoriesList()
        }
    });

    document.getElementById("sortAscPrice").addEventListener("click", function(){ 
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortDescPrice").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("relevance").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("filterMin").value = "";
        document.getElementById("filterMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("filterPrice").addEventListener("click", function(){
        minCount = document.getElementById("filterMin").value;
        maxCount = document.getElementById("filterMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});



function setCatID(id) {
    localStorage.setItem("products_info", id);
    window.location = "product-info.html"
}