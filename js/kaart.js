"use strict";

let dataCovid = [];
let dataCountries = [];
let geoData = [];
let newGeoData = [];

let map;
let popup;

let link = "https://www.mariodakhil.be/corona-website/covid19/detail#";

const geoLink = "https://api.jsonbin.io/b/603cc6849342196a6a6a8f7e";
const countriesLink = "https://api.jsonbin.io/b/60338a17f1be644b0a62f473/5";

const characterMap = {
  À: "A",
  Á: "A",
  Â: "A",
  Ã: "A",
  Ä: "A",
  Å: "A",
  Ấ: "A",
  Ắ: "A",
  Ẳ: "A",
  Ẵ: "A",
  Ặ: "A",
  Æ: "AE",
  Ầ: "A",
  Ằ: "A",
  Ȃ: "A",
  Ç: "C",
  Ḉ: "C",
  È: "E",
  É: "E",
  Ê: "E",
  Ë: "E",
  Ế: "E",
  Ḗ: "E",
  Ề: "E",
  Ḕ: "E",
  Ḝ: "E",
  Ȇ: "E",
  Ì: "I",
  Í: "I",
  Î: "I",
  Ï: "I",
  Ḯ: "I",
  Ȋ: "I",
  Ð: "D",
  Ñ: "N",
  Ò: "O",
  Ó: "O",
  Ô: "O",
  Õ: "O",
  Ö: "O",
  Ø: "O",
  Ố: "O",
  Ṍ: "O",
  Ṓ: "O",
  Ȏ: "O",
  Ù: "U",
  Ú: "U",
  Û: "U",
  Ü: "U",
  Ý: "Y",
  à: "a",
  á: "a",
  â: "a",
  ã: "a",
  ä: "a",
  å: "a",
  ấ: "a",
  ắ: "a",
  ẳ: "a",
  ẵ: "a",
  ặ: "a",
  æ: "ae",
  ầ: "a",
  ằ: "a",
  ȃ: "a",
  ç: "c",
  ḉ: "c",
  è: "e",
  é: "e",
  ê: "e",
  ë: "e",
  ế: "e",
  ḗ: "e",
  ề: "e",
  ḕ: "e",
  ḝ: "e",
  ȇ: "e",
  ì: "i",
  í: "i",
  î: "i",
  ï: "i",
  ḯ: "i",
  ȋ: "i",
  ð: "d",
  ñ: "n",
  ò: "o",
  ó: "o",
  ô: "o",
  õ: "o",
  ö: "o",
  ø: "o",
  ố: "o",
  ṍ: "o",
  ṓ: "o",
  ȏ: "o",
  ù: "u",
  ú: "u",
  û: "u",
  ü: "u",
  ý: "y",
  ÿ: "y",
  Ā: "A",
  ā: "a",
  Ă: "A",
  ă: "a",
  Ą: "A",
  ą: "a",
  Ć: "C",
  ć: "c",
  Ĉ: "C",
  ĉ: "c",
  Ċ: "C",
  ċ: "c",
  Č: "C",
  č: "c",
  C̆: "C",
  c̆: "c",
  Ď: "D",
  ď: "d",
  Đ: "D",
  đ: "d",
  Ē: "E",
  ē: "e",
  Ĕ: "E",
  ĕ: "e",
  Ė: "E",
  ė: "e",
  Ę: "E",
  ę: "e",
  Ě: "E",
  ě: "e",
  Ĝ: "G",
  Ǵ: "G",
  ĝ: "g",
  ǵ: "g",
  Ğ: "G",
  ğ: "g",
  Ġ: "G",
  ġ: "g",
  Ģ: "G",
  ģ: "g",
  Ĥ: "H",
  ĥ: "h",
  Ħ: "H",
  ħ: "h",
  Ḫ: "H",
  ḫ: "h",
  Ĩ: "I",
  ĩ: "i",
  Ī: "I",
  ī: "i",
  Ĭ: "I",
  ĭ: "i",
  Į: "I",
  į: "i",
  İ: "I",
  ı: "i",
  Ĳ: "IJ",
  ĳ: "ij",
  Ĵ: "J",
  ĵ: "j",
  Ķ: "K",
  ķ: "k",
  Ḱ: "K",
  ḱ: "k",
  K̆: "K",
  k̆: "k",
  Ĺ: "L",
  ĺ: "l",
  Ļ: "L",
  ļ: "l",
  Ľ: "L",
  ľ: "l",
  Ŀ: "L",
  ŀ: "l",
  Ł: "l",
  ł: "l",
  Ḿ: "M",
  ḿ: "m",
  M̆: "M",
  m̆: "m",
  Ń: "N",
  ń: "n",
  Ņ: "N",
  ņ: "n",
  Ň: "N",
  ň: "n",
  ŉ: "n",
  N̆: "N",
  n̆: "n",
  Ō: "O",
  ō: "o",
  Ŏ: "O",
  ŏ: "o",
  Ő: "O",
  ő: "o",
  Œ: "OE",
  œ: "oe",
  P̆: "P",
  p̆: "p",
  Ŕ: "R",
  ŕ: "r",
  Ŗ: "R",
  ŗ: "r",
  Ř: "R",
  ř: "r",
  R̆: "R",
  r̆: "r",
  Ȓ: "R",
  ȓ: "r",
  Ś: "S",
  ś: "s",
  Ŝ: "S",
  ŝ: "s",
  Ş: "S",
  Ș: "S",
  ș: "s",
  ş: "s",
  Š: "S",
  š: "s",
  Ţ: "T",
  ţ: "t",
  ț: "t",
  Ț: "T",
  Ť: "T",
  ť: "t",
  Ŧ: "T",
  ŧ: "t",
  T̆: "T",
  t̆: "t",
  Ũ: "U",
  ũ: "u",
  Ū: "U",
  ū: "u",
  Ŭ: "U",
  ŭ: "u",
  Ů: "U",
  ů: "u",
  Ű: "U",
  ű: "u",
  Ų: "U",
  ų: "u",
  Ȗ: "U",
  ȗ: "u",
  V̆: "V",
  v̆: "v",
  Ŵ: "W",
  ŵ: "w",
  Ẃ: "W",
  ẃ: "w",
  X̆: "X",
  x̆: "x",
  Ŷ: "Y",
  ŷ: "y",
  Ÿ: "Y",
  Y̆: "Y",
  y̆: "y",
  Ź: "Z",
  ź: "z",
  Ż: "Z",
  ż: "z",
  Ž: "Z",
  ž: "z",
  ſ: "s",
  ƒ: "f",
  Ơ: "O",
  ơ: "o",
  Ư: "U",
  ư: "u",
  Ǎ: "A",
  ǎ: "a",
  Ǐ: "I",
  ǐ: "i",
  Ǒ: "O",
  ǒ: "o",
  Ǔ: "U",
  ǔ: "u",
  Ǖ: "U",
  ǖ: "u",
  Ǘ: "U",
  ǘ: "u",
  Ǚ: "U",
  ǚ: "u",
  Ǜ: "U",
  ǜ: "u",
  Ứ: "U",
  ứ: "u",
  Ṹ: "U",
  ṹ: "u",
  Ǻ: "A",
  ǻ: "a",
  Ǽ: "AE",
  ǽ: "ae",
  Ǿ: "O",
  ǿ: "o",
  Þ: "TH",
  þ: "th",
  Ṕ: "P",
  ṕ: "p",
  Ṥ: "S",
  ṥ: "s",
  X́: "X",
  x́: "x",
  Ѓ: "Г",
  ѓ: "г",
  Ќ: "К",
  ќ: "к",
  A̋: "A",
  a̋: "a",
  E̋: "E",
  e̋: "e",
  I̋: "I",
  i̋: "i",
  Ǹ: "N",
  ǹ: "n",
  Ồ: "O",
  ồ: "o",
  Ṑ: "O",
  ṑ: "o",
  Ừ: "U",
  ừ: "u",
  Ẁ: "W",
  ẁ: "w",
  Ỳ: "Y",
  ỳ: "y",
  Ȁ: "A",
  ȁ: "a",
  Ȅ: "E",
  ȅ: "e",
  Ȉ: "I",
  ȉ: "i",
  Ȍ: "O",
  ȍ: "o",
  Ȑ: "R",
  ȑ: "r",
  Ȕ: "U",
  ȕ: "u",
  B̌: "B",
  b̌: "b",
  Č̣: "C",
  č̣: "c",
  Ê̌: "E",
  ê̌: "e",
  F̌: "F",
  f̌: "f",
  Ǧ: "G",
  ǧ: "g",
  Ȟ: "H",
  ȟ: "h",
  J̌: "J",
  ǰ: "j",
  Ǩ: "K",
  ǩ: "k",
  M̌: "M",
  m̌: "m",
  P̌: "P",
  p̌: "p",
  Q̌: "Q",
  q̌: "q",
  Ř̩: "R",
  ř̩: "r",
  Ṧ: "S",
  ṧ: "s",
  V̌: "V",
  v̌: "v",
  W̌: "W",
  w̌: "w",
  X̌: "X",
  x̌: "x",
  Y̌: "Y",
  y̌: "y",
  A̧: "A",
  a̧: "a",
  B̧: "B",
  b̧: "b",
  Ḑ: "D",
  ḑ: "d",
  Ȩ: "E",
  ȩ: "e",
  Ɛ̧: "E",
  ɛ̧: "e",
  Ḩ: "H",
  ḩ: "h",
  I̧: "I",
  i̧: "i",
  Ɨ̧: "I",
  ɨ̧: "i",
  M̧: "M",
  m̧: "m",
  O̧: "O",
  o̧: "o",
  Q̧: "Q",
  q̧: "q",
  U̧: "U",
  u̧: "u",
  X̧: "X",
  x̧: "x",
  Z̧: "Z",
  z̧: "z",
};

let chars = Object.keys(characterMap).join("|");
let allAccents = new RegExp(chars, "g");
let firstAccent = new RegExp(chars, "");

const removeAccents = function (string) {
  return string.replace(allAccents, function (match) {
    return characterMap[match];
  });
};

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
    scrollWheelZoom: false,
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
  //Pad naar JSON

  //Fetchen van data
  fetch(countriesLink)
    .then((response) => response.json())
    .then((data) => verwerkDataCountriesConnection(data));
};

const getDataGeoJSON = function () {
  //Pad naar JSON

  //Fetchen van data
  fetch(geoLink)
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
        let searchKeyword = removeAccents(e.target.value.toLowerCase());

        let filteredResults = dataCountries.filter((country) =>
          String(removeAccents(country.translations.NL))
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
      document.querySelector(".c-filter__form-items").style.display = "none";

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
