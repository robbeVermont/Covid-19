"use strict";
let screenWidth;
const colorBlue = "#354b60";
const colorGreen = "#00B8B1";
const colorGrey = "#a3a7ac";

let country, countryData;
let countryTranslation = [];

const colorArray = [
  "#DF7A7A",
  "#D8E8A3",
  "#B2B8F1",
  "#7BC16E",
  "#C46DE2",
  "#5E8D5E",
];

const dagen = [
  "Zondag",
  "Maandag",
  "Dinsdag",
  "Woensdag",
  "Donderdag",
  "Vrijdag",
  "Zaterdag",
];

const months = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december",
];

const continents = {
  "Noord Amerika": [
    "Anguilla",
    "Antigua and Barbuda",
    "Aruba",
    "Bahamas",
    "Barbados",
    "Belize",
    "Bermuda",
    "British Virgin Islands",
    "Canada",
    "Caribbean Netherlands",
    "Cayman Islands",
    "Costa Rica",
    "Cuba",
    "Curaçao",
    "Dominica",
    "Dominican Republic",
    "El Salvador",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guatemala",
    "Haiti",
    "Honduras",
    "Jamaica",
    "Martinique",
    "Mexico",
    "Montserrat",
    "Nicaragua",
    "Panama",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin",
    "Saint Pierre Miquelon",
    "Saint Vincent and the Grenadines",
    "Sint Maarten",
    "St. Barth",
    "Trinidad and Tobago",
    "Turks and Caicos Islands",
    "USA",
  ],
  Azië: [
    "Afghanistan",
    "Armenia",
    "Azerbaijan",
    "Bahrain",
    "Bangladesh",
    "Bhutan",
    "Brunei",
    "Cambodia",
    "China",
    "Cyprus",
    "Georgia",
    "Hong Kong",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Israel",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic",
    "Lebanon",
    "Macao",
    "Malaysia",
    "Maldives",
    "Mongolia",
    "Myanmar",
    "Nepal",
    "Oman",
    "Pakistan",
    "Palestine",
    "Philippines",
    "Qatar",
    "S. Korea",
    "Saudi Arabia",
    "Singapore",
    "Sri Lanka",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Thailand",
    "Timor-Leste",
    "Turkey",
    "UAE",
    "Uzbekistan",
    "Vietnam",
    "Yemen",
  ],
  "Zuid Amerika": [
    "Argentina",
    "Bolivia",
    "Brazil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Falkland Islands (Malvinas)",
    "French Guiana",
    "Guyana",
    "Paraguay",
    "Peru",
    "Suriname",
    "Uruguay",
    "Venezuela",
  ],
  Europa: [
    "Albania",
    "Andorra",
    "Austria",
    "Belarus",
    "Belgium",
    "Bosnia",
    "Bulgaria",
    "Channel Islands",
    "Croatia",
    "Czechia",
    "Denmark",
    "Estonia",
    "Faroe Islands",
    "Finland",
    "France",
    "Germany",
    "Gibraltar",
    "Greece",
    "Holy See (Vatican City State)",
    "Hungary",
    "Iceland",
    "Ireland",
    "Isle of Man",
    "Italy",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macedonia",
    "Malta",
    "Moldova",
    "Monaco",
    "Montenegro",
    "Netherlands",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "San Marino",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "UK",
    "Ukraine",
  ],
  Afrika: [
    "Algeria",
    "Angola",
    "Benin",
    "Botswana",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cameroon",
    "Central African Republic",
    "Chad",
    "Comoros",
    "Congo",
    "Côte d'Ivoire",
    "DRC",
    "Djibouti",
    "Egypt",
    "Equatorial Guinea",
    "Eritrea",
    "Ethiopia",
    "Gabon",
    "Gambia",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libyan Arab Jamahiriya",
    "Madagascar",
    "Malawi",
    "Mali",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Niger",
    "Nigeria",
    "Rwanda",
    "Réunion",
    "Sao Tome and Principe",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Sudan",
    "Swaziland",
    "Tanzania",
    "Togo",
    "Tunisia",
    "Uganda",
    "Western Sahara",
    "Zambia",
    "Zimbabwe",
  ],
  Oceanië: [
    "Australia",
    "Fiji",
    "French Polynesia",
    "Marshall Islands",
    "Micronesia",
    "New Caledonia",
    "New Zealand",
    "Papua New Guinea",
    "Samoa",
    "Solomon Islands",
    "Vanuatu",
    "Wallis and Futuna",
  ],
};

const translateName = function (nameEng) {
  let nameNL;
  for (const country of countryTranslation) {
    if (nameEng == country.EN_Covid) {
      nameNL = country.NL;
    }
  }
  return nameNL;
};

const convertNumber = function (oldNumber) {
  let newNumber = String(oldNumber);

  if (newNumber.length > 3) {
    newNumber =
      newNumber.slice(0, newNumber.length - 3) +
      "," +
      newNumber.slice(newNumber.length - 3, newNumber.length);

    if (newNumber.length > 7) {
      newNumber =
        newNumber.slice(0, newNumber.length - 7) +
        "," +
        newNumber.slice(newNumber.length - 7, newNumber.length);
    }
  }
  return newNumber;
};

const convertDate = function (oldDate) {
  let dateArray = oldDate.split("/");

  dateArray.pop();
  for (let number = 0; number < 2; number += 1) {
    if (dateArray[number].split("").length == 1) {
      dateArray[number] = "0" + dateArray[number];
    }
  }
  const newDate = dateArray[1] + "/" + dateArray[0];

  return newDate;
};

const convertTotalToNew = function (totalArray) {
  let newArray = [];

  for (let i = 0; i < totalArray.length - 1; i++) {
    newArray[i] = totalArray[i + 1] - totalArray[i];
  }
  return newArray;
};

const setCountryData = function (data) {
  if (data) {
    countryData = data;

    if (document.querySelector(".js-country")) {
      const titleNames = document.querySelectorAll(".js-country");
      const countryNL = translateName(data.country);

      for (let titleName of titleNames) {
        titleName.innerHTML = countryNL;
      }
    }
    if (document.querySelector(".js-countryimg")) {
      document
        .querySelector(".js-countryimg")
        .setAttribute("src", data.countryInfo.flag);
    }
  }

  laadGrafieken(data.country);
};

const laadMultipleLineGrafiek = function (data, id) {
  let dateData = [];
  let datesTooltip = [];

  let showToolbar = true;
  let fontSize = 14;
  let fontSizeLegend = 14;
  if (screenWidth < 992) {
    showToolbar = false;
  }
  if (screenWidth < 576) {
    fontSize = 12;
    fontSizeLegend = 10;
  }
  let strokeWidth = 5;
  let rounding = 2;
  if (screenWidth < 768) {
    strokeWidth = 2;
    rounding = 0;
  }

  let dataNA = [0, 0, 0, 0, 0, 0, 0, 0];
  let dataZA = [0, 0, 0, 0, 0, 0, 0, 0];
  let dataEU = [0, 0, 0, 0, 0, 0, 0, 0];
  let dataAZ = [0, 0, 0, 0, 0, 0, 0, 0];
  let dataAF = [0, 0, 0, 0, 0, 0, 0, 0];
  let dataOC = [0, 0, 0, 0, 0, 0, 0, 0];

  for (const key in data[0].timeline.deaths) {
    let dateArray = key.split("/");
    const year = "20" + dateArray[2];

    dateData.push(convertDate(key));

    const tempDate = new Date(year, dateArray[0] - 1, dateArray[1]);

    datesTooltip.push(
      dagen[tempDate.getDay()] +
        " " +
        dateArray[1] +
        " " +
        months[dateArray[0] - 1] +
        " " +
        year
    );
  }

  dateData.shift();
  datesTooltip.shift();

  for (const land of data) {
    let tempDeathsData = [];

    for (const key in land.timeline.deaths) {
      tempDeathsData[key] = land.timeline.deaths[key];
    }

    let counter = 0;
    if (continents["Noord Amerika"].includes(land.country)) {
      for (const key in tempDeathsData) {
        dataNA[counter] += parseInt(tempDeathsData[key]);
        counter += 1;
      }
    } else if (continents["Zuid Amerika"].includes(land.country)) {
      for (const key in tempDeathsData) {
        dataZA[counter] += parseInt(tempDeathsData[key]);
        counter += 1;
      }
    } else if (continents["Europa"].includes(land.country)) {
      for (const key in tempDeathsData) {
        dataEU[counter] += parseInt(tempDeathsData[key]);
        counter += 1;
      }
    } else if (continents["Azië"].includes(land.country)) {
      for (const key in tempDeathsData) {
        dataAZ[counter] += parseInt(tempDeathsData[key]);
        counter += 1;
      }
    } else if (continents["Oceanië"].includes(land.country)) {
      for (const key in tempDeathsData) {
        dataOC[counter] += parseInt(tempDeathsData[key]);
        counter += 1;
      }
    } else if (continents["Afrika"].includes(land.country)) {
      for (const key in tempDeathsData) {
        dataAF[counter] += parseInt(tempDeathsData[key]);
        counter += 1;
      }
    }
  }

  var options = {
    chart: {
      toolbar: {
        show: showToolbar,
      },
      type: "line",
      height: "100%",
    },
    colors: colorArray,
    series: [
      {
        name: "Noord Amerika",
        data: convertTotalToNew(dataNA),
      },
      {
        name: "Zuid Amerika",
        data: convertTotalToNew(dataZA),
      },
      {
        name: "Europa",
        data: convertTotalToNew(dataEU),
      },
      {
        name: "Azië",
        data: convertTotalToNew(dataAZ),
      },
      {
        name: "Afrika",
        data: convertTotalToNew(dataAF),
      },
      {
        name: "Oceanië",
        data: convertTotalToNew(dataOC),
      },
    ],

    stroke: {
      show: true,
      curve: "straight",

      colors: colorArray,
      width: strokeWidth,
    },
    grid: {
      show: true,
      position: "back",
      borderColor: "rgba(53,75,96,0.4)",
    },
    xaxis: {
      labels: {
        rotate: 0,
        style: {
          fontSize: fontSize,
          fontFamily: '"Mulish", cursive',
        },
      },
      categories: dateData,
      axisBorder: {
        show: true,
        color: colorBlue,
        height: 2,
        offsetY: 0,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: colorBlue,
        height: 10,
        width: 5,
        offsetX: 1,
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
        color: colorBlue,
        width: 2,
        offsetY: -1,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: colorBlue,
        height: 5,
        width: 10,
        offsetY: 1,
      },
      labels: {
        style: {
          fontSize: fontSize,
          fontFamily: '"Mulish", cursive',
        },
        formatter: (value) => {
          if (value > 999 && value < 1000000) {
            return (value / 1000).toFixed(rounding) + "k ";
          } else if (value > 999999) {
            return (value / 1000000).toFixed(rounding) + "M ";
          } else if (value < 1000) {
            return value;
          }
        },
      },
    },
    tooltip: {
      style: {
        fontFamily: '"Mulish", cursive',
      },
      x: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          return datesTooltip[dataPointIndex];
        },
      },
      y: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          var numberString = String(value);
          if (numberString.length > 3) {
            numberString =
              numberString.slice(0, numberString.length - 3) +
              "," +
              numberString.slice(numberString.length - 3, numberString.length);

            if (numberString.length > 7) {
              numberString =
                numberString.slice(0, numberString.length - 7) +
                "," +
                numberString.slice(
                  numberString.length - 7,
                  numberString.length
                );
            }
          }

          return numberString;
        },
      },
    },
    legend: {
      fontSize: fontSizeLegend,
      position: "top",
    },
  };

  var chart = new ApexCharts(document.querySelector(id), options);

  chart.render();
};

const laadContinentsBarGrafiek = function (data, id) {
  let casesData = [];
  let continentData = [];
  let casesTooltip = [];
  let tooltipName = "Aantal besmettingen";

  let fontSize = 14;

  if (screenWidth < 576) {
    fontSize = 12;
  }

  // let seriesAngle = 0;
  // if (screenWidth < 768) {
  //   seriesAngle = -30;
  // }

  let dataDict = {};
  let sortedDataDict = {};

  for (const cont in continents) {
    dataDict[cont] = 0;
  }

  for (const land of data) {
    if (continents["Noord Amerika"].includes(land.country)) {
      dataDict["Noord Amerika"] += land.cases;
    } else if (continents["Zuid Amerika"].includes(land.country)) {
      dataDict["Zuid Amerika"] += land.cases;
    } else if (continents["Europa"].includes(land.country)) {
      dataDict["Europa"] += land.cases;
    } else if (continents["Azië"].includes(land.country)) {
      dataDict["Azië"] += land.cases;
    } else if (continents["Oceanië"].includes(land.country)) {
      dataDict["Oceanië"] += land.cases;
    } else if (continents["Afrika"].includes(land.country)) {
      dataDict["Afrika"] += land.cases;
    }
  }

  let keysSorted = Object.keys(dataDict).sort(function (a, b) {
    return dataDict[b] - dataDict[a];
  });

  for (const key of keysSorted) {
    sortedDataDict[key] = dataDict[key];
  }

  for (const continent in sortedDataDict) {
    continentData.push(continent);
    casesData.push(sortedDataDict[continent]);
  }

  for (let cases of casesData) {
    if (cases > 999 && cases < 1000000) {
      casesTooltip.push((cases / 1000).toFixed(2) + "k");
    } else if (cases > 999999) {
      casesTooltip.push((cases / 1000000).toFixed(2) + "M");
    } else if (cases < 1000) {
      casesTooltip.push(cases);
    }
  }

  var options = {
    chart: {
      type: "bar",
      height: "100%",
    },
    series: [
      {
        name: tooltipName,
        data: casesData,
      },
    ],
    colors: ["#5C81A5"],

    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
      position: "back",
      borderColor: "rgba(53,75,96,0.4)",
    },
    xaxis: {
      labels: {
        show: false,
        rotate: 0,
        style: {
          fontSize: fontSize,
          fontFamily: '"Mulish", cursive',
        },
      },
      categories: continentData,
      axisBorder: {
        show: true,
        color: colorBlue,
        height: 2,
        offsetY: 0,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
        color: colorBlue,
        width: 2,
        offsetY: -1,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: colorBlue,
        height: 5,
        width: 10,
        offsetY: 1,
      },
      labels: {
        style: {
          fontSize: fontSize,
          fontFamily: '"Mulish", cursive',
        },
        formatter: (value) => {
          if (value > 999 && value < 1000000) {
            return (value / 1000).toFixed(0) + "k";
          } else if (value > 999999) {
            return (value / 1000000).toFixed(0) + "M";
          } else if (value < 1000) {
            return value;
          }
        },
      },
    },
    tooltip: {
      marker: {
        show: false,
      },
      style: {
        fontFamily: '"Mulish", cursive',
      },
      y: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          var numberString = String(value);
          if (numberString.length > 3) {
            numberString =
              numberString.slice(0, numberString.length - 3) +
              "," +
              numberString.slice(numberString.length - 3, numberString.length);

            if (numberString.length > 7) {
              numberString =
                numberString.slice(0, numberString.length - 7) +
                "," +
                numberString.slice(
                  numberString.length - 7,
                  numberString.length
                );
            }
          }

          return numberString;
        },
      },
    },
  };

  var chart = new ApexCharts(document.querySelector(id), options);

  chart.render();
};

const laadCountryBarGrafiek = function (data, id) {
  let casesData = [];
  let casesTooltip = [];
  let tooltipName = "Nieuwe besmettingen";

  let countriesDict = {};

  for (const country of data) {
    const cases = country.timeline.cases;

    if (!countriesDict[country.country]) {
      countriesDict[country.country] = 0;
    }

    countriesDict[country.country] +=
      parseInt(cases[Object.keys(cases).pop()]) -
      parseInt(cases[Object.keys(cases)[0]]);
  }

  let tempData = [];

  for (const key in countriesDict) {
    tempData.push(countriesDict[key]);
  }

  var topValues = tempData.sort((a, b) => b - a).slice(0, 5);

  let topDict = {};

  for (const value of topValues) {
    for (const key in countriesDict) {
      if (countriesDict[key] == value) {
        topDict[key] = value;
      }
    }
  }

  const topData = [];
  const topCountries = [];
  for (const key in topDict) {
    topData.push(topDict[key]);
    for (const country of countryTranslation) {
      if (key == country.EN_Covid) {
        topCountries.push(country.NL);
      }
    }
  }

  for (let cases of casesData) {
    if (cases > 999 && cases < 1000000) {
      casesTooltip.push((cases / 1000).toFixed(2) + "k");
    } else if (cases > 999999) {
      casesTooltip.push((cases / 1000000).toFixed(2) + "M");
    } else if (cases < 1000) {
      casesTooltip.push(cases);
    }
  }

  let fontSize = 14;
  if (screenWidth < 576) {
    fontSize = 12;
  }

  var options = {
    chart: {
      type: "bar",
      height: "100%",
    },
    series: [
      {
        name: tooltipName,
        data: topData,
      },
    ],
    colors: ["#5C81A5"],
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
      position: "back",
      borderColor: "rgba(53,75,96,0.4)",
    },
    xaxis: {
      labels: {
        rotate: 0,
        style: {
          fontSize: fontSize,
          fontFamily: '"Mulish", cursive',
        },
      },
      categories: topCountries,
      axisBorder: {
        show: true,
        color: colorBlue,
        height: 2,
        offsetY: 0,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
        color: colorBlue,
        width: 2,
        offsetY: -1,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: colorBlue,
        height: 5,
        width: 10,
        offsetY: 1,
      },
      labels: {
        style: {
          fontSize: fontSize,
          fontFamily: '"Mulish", cursive',
        },
        formatter: (value) => {
          if (value > 999 && value < 1000000) {
            return (value / 1000).toFixed(0) + "k";
          } else if (value > 999999) {
            return (value / 1000000).toFixed(0) + "M";
          } else if (value < 1000) {
            return value;
          }
        },
      },
    },
    tooltip: {
      marker: {
        show: false,
      },
      style: {
        fontFamily: '"Mulish", cursive',
      },
      y: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          var numberString = String(value);
          if (numberString.length > 3) {
            numberString =
              numberString.slice(0, numberString.length - 3) +
              "," +
              numberString.slice(numberString.length - 3, numberString.length);

            if (numberString.length > 7) {
              numberString =
                numberString.slice(0, numberString.length - 7) +
                "," +
                numberString.slice(
                  numberString.length - 7,
                  numberString.length
                );
            }
          }

          return numberString;
        },
      },
    },
  };

  var chart = new ApexCharts(document.querySelector(id), options);

  chart.render();
};

const laadSingleLineGrafiek = function (data, days, id, type) {
  let casesData = [];
  let dateData = [];
  let casesTooltip = [];
  let datesTooltip = [];
  let tooltipName;

  let ticksAmount;

  if (days == "all") {
    ticksAmount = 30;
  } else if (days > 30) {
    ticksAmount = 29;
  } else if (days == 8) {
    ticksAmount = 6;
  } else if (days == 15) {
    ticksAmount = 13;
  }

  let fontSize = 14;
  let strokeWidth = 5;

  if (days == "all") {
    if (screenWidth < 1670) {
      ticksAmount = 20;
    }
    if (screenWidth < 1200) {
      ticksAmount = 10;
    }
    if (screenWidth < 768) {
      fontSize = 12;
    }
    if (screenWidth < 576) {
      ticksAmount = 6;
    }
  }

  if (days > 30) {
    if (screenWidth < 1670) {
      ticksAmount = 15;
    }
    if (screenWidth < 1200) {
      ticksAmount = 10;
    }
    if (screenWidth < 768) {
      fontSize = 13;
    }
    if (screenWidth < 576) {
      ticksAmount = 6;
    }
  }

  if (days == 15) {
    if (screenWidth < 768) {
      ticksAmount = 6;
    }
  }

  let rounding = 2;
  if (screenWidth < 768) {
    strokeWidth = 2;
    rounding = 0;
  }

  if (screenWidth < 576) {
    fontSize = 12;
  }

  if (type == "deaths") {
    tooltipName = "Doden";
  } else if (type == "cases") {
    tooltipName = "Gevallen";
  }
  for (const key in data) {
    let dateArray = key.split("/");
    const year = "20" + dateArray[2];

    dateArray.pop();
    for (let number = 0; number < 2; number += 1) {
      if (dateArray[number].split("").length == 1) {
        dateArray[number] = "0" + dateArray[number];
      }
    }
    const date = dateArray[1] + "/" + dateArray[0];

    const tempDate = new Date(year, dateArray[0] - 1, dateArray[1]);

    datesTooltip.push(
      dagen[tempDate.getDay()] +
        " " +
        dateArray[1] +
        " " +
        months[dateArray[0] - 1] +
        " " +
        year
    );

    dateData.push(date);
    casesData.push(data[key]);
  }

  dateData.shift();
  datesTooltip.shift();

  casesData = convertTotalToNew(casesData);

  for (const key in casesData) {
    if (casesData[key] < 0) {
      casesData[key] = 0;
    }
  }

  for (let cases of casesData) {
    if (cases > 999 && cases < 1000000) {
      casesTooltip.push((cases / 1000).toFixed(rounding) + "k ");
    } else if (cases > 999999) {
      casesTooltip.push((cases / 1000000).toFixed(rounding) + "M ");
    } else if (cases < 1000) {
      casesTooltip.push(cases);
    }
  }

  var options = {
    chart: {
      type: "line",
      height: "100%",
    },
    series: [
      {
        name: tooltipName,
        data: casesData,
      },
    ],
    colors: [colorBlue],
    stroke: {
      show: true,
      curve: "straight",

      colors: colorGreen,
      width: strokeWidth,
    },
    grid: {
      show: true,
      position: "back",
      borderColor: "rgba(53,75,96,0.4)",
    },
    xaxis: {
      labels: {
        rotate: 0,
        style: {
          fontSize: fontSize,
          fontFamily: '"Mulish", cursive',
        },
      },
      categories: dateData,
      axisBorder: {
        show: true,
        color: colorBlue,
        height: 2,
        offsetY: 0,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: colorBlue,
        height: 10,
        width: 5,
        offsetX: 1,
      },
      tickAmount: ticksAmount,
    },
    yaxis: {
      axisBorder: {
        show: true,
        color: colorBlue,
        width: 2,
        offsetY: -1,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: colorBlue,
        height: 5,
        width: 10,
        offsetY: 1,
      },
      labels: {
        style: {
          fontSize: fontSize,
          fontFamily: '"Mulish", cursive',
        },
        formatter: (value) => {
          if (value > 999 && value < 1000000) {
            return (value / 1000).toFixed(rounding) + "k";
          } else if (value > 999999) {
            return (value / 1000000).toFixed(rounding) + "M";
          } else if (value < 1000) {
            return value;
          }
        },
      },
    },
    tooltip: {
      marker: false,
      style: {
        fontFamily: '"Mulish", cursive',
      },
      x: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          return datesTooltip[dataPointIndex];
        },
      },
      // y: {
      //   formatter: function (
      //     value,
      //     { series, seriesIndex, dataPointIndex, w }
      //   ) {
      //     return casesTooltip[dataPointIndex];
      //   },
      // },
      y: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          var numberString = String(value);
          if (numberString.length > 3) {
            numberString =
              numberString.slice(0, numberString.length - 3) +
              "," +
              numberString.slice(numberString.length - 3, numberString.length);

            if (numberString.length > 7) {
              numberString =
                numberString.slice(0, numberString.length - 7) +
                "," +
                numberString.slice(
                  numberString.length - 7,
                  numberString.length
                );
            }
          }

          return numberString;
        },
      },
    },
  };

  var chart = new ApexCharts(document.querySelector(id), options);

  chart.render();
};

const laadSingleLineVacGrafiek = function (data, days, id) {
  let casesData = [];
  let dateData = [];
  let casesTooltip = [];
  let datesTooltip = [];
  let tooltipName = "Vaccinaties";

  let ticksAmount;

  if (days == "all") {
    ticksAmount = 30;
  } else if (days > 29) {
    ticksAmount = 29;
  } else if (days == 7) {
    ticksAmount = 6;
  } else if (days == 14) {
    ticksAmount = 13;
  }
  let fontSize = 14;
  let strokeWidth = 5;

  let rounding = 2;

  if (screenWidth < 768) {
    strokeWidth = 2;
    rounding = 0;
  }

  if (days == "all") {
    if (screenWidth < 1670) {
      ticksAmount = 20;
    }
    if (screenWidth < 1200) {
      ticksAmount = 10;
    }
    if (screenWidth < 768) {
      fontSize = 12;
    }
    if (screenWidth < 576) {
      ticksAmount = 6;
    }
  }

  if (days > 29) {
    if (screenWidth < 1670) {
      ticksAmount = 15;
    }
    if (screenWidth < 1200) {
      ticksAmount = 10;
    }
    if (screenWidth < 768) {
      fontSize = 13;
    }
    if (screenWidth < 576) {
      ticksAmount = 6;
    }
  }

  if (days == 14) {
    if (screenWidth < 768) {
      ticksAmount = 6;
    }
  }

  if (screenWidth < 576) {
    fontSize = 12;
  }

  for (const key in data) {
    let dateArray = key.split("/");
    const year = "20" + dateArray[2];

    dateArray.pop();
    for (let number = 0; number < 2; number += 1) {
      if (dateArray[number].split("").length == 1) {
        dateArray[number] = "0" + dateArray[number];
      }
    }
    const date = dateArray[1] + "/" + dateArray[0];

    const tempDate = new Date(year, dateArray[0] - 1, dateArray[1]);

    datesTooltip.push(
      dagen[tempDate.getDay()] +
        " " +
        dateArray[1] +
        " " +
        months[dateArray[0] - 1] +
        " " +
        year
    );

    dateData.push(date);
    casesData.push(data[key]);
  }

  for (const key in casesData) {
    if (casesData[key] < 0) {
      casesData[key] = 0;
    }
  }

  for (let cases of casesData) {
    if (cases > 999 && cases < 1000000) {
      casesTooltip.push((cases / 1000).toFixed(rounding) + "k ");
    } else if (cases > 999999) {
      casesTooltip.push((cases / 1000000).toFixed(rounding) + "M ");
    } else if (cases < 1000) {
      casesTooltip.push(cases);
    }
  }

  var options = {
    chart: {
      type: "line",
      height: "100%",
    },
    series: [
      {
        name: tooltipName,
        data: casesData,
      },
    ],
    colors: [colorBlue],
    stroke: {
      show: true,
      curve: "straight",

      colors: colorGreen,
      width: strokeWidth,
    },
    grid: {
      show: true,
      position: "back",
      borderColor: "rgba(53,75,96,0.4)",
    },
    xaxis: {
      labels: {
        rotate: 0,
        style: {
          fontSize: fontSize,
          fontFamily: '"Mulish", cursive',
        },
      },
      categories: dateData,
      axisBorder: {
        show: true,
        color: colorBlue,
        height: 2,
        offsetY: 0,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: colorBlue,
        height: 10,
        width: 5,
        offsetX: 1,
      },
      tickAmount: ticksAmount,
    },
    yaxis: {
      axisBorder: {
        show: true,
        color: colorBlue,
        width: 2,
        offsetY: -1,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: colorBlue,
        height: 5,
        width: 10,
        offsetY: 1,
      },
      labels: {
        style: {
          fontSize: fontSize,
          fontFamily: '"Mulish", cursive',
        },
        formatter: (value) => {
          if (value > 999 && value < 1000000) {
            return (value / 1000).toFixed(rounding) + "k ";
          } else if (value > 999999) {
            return (value / 1000000).toFixed(rounding) + "M ";
          } else if (value < 1000) {
            return value;
          }
        },
      },
    },
    tooltip: {
      marker: false,
      style: {
        fontFamily: '"Mulish", cursive',
      },
      x: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          return datesTooltip[dataPointIndex];
        },
      },
      // y: {
      //   formatter: function (
      //     value,
      //     { series, seriesIndex, dataPointIndex, w }
      //   ) {
      //     return casesTooltip[dataPointIndex];
      //   },
      // },
      y: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          var numberString = String(value);
          if (numberString.length > 3) {
            numberString =
              numberString.slice(0, numberString.length - 3) +
              "," +
              numberString.slice(numberString.length - 3, numberString.length);

            if (numberString.length > 7) {
              numberString =
                numberString.slice(0, numberString.length - 7) +
                "," +
                numberString.slice(
                  numberString.length - 7,
                  numberString.length
                );
            }
          }

          return numberString;
        },
      },
    },
  };

  var chart = new ApexCharts(document.querySelector(id), options);

  chart.render();
};

const laadTotalCasesGrafiek = function (data, id, type) {
  let casesData = [];
  let dateData = [];
  let casesTooltip = [];
  let datesTooltip = [];
  let tooltipName;

  if (type == "cases") {
    tooltipName = "Besmettingen";
  } else if (type == "deaths") {
    tooltipName = "Overlijdens";
  }

  let fontSize = 14;
  let strokeWidth = 5;

  if (screenWidth < 768) {
    strokeWidth = 2;
  }

  if (screenWidth < 576) {
    fontSize = 12;
  }

  for (const key in data) {
    let dateArray = key.split("/");
    const year = "20" + dateArray[2];

    dateArray.pop();
    for (let number = 0; number < 2; number += 1) {
      if (dateArray[number].split("").length == 1) {
        dateArray[number] = "0" + dateArray[number];
      }
    }
    const date = dateArray[1] + "/" + dateArray[0];

    const tempDate = new Date(year, dateArray[0] - 1, dateArray[1]);

    datesTooltip.push(
      dagen[tempDate.getDay()] +
        " " +
        dateArray[1] +
        " " +
        months[dateArray[0] - 1] +
        " " +
        year
    );

    dateData.push(date);
    casesData.push(data[key]);
  }

  for (const key in casesData) {
    if (casesData[key] < 0) {
      casesData[key] = 0;
    }
  }

  const totalCasesToday = convertNumber(casesData[casesData.length - 1]);

  const stijgingNummer =
    casesData[casesData.length - 1] - casesData[casesData.length - 2];

  let stijgingProcent = (
    stijgingNummer /
    (casesData[casesData.length - 2] - casesData[casesData.length - 3])
  ).toFixed(2);

  // if (!Number.isInteger(stijgingProcent)) {
  //   stijgingProcent = 0;
  // }

  if (type == "cases") {
    document.querySelector(".js-cases").innerHTML = totalCasesToday;
    document.querySelector(
      ".js-casestext"
    ).innerHTML = `Momenteel zijn er ${totalCasesToday} positieve tests afgenomen. Dit is een stijging van ${stijgingProcent}% of ${convertNumber(
      stijgingNummer
    )} mensen.`;
  } else if (type == "deaths") {
    document.querySelector(".js-deaths").innerHTML = totalCasesToday;
    document.querySelector(
      ".js-deathstext"
    ).innerHTML = `Momenteel zijn er ${totalCasesToday} overlijdens. Dit is een stijging van ${stijgingProcent}% of ${convertNumber(
      stijgingNummer
    )} mensen.`;
  }

  for (let cases of casesData) {
    if (cases > 999 && cases < 1000000) {
      casesTooltip.push((cases / 1000).toFixed(0) + "k ");
    } else if (cases > 999999) {
      casesTooltip.push((cases / 1000000).toFixed(0) + "M ");
    } else if (cases < 1000) {
      casesTooltip.push(cases);
    }
  }

  var options = {
    chart: {
      toolbar: {
        show: false,
      },
      type: "line",
      height: "100%",
    },
    series: [
      {
        name: tooltipName,
        data: casesData,
      },
    ],
    colors: [colorBlue],
    stroke: {
      show: true,
      curve: "straight",

      colors: colorGreen,
      width: strokeWidth,
    },
    grid: {
      show: true,
      position: "back",
      borderColor: "rgba(53,75,96,0.4)",
    },
    xaxis: {
      labels: {
        show: false,
      },
      categories: dateData,
      axisBorder: {
        show: true,
        color: colorBlue,
        height: 2,
        offsetY: 0,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      tickAmount: 1,
      axisBorder: {
        show: true,
        color: colorBlue,
        width: 2,
        offsetY: -1,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: colorBlue,
        height: 5,
        width: 10,
        offsetY: 1,
      },
      labels: {
        style: {
          fontSize: fontSize,
          fontFamily: '"Mulish", cursive',
        },
        formatter: (value) => {
          if (value > 999 && value < 1000000) {
            return (value / 1000).toFixed(0) + "k ";
          } else if (value > 999999) {
            return (value / 1000000).toFixed(0) + "M ";
          } else if (value < 1000) {
            return value;
          }
        },
      },
    },
    tooltip: {
      marker: false,
      style: {
        fontFamily: '"Mulish", cursive',
      },
      x: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          return datesTooltip[dataPointIndex];
        },
      },
      // y: {
      //   formatter: function (
      //     value,
      //     { series, seriesIndex, dataPointIndex, w }
      //   ) {
      //     return casesTooltip[dataPointIndex];
      //   },
      // },
      y: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          var numberString = convertNumber(value);

          return numberString;
        },
      },
    },
  };

  var chart = new ApexCharts(document.querySelector(id), options);

  chart.render();
};

const laadVacPieChart = function (data, id, country) {
  let numberVac;
  let legendPos = "right";

  if (country == "all") {
    numberVac = data[Object.keys(data)[0]];
  } else {
    numberVac = data.timeline[Object.keys(data.timeline)[0]];
  }
  const total = countryData.population - numberVac;

  const totalPercent = ((total / (total + numberVac)) * 100).toFixed(1);

  document.querySelector(".js-vac").innerHTML = convertNumber(numberVac);
  document.querySelector(
    ".js-vactext"
  ).innerHTML = `Momenteel zijn er ${convertNumber(
    numberVac
  )} vaccinaties gezet in België. Dit getal zijn mensen die minstens 1 maal zijn vaccineerd,`;

  var options = {
    chart: {
      toolbar: {
        show: false,
      },
      type: "pie",
      height: "100%",
    },
    series: [numberVac, total],
    labels: ["Gevaccineerd", "Overblijvende vaccinaties"],
    colors: [colorGreen, colorBlue],
    stroke: {
      show: false,
    },
    legend: {
      position: legendPos,
    },
    tooltip: {
      fillSeriesColor: false,
      theme: "light",
      marker: false,
      style: {
        fontFamily: '"Mulish", cursive',
      },
      x: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          return value;
        },
      },
      y: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          var numberString = convertNumber(value);
          if (dataPointIndex == "0") {
            return (
              numberString +
              " (" +
              parseFloat(100 - totalPercent).toFixed(1) +
              "%)"
            );
          } else {
            return numberString + " (" + totalPercent + "%)";
          }
        },
      },
    },
  };

  var chart = new ApexCharts(document.querySelector(id), options);

  chart.render();
};

const getSingleLineVacData = function (days, id) {
  //ophalen van de externe json file
  fetch("https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=" + days)
    .then(function (response) {
      if (!response.ok) {
        throw Error(`probleem bij de fetch(). Statuscode: ${response.status}`);
      } else {
        // console.info("er is een response terug gekomen");
        return response.json();
      }
    })
    .then(function (json) {
      // console.info("JSON object is aangemaakt");

      laadSingleLineVacGrafiek(json, days, id);
    })
    //als de fout opgeworpen is vangen we ze hier op
    .catch(function (error) {
      console.error(`fout bij het verwerken van de jsonfile ${error}`);
    });
};

const getSingleLineData = function (days, id, country, type) {
  if (days == "all") {
  } else {
    days = parseInt(days) + 1;
  }
  //ophalen van de externe json file
  fetch(
    "https://disease.sh/v3/covid-19/historical/" + country + "?lastdays=" + days
  )
    .then(function (response) {
      if (!response.ok) {
        throw Error(`probleem bij de fetch(). Statuscode: ${response.status}`);
      } else {
        // console.info("er is een response terug gekomen");
        return response.json();
      }
    })
    .then(function (json) {
      // console.info("JSON object is aangemaakt");

      let data;

      if (json.timeline) {
        data = json.timeline;
      } else {
        data = json;
      }

      if (type == "cases") {
        data = data["cases"];
      } else if (type == "deaths") {
        data = data["deaths"];
      }

      laadSingleLineGrafiek(data, days, id, type);
    })
    //als de fout opgeworpen is vangen we ze hier op
    .catch(function (error) {
      console.error(`fout bij het verwerken van de jsonfile ${error}`);
    });
};

const getTotalCasesData = function (id, country, type) {
  //ophalen van de externe json file
  fetch(
    "https://disease.sh/v3/covid-19/historical/" + country + "?lastdays=all"
  )
    .then(function (response) {
      if (!response.ok) {
        throw Error(`probleem bij de fetch(). Statuscode: ${response.status}`);
      } else {
        // console.info("er is een response terug gekomen");
        return response.json();
      }
    })
    .then(function (json) {
      // console.info("JSON object is aangemaakt");

      let data;

      if (json.timeline) {
        data = json.timeline[type];
      } else {
        data = json[type];
      }

      laadTotalCasesGrafiek(data, id, type);
    })
    //als de fout opgeworpen is vangen we ze hier op
    .catch(function (error) {
      if (type == "cases") {
        document.querySelector(
          ".js-gevallen"
        ).innerHTML = `<p>Geen besmettingsgegevens gevonden voor ${translateName(
          country
        )}</p>`;
      } else if (type == "deaths") {
        document.querySelector(
          ".js-overlijdens"
        ).innerHTML = `<p>Geen overlijdingsgegevens gevonden voor ${translateName(
          country
        )}</p>`;
      }
      // console.error(`fout bij het verwerken van de jsonfile ${error}`);
    });
};

const getMultipleLineData = function (id) {
  //ophalen van de externe json file
  fetch("https://disease.sh/v3/covid-19/historical?lastdays=8")
    .then(function (response) {
      if (!response.ok) {
        throw Error(`probleem bij de fetch(). Statuscode: ${response.status}`);
      } else {
        // console.info("er is een response terug gekomen");
        return response.json();
      }
    })
    .then(function (json) {
      // console.info("JSON object is aangemaakt");

      laadMultipleLineGrafiek(json, id);
    })
    //als de fout opgeworpen is vangen we ze hier op
    .catch(function (error) {
      console.error(`fout bij het verwerken van de jsonfile ${error}`);
    });
};

const getContinentBarData = function (id) {
  //ophalen van de externe json file
  fetch("https://disease.sh/v3/covid-19/countries")
    .then(function (response) {
      if (!response.ok) {
        throw Error(`probleem bij de fetch(). Statuscode: ${response.status}`);
      } else {
        // console.info("er is een response terug gekomen");
        return response.json();
      }
    })
    .then(function (json) {
      // console.info("JSON object is aangemaakt");

      laadContinentsBarGrafiek(json, id);
    })
    //als de fout opgeworpen is vangen we ze hier op
    .catch(function (error) {
      console.error(`fout bij het verwerken van de jsonfile ${error}`);
    });
};

const getCountryData = function (country) {
  let link = `https://disease.sh/v3/covid-19/countries/${country}?strict=true`;

  if (country == "all") {
    link = "https://disease.sh/v3/covid-19/all";
  }

  //ophalen van de externe json file
  fetch(link)
    .then(function (response) {
      if (!response.ok) {
        throw Error(`probleem bij de fetch(). Statuscode: ${response.status}`);
      } else {
        // console.info("er is een response terug gekomen");
        return response.json();
      }
    })
    .then(function (json) {
      // console.info("JSON object is aangemaakt");

      setCountryData(json, country);
    })
    //als de fout opgeworpen is vangen we ze hier op
    .catch(function (error) {
      console.error(`fout bij het verwerken van de jsonfile ${error}`);
    });
};

const getCountryBarData = function (id) {
  //ophalen van de externe json file
  fetch("https://disease.sh/v3/covid-19/historical?lastdays=8")
    .then(function (response) {
      if (!response.ok) {
        throw Error(`probleem bij de fetch(). Statuscode: ${response.status}`);
      } else {
        // console.info("er is een response terug gekomen");
        return response.json();
      }
    })
    .then(function (json) {
      // console.info("JSON object is aangemaakt");

      laadCountryBarGrafiek(json, id);
    })
    //als de fout opgeworpen is vangen we ze hier op
    .catch(function (error) {
      console.error(`fout bij het verwerken van de jsonfile ${error}`);
    });
};

const getVacData = function (id, country) {
  //ophalen van de externe json file
  let link = `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country}?lastdays=1`;

  if (country == "all") {
    link = "https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=1";
  }
  fetch(link)
    .then(function (response) {
      if (!response.ok) {
        throw Error(`probleem bij de fetch(). Statuscode: ${response.status}`);
      } else {
        // console.info("er is een response terug gekomen");
        return response.json();
      }
    })
    .then(function (json) {
      // console.info("JSON object is aangemaakt");
      laadVacPieChart(json, id, country);
    })
    //als de fout opgeworpen is vangen we ze hier op
    .catch(function (error) {
      document.querySelector(
        ".js-vaccinatie"
      ).innerHTML = `<p>Geen vaccinatiegegevens gevonden voor ${translateName(
        country
      )}</p>`;
      // console.error(`fout bij het verwerken van de jsonfile ${error}`);
    });
};

const getCountriesJson = function () {
  //ophalen van de externe json file
  fetch("../data/countryData.json")
    .then(function (response) {
      if (!response.ok) {
        throw Error(`probleem bij de fetch(). Statuscode: ${response.status}`);
      } else {
        // console.info("er is een response terug gekomen");
        return response.json();
      }
    })
    .then(function (json) {
      // console.info("JSON object is aangemaakt");
      countryTranslation = json;
    })
    //als de fout opgeworpen is vangen we ze hier op
    .catch(function (error) {
      console.error(`fout bij het verwerken van de jsonfile ${error}`);
    });
};

const eventListeners = function (id, country, type, btnClass) {
  let buttons = document.querySelectorAll(btnClass);

  for (let btn of buttons) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      let days;
      for (let btn2 of buttons) {
        btn2.classList.remove("c-graph__button--active");
      }
      days = btn.dataset.days;
      btn.classList.toggle("c-graph__button--active");

      document.getElementById(id.substring(1)).innerHTML = " ";
      getSingleLineData(days, id, country, type);
    });
  }
};

const eventListenersVac = function (id, btnClass) {
  let buttons = document.querySelectorAll(btnClass);

  for (let btn of buttons) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      let days;
      for (let btn2 of buttons) {
        btn2.classList.remove("c-graph__button--active");
      }
      days = btn.dataset.days;
      btn.classList.toggle("c-graph__button--active");

      document.getElementById(id.substring(1)).innerHTML = " ";
      getSingleLineVacData(days, id);
    });
  }
};

const createSingleLineGraph = function (days, id, country, btnClass, type) {
  if (document.getElementById(id.substring(1))) {
    getSingleLineData(days, id, country, type);
    eventListeners(id, country, type, btnClass);
  }
};

const createSingleLineVacGraph = function (days, id, btnClass) {
  if (document.getElementById(id.substring(1))) {
    getSingleLineVacData(days, id);
    eventListenersVac(id, btnClass);
  }
};

const createMultipleLineGraph = function (id) {
  if (document.getElementById(id.substring(1))) {
    getMultipleLineData(id);
  }
};

const createCountryBarChart = function (id) {
  if (document.getElementById(id.substring(1))) {
    getCountryBarData(id);
  }
};

const createContinentBarChart = function (id) {
  if (document.getElementById(id.substring(1))) {
    getContinentBarData(id);
  }
};

const createTotalChart = function (id, country, type) {
  if (document.getElementById(id.substring(1))) {
    getTotalCasesData(id, country, type);
  }
};

const createVacPieChart = function (id, country) {
  if (document.getElementById(id.substring(1))) {
    getVacData(id, country);
  }
};

const laadGrafieken = function (country) {
  createSingleLineGraph(7, "#caseschart", "all", ".js-casesbtn", "cases");
  createSingleLineGraph(7, "#deathschart", "all", ".js-deathsbtn", "deaths");
  createSingleLineVacGraph(7, "#vacchart", ".js-vacbtn", "vaccine");
  createMultipleLineGraph("#continentschart");
  createCountryBarChart("#countrybarchart");
  createContinentBarChart("#continentbarchart");
  createTotalChart("#totalcaseschart", country, "cases");
  createTotalChart("#totaldeathschart", country, "deaths");
  createVacPieChart("#vacpiechart", country);
};

const init = function () {
  screenWidth = window.innerWidth;
  let tempWidth = [];
  window.onresize = window.onload = function () {
    screenWidth = this.innerWidth;
    tempWidth.push(screenWidth);
    if (
      tempWidth.length > 2 &&
      tempWidth[tempWidth.length - 1] != tempWidth[tempWidth.length - 2]
    ) {
      location.reload();
      tempWidth.push(tempWidth[tempWidth.length - 1]);
    }
  };

  country = "belgium";

  getCountriesJson();
  getCountryData(country);
};

document.addEventListener("DOMContentLoaded", init);
