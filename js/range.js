"use strict";

var inputLeftCases,
  inputRightCases,
  thumbLeftCases,
  thumbRightCases,
  rangeCases;

function setLeftValueCases() {
  var _this = inputLeftCases,
    min = parseInt(_this.min),
    max = parseInt(_this.max);

  _this.value = Math.min(
    parseInt(_this.value),
    parseInt(inputRightCases.value) - 1
  );

  var percent = ((_this.value - min) / (max - min)) * 100;

  thumbLeftCases.style.left = percent + "%";
  rangeCases.style.left = percent - 5 + "%";

  thumbLeftCases.setAttribute("data-left", parseInt(_this.value));
}

function setRightValueCases() {
  var _this = inputRightCases,
    min = parseInt(_this.min),
    max = parseInt(_this.max);

  _this.value = Math.max(
    parseInt(_this.value),
    parseInt(inputLeftCases.value) + 1
  );

  var percent = ((_this.value - min) / (max - min)) * 100;

  thumbRightCases.style.right = 100 - percent + "%";
  rangeCases.style.right = 95 - percent + "%";

  thumbRightCases.setAttribute("data-right", parseInt(_this.value));
}

const eventListenersCases = function () {
  inputLeftCases.addEventListener("input", setLeftValueCases);
  inputRightCases.addEventListener("input", setRightValueCases);

  inputLeftCases.addEventListener("mouseover", function () {
    thumbLeftCases.classList.add("hover");
  });
  inputLeftCases.addEventListener("mouseout", function () {
    thumbLeftCases.classList.remove("hover");
  });
  inputLeftCases.addEventListener("mousedown", function () {
    thumbLeftCases.classList.add("active");
  });
  inputLeftCases.addEventListener("mouseup", function () {
    thumbLeftCases.classList.remove("active");
  });

  inputRightCases.addEventListener("mouseover", function () {
    thumbRightCases.classList.add("hover");
  });
  inputRightCases.addEventListener("mouseout", function () {
    thumbRightCases.classList.remove("hover");
  });
  inputRightCases.addEventListener("mousedown", function () {
    thumbRightCases.classList.add("active");
  });
  inputRightCases.addEventListener("mouseup", function () {
    thumbRightCases.classList.remove("active");
  });
};

document.addEventListener("DOMContentLoaded", function () {
  if (
    document.getElementById("cases-left") &&
    document.getElementById("cases-right") &&
    document.querySelector(".js-range-cases-left") &&
    document.querySelector(".js-range-cases-right") &&
    document.querySelector(".js-range-cases-range")
  ) {
    inputLeftCases = document.getElementById("cases-left");
    inputRightCases = document.getElementById("cases-right");

    thumbLeftCases = document.querySelector(".js-range-cases-left");
    thumbRightCases = document.querySelector(".js-range-cases-right");
    rangeCases = document.querySelector(".js-range-cases-range");

    setLeftValueCases();
    setRightValueCases();

    eventListenersCases();
  }
});
