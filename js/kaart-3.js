"use strict";

let dataCovid = [];
let dataCountries = [];

let map;

const convertNumber = function (oldNumber) {
  let newNumber = String(oldNumber);

  if (newNumber.length > 3) {
    newNumber =
      newNumber.slice(0, newNumber.length - 3) +
      "." +
      newNumber.slice(newNumber.length - 3, newNumber.length);

    if (newNumber.length > 7) {
      newNumber =
        newNumber.slice(0, newNumber.length - 7) +
        "." +
        newNumber.slice(newNumber.length - 7, newNumber.length);
    }
  }
  return newNumber;
};

const searchForCountryObject = function (searchItem, type) {
  if (type == "geojson") {
    for (const country of dataCountries) {
      if (country.geojson.name == searchItem) {
        return country;
      }
    }
  }
};

const selectCountry = function (e, feature) {
  //GeoJSON naam van land waar op geklikt werd.
  const nameCountryGeoJSON = feature.properties.name;

  //Ophalen van het object uit de lijst van de connectie
  const objectCountry = searchForCountryObject(nameCountryGeoJSON, "geojson");

  //Ophalen van de covid data voor dat land
  let covidDataCountry;

  for (const key in dataCovid) {
    if (dataCovid[key].country == objectCountry.covid.name) {
      covidDataCountry = dataCovid[key];
    }
  }

  let popupOptions = {
    maxWidth: 450,
  };

  let popupContent;

  //Controleren of er data is voor het land
  if (covidDataCountry == undefined) {
    //Geen covid data
    popupContent = `<div class="c-kaart__popup">
      <div class="c-kaart__popup__cijfers">
        <p>Geen data gevonden voor ${objectCountry.translations.NL}</p>
      </div>
    </div>`;
  } else {
    //Wel data gevonden
    popupContent = `<div class="c-kaart__popup">
      <p class="c-kaart__popup__land">
        <img
          src="${covidDataCountry.countryInfo.flag}"
          alt=""
          class="c-kaart__popup__vlag"
        />
        ${objectCountry.translations.NL}
      </p>
      <div class="c-kaart__popup__cijfers">
        <div>
          <p class="c-kaart__popup__title">Aantal besmettingen:</p>
          <p>${convertNumber(covidDataCountry.todayCases)}</p>
        </div>
        <div>
          <p class="c-kaart__popup__title">Aantal doden:</p>
          <p>${convertNumber(covidDataCountry.todayDeaths)}</p>
        </div>
        <div>
          <p class="c-kaart__popup__title">Aantal herstelde gevallen:</p>
          <p>${convertNumber(covidDataCountry.todayRecovered)}</p>
        </div>
      </div>
      <div class="c-kaart__popup__link">
        <a href="#">Bekijk alle cijfers</a>
      </div>
    </div>`;
  }

  if (window.innerWidth > 575) {
    document.addEventListener("resize", function () {
      document.querySelector(".js-kaart-popup").style.display = "none";
    });
    //Tonen van de popup op de kaart
    let popup = L.popup(popupOptions)
      .setLatLng(e.latlng)
      .setContent(popupContent)
      .openOn(map);
  } else {
    //Controleren of er data is voor het land
    if (covidDataCountry == undefined) {
      //Geen covid data
      document.querySelector(".js-kaart-popup").style.display = "block";
      document.querySelector(
        ".js-kaart-popup"
      ).innerHTML = `<div class="c-kaart__popup">
      <div class="c-kaart__popup__cijfers">
        <p>Geen data gevonden voor ${objectCountry.translations.NL}</p>
      </div>
    </div>`;
    } else {
      //Tonen van de popup onder de kaart
      document.querySelector(".js-kaart-popup").style.display = "block";
      document.querySelector(".js-kaart-popup").innerHTML = `
      <p class="c-kaart__popup__land">
        <img
          src="${covidDataCountry.countryInfo.flag}"
          alt=""
          class="c-kaart__popup__vlag"
        />
        ${objectCountry.translations.NL}
      </p>
      <div class="c-kaart__popup__cijfers">
        <div>
          <p class="c-kaart__popup__title">Aantal besmettingen:</p>
          <p>${convertNumber(covidDataCountry.todayCases)}</p>
        </div>
        <div>
          <p class="c-kaart__popup__title">Aantal doden:</p>
          <p>${convertNumber(covidDataCountry.todayDeaths)}</p>
        </div>
        <div>
          <p class="c-kaart__popup__title">Aantal herstelde gevallen:</p>
          <p>${convertNumber(covidDataCountry.todayRecovered)}</p>
        </div>
      </div>
      <div class="c-kaart__popup__link">
        <a href="#">Bekijk alle cijfers</a>
      </div>
    `;
    }
  }
};

const mouseOutCountry = function (e) {
  //Effect weghalen bij de mouseover van een land
  e.target.setStyle({
    fillColor: "white",
    color: "black",
    weight: 1,
    opacity: 0.05,
    fillOpacity: 0.8,
  });
};

const mouseOverCountry = function (e) {
  //Kleur geven bij hover
  e.target.setStyle({
    fillColor: "#354B60",
    color: "black",
    weight: 1,
    opacity: 0.1,
    fillOpacity: 0.5,
  });
};

const onEachFeature = function (feature, layer) {
  //Effect toevoegen bij de mouseover van een land
  layer.addEventListener("mouseover", function (e) {
    mouseOverCountry(e);
  });

  //Het effect van de mouseout weghalen
  layer.addEventListener("mouseout", function (e) {
    mouseOutCountry(e);
  });

  //Effect toevoegen wanneer je op een land klikt of selecteert
  layer.addEventListener("click", function (e) {
    selectCountry(e, feature);
  });
};

const setMapWithGeoJSON = function (dataGeoJSON) {
  //Creëren van de kaart
  map = L.map("map", {
    minZoom: 2,
    zoomControl: false,
  }).setView([30, 0], 2);

  //Controls rechtsonderaan zetten
  L.control.zoom({ position: "bottomright" }).addTo(map);

  //Maken van een stylingsobject
  let styleGeoData = {
    fillColor: "white",
    color: "black",
    weight: 1,
    opacity: 0.1,
    fillOpacity: 0.8,
  };

  //GeoJSON toevoegen aan de kaart met bijhorende style
  L.geoJSON(dataGeoJSON, {
    style: styleGeoData,
    onEachFeature: onEachFeature,
  }).addTo(map);

  //Kaart een blauwe achtergrondkleur geven
  document.querySelector("#map").style.backgroundColor = "#a7c8eb";
};

const verwerkDataCountriesConnection = function (data) {
  dataCountries = data;
};

const verwerkDataCovid = function (data) {
  dataCovid = data;
};

const getDataCountriesConnection = function () {
  //     //Pad naar JSON
  const path = "../data/countries.json";

  //Fetchen van data
  fetch(path)
    .then((response) => response.json())
    .then((data) => verwerkDataCountriesConnection(data));
};

const getDataGeoJSON = function () {
  //Pad naar JSON
  const path = "../data/geojson.json";

  //Fetchen van data
  fetch(path)
    .then((response) => response.json())
    .then((data) => setMapWithGeoJSON(data));
};

const getDataCovid = function () {
  //Pad naar JSON
  const path = "https://disease.sh/v3/covid-19/countries?yesterday=true";

  //Fetchen van data
  fetch(path)
    .then((response) => response.json())
    .then((data) => verwerkDataCovid(data));
};

document.addEventListener("DOMContentLoaded", function () {
  //Ophalen van de Covid-19 data
  getDataCovid();

  //Ophalen van de JSON die de connectie maakt tussen alles
  getDataCountriesConnection();

  //Ophalen van de geoJSON
  getDataGeoJSON();
});
