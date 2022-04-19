import {weatherApp} from "./weatherApp.js"

let dataDump;
let query = [];

//First load
window.addEventListener("load", () => {
  getNavData();
  waitForInfo();
});

//Open search
weatherApp.changeLocation.addEventListener("click", () => {
  weatherApp.openModal(weatherApp.searchModal);
});

//Search button
weatherApp.searchButton.addEventListener("click", () => {
  search();
});
//Use current location
weatherApp.useCurrentLocation.addEventListener("click", () => {
  weatherApp.closeModal(weatherApp.searchModal);
  weatherApp.openModal(weatherApp.loadingOrErrorModal);
  getNavData();
  waitForInfo();
});

//Close search
weatherApp.closeButton.addEventListener("click", () => {
  weatherApp.emptyQueryError.classList.add("hide")
  weatherApp.closeModal(weatherApp.searchModal);
});

//Reload
weatherApp.reload.addEventListener("click", () => {
  weatherApp.addRemoveClass("reload-spin", weatherApp.reload, 5000);
  weatherApp.request(weatherApp.formatQuery(query));
});

//Switch temp units
weatherApp.optionTempUnit.addEventListener("click", () => {
  weatherApp.changeTempUnit();
});

//Get lat and long
function getNavData() {
  if (navigator.geolocation.getCurrentPosition) {
    navigator.geolocation.getCurrentPosition((position) => {
      query = [position.coords.latitude, position.coords.longitude];
    });
  }
}

//Change location
function getText() {
  query = document.querySelector("input").value;
}

function search() {
  getText();
  if(query === ""){
    weatherApp.emptyQueryError.classList.remove("hide")
  } else {
    weatherApp.closeModal(weatherApp.searchModal);
    weatherApp.openModal(weatherApp.loadingOrErrorModal);
    weatherApp.request(weatherApp.formatQuery(query), dataDump);
  }

}

function waitForInfo() {
  setTimeout(() => {
    if (query[0] !== undefined) {
      weatherApp.request(weatherApp.formatQuery(query), dataDump);
    } else {
      weatherApp.showInternetError();
    }
  }, 20000);
}
