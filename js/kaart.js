"use strict";
let covidData = [];


const onEachFeature = function (feature, layer) {

  // console.log(feature);
  layer.addEventListener("mouseover", function (e) {
    // e.layer.options.fillColor = "green";

    let countryData;
    console.log(feature.properties.name);

    for (const key in covidData) {
      if (covidData[key].country == feature.properties.name) {
        countryData = covidData[key];
      }
    }
    // console.log(countryData);
    e.target.setStyle({
      fillColor: "#354B60",
      color: "black",
      weight: 1,
      opacity: 0.1,
      fillOpacity: 0.5,
    });
  });
  layer.addEventListener("mouseout", function (e) {
    // e.layer.options.fillColor = "green";
    e.target.setStyle({
      fillColor: "white",
      color: "black",
      weight: 1,
      opacity: 0.05,
      fillOpacity: 0.8,
    });
  });

  // layer.path.classList.add("map__country");
};

const setMapWithGeoJSON = function (dataGeoJSON) {
  //Create a map
  let map = L.map("map", {
    minZoom: 2,
    zoomControl: false,
  }).setView([30, 0], 2);
  // map.zoomControl = false;
  // new L.Control.Zoom({ position: "bottomright" }).addTo(map);

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
    style: styleGeoData,
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

document.addEventListener("DOMContentLoaded", function () {
  //Ophalen van de geoJSON
  getDataCovidJSON();
  getDataGeoJSON();
});
