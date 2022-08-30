const CAR_URL = PRODUCTS_URL+"101"+EXT_TYPE;
const container_car = document.getElementById("car-list-container")

function carData(dataArray) {
    for (const item of dataArray) {
        container_car.innerHTML += `
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
}

let car = fetch(CAR_URL);
car.then(function(response){
    return response.json();
})
.then(function(json){
    carData(json.products);
})