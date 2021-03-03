const topScroll = function () {
    const btnTop = document.querySelector(".js-top-icon");

    btnTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    });
};

const init = function () {
    topScroll();
}

document.addEventListener("DOMContentLoaded", init);
