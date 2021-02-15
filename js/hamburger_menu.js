"use strict"

$(document).ready(function () {
    $(".c-hammenu").click(function () { 
        $(this).toggleClass('js-transformed');
        $(".nvbar__items").slideToggle(350, "linear");
        $("#js-nav-items").css("display", "flex");
    });
    
    window.addEventListener("resize", () => {
        $("#js-nav-items").removeAttr('style');
    });
});