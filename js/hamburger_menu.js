"use strict"

$(document).ready(function () {
    $(".hammenu").click(function () { 
        $(this).toggleClass('js-transformed');
        $(".nvbar__items").slideToggle(350, "linear");
        $(".nvbar__items").css("display", "flex");
    });

});