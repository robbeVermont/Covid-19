"use strict";
let covidData = [];
let countries = [];

const GeoToCovid = function (nameGeo) {
  let nameCovid;
  for (const country of countries) {
    if (nameGeo == country.geojson.name) {
      nameCovid = country.covid.name;
    }
  }
  return nameCovid;
};

function getColor(d) {
  return d > 1000
    ? "#800026"
    : d > 500
    ? "#BD0026"
    : d > 200
    ? "#E31A1C"
    : d > 100
    ? "#FC4E2A"
    : d > 50
    ? "#FD8D3C"
    : d > 20
    ? "#FEB24C"
    : d > 10
    ? "#FED976"
    : "#FFEDA0";
}

function style(feature) {
  // console.log(GeoToCovid(feature.properties.name));
  return {
    fillColor: getColor(feature.properties.name),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
}

const onEachFeature = function (feature, layer) {
  // console.log(feature);
  layer.addEventListener("mouseover", function (e) {
    let countryData;
    console.log(GeoToCovid(feature.properties.name));

    for (const key in covidData) {
      if (covidData[key].country == feature.properties.name) {
        countryData = covidData[key];
      }
    }
    e.target.setStyle({
      fillColor: "#354B60",
      color: "black",
      weight: 1,
      opacity: 0.1,
      fillOpacity: 0.5,
    });
  });
  layer.addEventListener("mouseout", function (e) {
    e.target.setStyle({
      fillColor: "white",
      color: "black",
      weight: 1,
      opacity: 0.05,
      fillOpacity: 0.8,
    });
  });
};

const setMapWithGeoJSON = function (dataGeoJSON) {
  let map = L.map("map", {
    minZoom: 2,
    zoomControl: false,
  }).setView([30, 0], 2);

  L.control
    .zoom({
      position: "bottomright",
    })
    .addTo(map);

  let styleGeoData = {
    fillColor: "white",
    color: "black",
    weight: 1,
    opacity: 0.1,
    fillOpacity: 0.8,
  };

  L.geoJson(dataGeoJSON, {
    style: style,
    onEachFeature: onEachFeature,
  }).addTo(map);

  document.querySelector("#map").style.backgroundColor = "#a7c8eb";
};

const verwerkCovidData = function (data) {
  covidData = data;
};

const getDataGeoJSON = function () {
  //Path naar geoJSON
  const pathToGeoJSON = "../data/geojson.json";

  //Ophalen van data van geoJSON
  fetch(pathToGeoJSON)
    .then((response) => response.json())
    .then((data) => setMapWithGeoJSON(data));
};

const getDataCovidJSON = function () {
  //Path naar covidJSON
  const pathToCovidJSON = "https://disease.sh/v3/covid-19/countries";

  //Ophalen van data van geoJSON
  fetch(pathToCovidJSON)
    .then((response) => response.json())
    .then((data) => verwerkCovidData(data));
};

const getDataCountriesJSON = function () {
  //Path naar covidJSON
  const pathToCovidJSON = "../data/countries.json";

  //Ophalen van data van geoJSON
  fetch(pathToCovidJSON)
    .then((response) => response.json())
    .then((data) => (countries = data));
};

document.addEventListener("DOMContentLoaded", function () {
  //Ophalen van de geoJSON
  getDataCovidJSON();
  getDataGeoJSON();
});
