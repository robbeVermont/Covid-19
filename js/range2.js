"use strict";

var inputLeftDeaths, inputRightDeaths, thumbLeftDeaths, thumbRightDeaths, rangeDeaths;

function setLeftValueDeaths() {
  var _this = inputLeftDeaths,
    min = parseInt(_this.min),
    max = parseInt(_this.max);

  _this.value = Math.min(parseInt(_this.value), parseInt(inputRightDeaths.value) - 1);

  var percent = ((_this.value - min) / (max - min)) * 100;

  thumbLeftDeaths.style.left = percent + "%";
  rangeDeaths.style.left = percent - 5 + "%";

  thumbLeftDeaths.setAttribute("data-left", parseInt(_this.value));
}

function setRightValueDeaths() {
  var _this = inputRightDeaths,
    min = parseInt(_this.min),
    max = parseInt(_this.max);

  _this.value = Math.max(parseInt(_this.value), parseInt(inputLeftDeaths.value) + 1);

  var percent = ((_this.value - min) / (max - min)) * 100;

  thumbRightDeaths.style.right = 100 - percent + "%";
  rangeDeaths.style.right = 95 - percent + "%";

  thumbRightDeaths.setAttribute("data-right", parseInt(_this.value));
}

const eventListenersDeaths = function () {
  inputLeftDeaths.addEventListener("input", setLeftValueDeaths);
  inputRightDeaths.addEventListener("input", setRightValueDeaths);

  inputLeftDeaths.addEventListener("mouseover", function () {
    thumbLeftDeaths.classList.add("hover");
  });
  inputLeftDeaths.addEventListener("mouseout", function () {
    thumbLeftDeaths.classList.remove("hover");
  });
  inputLeftDeaths.addEventListener("mousedown", function () {
    thumbLeftDeaths.classList.add("active");
  });
  inputLeftDeaths.addEventListener("mouseup", function () {
    thumbLeftDeaths.classList.remove("active");
  });

  inputRightDeaths.addEventListener("mouseover", function () {
    thumbRightDeaths.classList.add("hover");
  });
  inputRightDeaths.addEventListener("mouseout", function () {
    thumbRightDeaths.classList.remove("hover");
  });
  inputRightDeaths.addEventListener("mousedown", function () {
    thumbRightDeaths.classList.add("active");
  });
  inputRightDeaths.addEventListener("mouseup", function () {
    thumbRightDeaths.classList.remove("active");
  });
};

document.addEventListener("DOMContentLoaded", function () {
  inputLeftDeaths = document.getElementById("deaths-left");
  inputRightDeaths = document.getElementById("deaths-right");

  thumbLeftDeaths = document.querySelector(".js-range-deaths-left");
  thumbRightDeaths = document.querySelector(".js-range-deaths-right");
  rangeDeaths = document.querySelector(
    ".js-range-deaths-range"
  );

  setLeftValueDeaths();
  setRightValueDeaths();

  eventListenersDeaths();
});
