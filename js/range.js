"use strict";

var inputLeft, inputRight, thumbLeft, thumbRight, range;

function setLeftValue() {
  var _this = inputLeft,
    min = parseInt(_this.min),
    max = parseInt(_this.max);

  _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

  var percent = ((_this.value - min) / (max - min)) * 100;

  thumbLeft.style.left = percent + "%";
  range.style.left = percent - 5 + "%";

  thumbLeft.setAttribute("data-left", parseInt(_this.value));
}

function setRightValue() {
  var _this = inputRight,
    min = parseInt(_this.min),
    max = parseInt(_this.max);

  _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

  var percent = ((_this.value - min) / (max - min)) * 100;

  thumbRight.style.right = 100 - percent + "%";
  range.style.right = 95 - percent + "%";

  thumbRight.setAttribute("data-right", parseInt(_this.value));
}

const eventListeners = function () {
  inputLeft.addEventListener("input", setLeftValue);
  inputRight.addEventListener("input", setRightValue);

  inputLeft.addEventListener("mouseover", function () {
    thumbLeft.classList.add("hover");
  });
  inputLeft.addEventListener("mouseout", function () {
    thumbLeft.classList.remove("hover");
  });
  inputLeft.addEventListener("mousedown", function () {
    thumbLeft.classList.add("active");
  });
  inputLeft.addEventListener("mouseup", function () {
    thumbLeft.classList.remove("active");
  });

  inputRight.addEventListener("mouseover", function () {
    thumbRight.classList.add("hover");
  });
  inputRight.addEventListener("mouseout", function () {
    thumbRight.classList.remove("hover");
  });
  inputRight.addEventListener("mousedown", function () {
    thumbRight.classList.add("active");
  });
  inputRight.addEventListener("mouseup", function () {
    thumbRight.classList.remove("active");
  });
};

document.addEventListener("DOMContentLoaded", function () {
  inputLeft = document.querySelector("#deaths-left");
  inputRight = document.querySelector("#deaths-right");

  thumbLeft = document.querySelector(".c-filter__range--slider__thumb--left");
  thumbRight = document.querySelector(".c-filter__range--slider__thumb--right");
  range = document.querySelector(
    ".c-filter__range--slider > .c-filter__range--slider__range"
  );

  setLeftValue();
  setRightValue();

  eventListeners();

  console.log("Hallokes!");
});
