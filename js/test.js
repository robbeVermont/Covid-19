"use strict";

const logNumbers = function (data) {
  console.log(data);
};

const getNumbers = function () {
  //ophalen van de externe json file
  fetch("https://disease.sh/v3/covid-19/historical?lastdays=7")
    .then(function (response) {
      if (!response.ok) {
        throw Error(`probleem bij de fetch(). Statuscode: ${response.status}`);
      } else {
        // console.info("er is een response terug gekomen");
        return response.json();
      }
    })
    .then(function (jsonObject) {
      // console.info("JSON object is aangemaakt");

      //functie verwerkenHowestData oproepen
      logNumbers(jsonObject);
    })
    //als de fout opgeworpen is vangen we ze hier op
    .catch(function (error) {
      console.error(`fout bij het verwerken van de jsonfile ${error}`);
    });
};

document.addEventListener("DOMContentLoaded", function () {
  // console.info("DOM geladen");
  getNumbers();
});
