"use strict";

let covidData = [];
let countries = [];
let geojson;
var info = L.control();

let prevCountry;

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
  this.update();
  return this._div;
};

info.update = function (props) {
  if (props) {
    let cases = "onbekend";
    const covidName = GeoToCovid(props.name);
    if (covidName) {
      for (const country of covidData) {
        if (country.country == covidName) {
          cases = country.activePerOneMillion;
        }
      }

      this._div.innerHTML =
        "<div class='info-panel'>Covid besmettingen</div>" +
        (props
          ? "<b>" +
            GeoToNL(props.name) +
            "</b><br /><div class='info-panel--bottom'>" +
            convertNumber(cases) +
            " per miljoen inwoners</sup></div>"
          : "Hover over een land");
    } else {
      this._div.innerHTML =
        "<div class='info-panel'>Covid besmettingen</div>" +
        (props
          ? "<b>" +
            GeoToNL(props.name) +
            "</b><br />" +
            "<div class='info-panel--bottom'>Geen informatie beschikbaar</div>"
          : "Hover over een land");
    }
  } else {
    this._div.innerHTML =
      "<div>Covid besmettingen</div>" + "Hover over een land";
  }
};

const GeoToCovid = function (nameGeo) {
  let nameCovid;
  for (const key in countries) {
    if (nameGeo == countries[key].geojson.name) {
      nameCovid = countries[key].covid.name;
    }
  }
  return nameCovid;
};

const convertNumber = function (oldNumber) {
  const decimals = String(oldNumber).slice(
    String(oldNumber).length - 3,
    String(oldNumber).length
  );
  let newNumber = String(oldNumber).slice(0, String(oldNumber).length - 3);

  if (newNumber.length > 3) {
    newNumber =
      newNumber.slice(0, newNumber.length - 3) +
      " " +
      newNumber.slice(newNumber.length - 3, newNumber.length);

    if (newNumber.length > 7) {
      newNumber =
        newNumber.slice(0, newNumber.length - 7) +
        " " +
        newNumber.slice(newNumber.length - 7, newNumber.length);
    }
  }
  return newNumber + decimals;
};

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 2,
    color: "white",
    dashArray: "",
    fillOpacity: 1,
    opacity: 1,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties);
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);

  info.update();
}

const GeoToNL = function (nameGeo) {
  let nameCovid;

  for (const key in countries) {
    if (nameGeo == countries[key].geojson.name) {
      nameCovid = countries[key].translations.NL;
    }
  }
  return nameCovid;
};

function getColor(d) {
  return d > 999999
    ? "white"
    : d > 15000
    ? "#b40000"
    : d > 7500
    ? "#c03c0e"
    : d > 1000
    ? "#cc5d20"
    : d > 250
    ? "#d67a32"
    : d > 100
    ? "#e09645"
    : d > 50
    ? "#e8b15a"
    : d > 20
    ? "#f0cc73"
    : d > 1
    ? "#f7e690"
    : "#ffffc1";
}

function style(feature) {
  let covidList = [];
  for (const key in covidData) {
    covidList.push(covidData[key].country);
  }

  let countryData;
  let covidName = GeoToCovid(feature.properties.name);

  if (covidName && covidList.includes(covidName)) {
    for (const key in covidData) {
      if (covidData[key].country == covidName) {
        countryData = covidData[key];
      }
    }

    return {
      fillColor: getColor(countryData.activePerOneMillion),
      weight: 1,
      opacity: 0.5,
      color: "white",
      fillOpacity: 0.8,
    };
  } else {
    return {
      fillColor: getColor(1000000),
      weight: 1,
      opacity: 0.5,
      color: "white",
      fillOpacity: 0.7,
    };
  }
}

const onEachFeature = function onEachFeature(feature, layer) {
  layer.addEventListener("mouseover", function (e) {
    highlightFeature(e);
  });
  layer.addEventListener("mouseout", function (e) {
    resetHighlight(e);
  });
  layer.addEventListener("click", function (e) {
    if (prevCountry) {
      resetHighlight(prevCountry);
    }
    prevCountry = e;
    highlightFeature(e);
  });
};

const setMapWithGeoJSON = function (dataGeoJSON) {

  let map = L.map("mymap", {
    minZoom: 2,
    zoomControl: false,
  }).setView([30, 0], 2);

  L.control
    .zoom({
      position: "bottomright",
    })
    .addTo(map);

  geojson = L.geoJson(dataGeoJSON, {
    style: style,
    onEachFeature,
    onEachFeature,
  }).addTo(map);

  var legend = L.control({ position: "bottomleft" });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "info legend"),
      grades = [0, 1, 20, 50, 100, 250, 1000, 7500, 15000],
      labels = [];

    div.innerHTML += '<div style="background:rgba(white, 0.7);">';

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
      if (i == 0) {
        div.innerHTML +=
          '<div style="display:flex; text-allign:center;"><div class="legend--background" style=" background-color:' +
          getColor(grades[i] + 1) +
          '"></div> <div style="padding:0.2rem 0 0 1rem">' +
          0 +
          (grades[i + 1]
            ? "&ndash;" + grades[i + 1] + "<br></div></div>"
            : "+");
      } else {
        div.innerHTML +=
          '<div style="display:flex; text-allign:center;"><div style="width:20px; height:20px; background-color:' +
          getColor(grades[i] + 1) +
          '"></div> <div style="padding:0.2rem 0 0 1rem">' +
          (grades[i] + 1) +
          (grades[i + 1]
            ? "&ndash;" + grades[i + 1] + "<br></div></div>"
            : "+");
      }
    }

    div.innerHTML +=
      "<div style='display:flex; margin-top:1rem; text-allign:center;'><div class='legend--background' style='border:solid 1px rgba(0,0,0,0.4); background-color:white'></div> <div style='padding:0.2rem 0 0 1rem'> Geen informatie<br></div></div></div>";
    return div;
  };
  legend.addTo(map);

  info.addTo(map);

  document.querySelector("#mymap").style.backgroundColor = "#a7c8eb";
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
    .then((data) => {
      covidData = data;
    });
};

const getDataCountriesJSON = function () {
  //Path naar covidJSON
  const pathToCountriesJSON = "../data/countries.json";

  //Ophalen van data van geoJSON
  fetch(pathToCountriesJSON)
    .then((response) => response.json())
    .then((data) => (countries = data));
};

document.addEventListener("DOMContentLoaded", function () {
  //Ophalen van de geoJSON

  getDataCountriesJSON();
  getDataCovidJSON();
  getDataGeoJSON();
});
