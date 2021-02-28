"use strict";

let dataCovid = [];
let dataCountries = [];
let geoData = [];
let newGeoData = [];

let map;
let popup;

let link = "http://localhost/corona-website/covid19/detail#";

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
  } else if (type == "countryNL") {
    for (const country of dataCountries) {
      if (country.translations.NL == searchItem) {
        return country;
      }
    }
  }
};

const setPopupContent = function (objectCountry, covidDataCountry) {
  if (covidDataCountry == undefined) {
    //Geen coviddata gevonden
    return `<div class="c-kaart__popup"><div class="c-kaart__popup__cijfers"><p>Geen data gevonden voor ${objectCountry.translations.NL}</p></div></div>`;
  } else {
    //Wel coviddata gevonden
    return `<div class="c-kaart__popup"><p class="c-kaart__popup__land"><img src="${
      covidDataCountry.countryInfo.flag
    } "alt="" class="c-kaart__popup__vlag"/>${
      objectCountry.translations.NL
    }</p><div class="c-kaart__popup__cijfers"><div><p class="c-kaart__popup__title">Aantal besmettingen:</p><p>${convertNumber(
      covidDataCountry.todayCases
    )}</p></div><div><p class="c-kaart__popup__title">Aantal doden:</p><p>${convertNumber(
      covidDataCountry.todayDeaths
    )}</p></div><div><p class="c-kaart__popup__title">Aantal herstelde gevallen:</p><p>${convertNumber(
      covidDataCountry.todayRecovered
    )}</p></div></div><div class="c-kaart__popup__link"><a href="${
      link + objectCountry.url
    }">Bekijk alle cijfers</a></div></div>`;
  }
};

const showPopup = function (latlng, objectCountry, covidDataCountry) {
  if (window.innerWidth > 575) {
    //Popup op kaart
    let popupOptions = {
      maxWidth: 450,
    };

    let popup = L.popup(popupOptions)
      .setLatLng(latlng)
      .setContent(setPopupContent(objectCountry, covidDataCountry))
      .openOn(map);
  } else {
    //Popup onder kaart
    document.querySelector(".js-kaart-popup").style.display = "block";
    document.querySelector(".js-kaart-popup").innerHTML = setPopupContent(
      objectCountry,
      covidDataCountry
    );
  }
};

const goToCountry = function (dataGeoapify, objectCountry) {
  //Ophalen van de covid data voor dat land
  let covidDataCountry;

  for (const key in dataCovid) {
    if (dataCovid[key].country == objectCountry.covid.name) {
      covidDataCountry = dataCovid[key];
    }
  }

  let latlng = {
    lat: dataGeoapify.features[0].properties.lat,
    lng: dataGeoapify.features[0].properties.lon,
  };

  showPopup(latlng, objectCountry, covidDataCountry);
};

const clickOnCountry = function (e, feature) {
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

  let latlng = e.latlng;

  showPopup(latlng, objectCountry, covidDataCountry);
};

const mouseOutCountry = function (e, feature) {
  //Effect weghalen bij de mouseover van een land

  if (!newGeoData.includes(feature)) {
    e.target.setStyle({
      fillColor: "white",
      color: "black",
      weight: 1,
      opacity: 0.05,
      fillOpacity: 0.8,
    });
  } else {
    e.target.setStyle({
      fillColor: "#354B60",
      color: "black",
      weight: 1,
      opacity: 0.1,
      fillOpacity: 0.6,
    });
  }
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
  layer.addEventListener("mouseout", function (e, feature) {
    mouseOutCountry(e, layer.feature);
  });

  //Effect toevoegen wanneer je op een land klikt of selecteert
  layer.addEventListener("click", function (e) {
    clickOnCountry(e, feature);
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

  //GeoJSON toevoegen aan de kaart met bijhorende style
  L.geoJSON(dataGeoJSON, {
    style: style,
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

const getDataGeoapify = function (country) {
  const API_key = "ae0d2fc63ecd4c8a9f24aad5ea26a570";

  //Pad naar JSON
  const path = `https://api.geoapify.com/v1/geocode/search?text=${country.geojson.name}&limit=1&apiKey=${API_key}`;

  //Fetchen van data
  fetch(path)
    .then((response) => response.json())
    .then((data) => goToCountry(data, country));
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
    .then((data) => {
      geoData = data;
      setMapWithGeoJSON(data);
    });
};

const getDataCovid = function () {
  //Pad naar JSON
  const path = "https://disease.sh/v3/covid-19/countries?yesterday=true";

  //Fetchen van data
  fetch(path)
    .then((response) => response.json())
    .then((data) => {
      verwerkDataCovid(data);
    });
};

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector("#map")) {
    //Ophalen van de Covid-19 data
    getDataCovid();

    //Ophalen van de JSON die de connectie maakt tussen alles
    getDataCountriesConnection();

    //Ophalen van de geoJSON
    getDataGeoJSON();

    //Searchbar
    let html_searchbar;
    if (document.querySelector(".js-search-zoek-op-land")) {
      html_searchbar = document.querySelector(".js-search-zoek-op-land");
      html_searchbar.addEventListener("keyup", function (e) {
        let searchKeyword = e.target.value.toLowerCase();

        let filteredResults = dataCountries.filter((country) =>
          String(country.translations.NL)
            .toLocaleLowerCase()
            .startsWith(searchKeyword)
        );

        const html_results = document.querySelector(".js-search-results");
        html_results.innerHTML = "";

        if (searchKeyword != "") {
          if (filteredResults.length != 0) {
            if (filteredResults.length < 5) {
              for (const result of filteredResults) {
                html_results.innerHTML += `<a class="c-filter__search-result-item">${result.translations.NL}</a>`;
              }
            } else {
              for (let i = 0; i < 5; i++) {
                html_results.innerHTML += `<a class="c-filter__search-result-item">${filteredResults[i].translations.NL}</a>`;
              }
            }
          } else if (searchKeyword.length < 2) {
            for (const result of filteredResults) {
              html_results.innerHTML += `<a class="c-filter__search-result-item">${result.translations.NL}</a>`;
            }
          } else {
            html_results.innerHTML = "Oeps, geen overeenkomsten gevonden.";
          }
        }

        let html_resultLinks = document.querySelectorAll(
          ".c-filter__search-result-item"
        );

        for (const link of html_resultLinks) {
          link.addEventListener("click", function (e) {
            e.preventDefault();

            let countryNL = link.innerHTML;
            const objectCountry = searchForCountryObject(
              countryNL,
              "countryNL"
            );

            getDataGeoapify(objectCountry);
          });
        }
      });
    }
    //Filter klik
    if (document.querySelector(".c-filter__header")) {
      document
        .querySelector(".c-filter__header")
        .addEventListener("click", function () {
          if (
            document.querySelector(".c-filter__form-items").style.display ==
            "none"
          ) {
            document.querySelector(".c-filter__form-items").style.display =
              "block";
          } else {
            document.querySelector(".c-filter__form-items").style.display =
              "none";
          }
        });
    }

    if (document.querySelector(".js-submit")) {
      document
        .querySelector(".js-submit")
        .addEventListener("click", function (e) {
          e.preventDefault();
          newGeoData = [];
          document.querySelector(".c-filter__form-items").style.display =
            "none";
          const checkboxCases = document.querySelector(
            "#checkboxAantalBesmettingen"
          );
          const checkboxDeaths = document.querySelector("#checkboxAantalDoden");
          const minCases = parseInt(
            document.querySelector(".js-range-cases-min").value
          );
          const maxCases = parseInt(
            document.querySelector(".js-range-cases-max").value
          );
          const minDeaths = parseInt(
            document.querySelector(".js-range-deaths-min").value
          );
          const maxDeaths = parseInt(
            document.querySelector(".js-range-deaths-max").value
          );

          let countryList = [];

          if (checkboxCases.checked && !checkboxDeaths.checked) {
            for (const country of dataCovid) {
              if (
                country.todayCases <= maxCases &&
                country.todayCases >= minCases
              ) {
                countryList.push(country);
              }
            }
            for (const geoCountry of geoData.features) {
              for (const country of countryList) {
                if (
                  searchForCountryObject(geoCountry.properties.name, "geojson")
                ) {
                  if (
                    searchForCountryObject(
                      geoCountry.properties.name,
                      "geojson"
                    ).covid.name == country.country
                  ) {
                    newGeoData.push(geoCountry);
                  }
                }
              }
            }
            map.remove();
            setMapWithGeoJSON(geoData);
          } else if (checkboxDeaths.checked && !checkboxCases.checked) {
            for (const country of dataCovid) {
              if (
                country.todayDeaths <= maxDeaths &&
                country.todayDeaths >= minDeaths
              ) {
                countryList.push(country);
              }
            }
            for (const geoCountry of geoData.features) {
              for (const country of countryList) {
                if (
                  searchForCountryObject(geoCountry.properties.name, "geojson")
                ) {
                  if (
                    searchForCountryObject(
                      geoCountry.properties.name,
                      "geojson"
                    ).covid.name == country.country
                  ) {
                    newGeoData.push(geoCountry);
                  }
                }
              }
            }
            map.remove();
            setMapWithGeoJSON(geoData);
          } else if (checkboxDeaths.checked && checkboxCases.checked) {
            for (const country of dataCovid) {
              if (
                country.todayCases <= maxCases &&
                country.todayCases >= minCases &&
                country.todayDeaths <= maxDeaths &&
                country.todayDeaths >= minDeaths
              ) {
                countryList.push(country);
              }
            }

            for (const geoCountry of geoData.features) {
              for (const country of countryList) {
                if (
                  searchForCountryObject(geoCountry.properties.name, "geojson")
                ) {
                  if (
                    searchForCountryObject(
                      geoCountry.properties.name,
                      "geojson"
                    ).covid.name == country.country
                  ) {
                    newGeoData.push(geoCountry);
                  }
                }
              }
            }
            map.remove();
            setMapWithGeoJSON(geoData);
          } else if (!checkboxDeaths.checked && !checkboxCases.checked) {
            map.remove();
            setMapWithGeoJSON(geoData);
          }
        });
    }
  }
});

function style(feature) {
  let styleGeoData = {};

  if (newGeoData.includes(feature)) {
    styleGeoData = {
      fillColor: "#354B60",
      color: "black",
      weight: 1,
      opacity: 0.1,
      fillOpacity: 0.6,
    };
  } else {
    styleGeoData = {
      fillColor: "white",
      color: "black",
      weight: 1,
      opacity: 0.1,
      fillOpacity: 0.8,
    };
  }

  return styleGeoData;
}
