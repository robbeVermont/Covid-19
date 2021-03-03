"use strict";

$(document).ready(function () {
  $(".c-hammenu").click(function () {
    $(this).toggleClass("js-transformed");
    $(".c-navbar__items").slideToggle(350, "linear");
    $(".c-navbar__items").css("display", "flex");
    console.log("js done");
  });

  $(document).ready(function () {
    $(".hammenu").click(function () {
      $(this).toggleClass("js-transformed");
      $(".nvbar__items").slideToggle(350, "linear");
      $(".nvbar__items").css("display", "flex");
    });
  });

  window.addEventListener("resize", () => {
    $(".c-navbar__items").removeAttr("style");
  });
});
