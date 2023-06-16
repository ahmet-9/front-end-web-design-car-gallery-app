const form = document.getElementById ("car-form");
const titleElement = document.querySelector ("#title");
const priceElement = document.querySelector ("#price");
const urlElement = document.querySelector ("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-cars");
 
// UI Objesini Başlatma
 
const ui = new UI();

const storage = new Storage();
 
// Tüm eventleri Yükleme 
 
events ();
 
function events () {
    form.addEventListener ("submit",addCar);
    document.addEventListener("DOMContentLoaded",function(){
        let cars = storage.getCarsFromStorage();
        ui.loadAllCars(cars);
    });

    cardbody.addEventListener("click",deleteCar);
    clear.addEventListener("click",clearAllCars);
}
 
function addCar(e){
    // bunu başa yazcan
    e.preventDefault();
 
    const title = titleElement.value;
    const price = priceElement.value;
    const url = urlElement.value;
    
    if (title === "" || price === "" || url === ""){
        
        ui.displayMessages("Tüm Alanları Doldurun...","danger");

    }
    else{
        
        // Yeni araç
        const newCar = new Car (title,price,url);
        ui.addCarToUI(newCar); // arayüze araç ekleme

        storage.addCarToStorage(newCar);

        ui.displayMessages("Araç Başarıyla Eklendi...","success");
    }

    ui.clearInputs(titleElement,urlElement,priceElement);

    e.preventDefault();
}  

function deleteCar(e){
    if(e.target.id === "delete-car"){
        ui.deleteCarFromUI(e.target);

        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("silme işlemi başariyla gerçekleşti...","success");
    }
    

}

function clearAllCars(){
  

    if(confirm("tüm araçlar silinecek eminmisiniz")){
        ui.clearAllCarsFromUI();
        storage.clearAllCarsFromStorage();
    }
}

