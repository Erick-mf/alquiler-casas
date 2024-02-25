$(document).ready(function () {
    translucent();
    carrusel();
    parallax();
    details();
});

function translucent() {
    $(window).scroll(function () {
        const scrollTop = $(window).scrollTop();
        const threshold = 50;

        $(".header")[scrollTop > threshold ? "addClass" : "removeClass"]("header--translucent");
    });
}

function carrusel() {
    let currentSlide = 0;
    let slides = $("#carrusel .slide");
    slides.first().clone().appendTo("#carrusel"); // Duplica la primera diapositiva y la añade al final
    slides = $("#carrusel .slide"); // Actualiza la lista de diapositivas
    const numSlides = slides.length;

    $("#carrusel .slide").css({
        transform: "translateX(-" + currentSlide * 100 + "%)",
        transition: "transform 1s",
    });
    currentSlide++;

    setTimeout(function () {
        setInterval(function () {
            if (currentSlide >= numSlides) {
                setTimeout(function () {
                    $("#carrusel .slide").css({
                        transform: "translateX(0)",
                        transition: "none",
                    });
                }, 1000);
                currentSlide = 0;
            } else {
                $("#carrusel .slide").css({
                    transform: "translateX(-" + currentSlide * 100 + "%)",
                    transition: "transform 1s",
                });
                currentSlide++;
            }
        }, 3500);
    }, 1000);
}

function parallax() {
    $.getJSON("../js/images.json", function (data) {
        const imgs = data.images;

        imgs.forEach(function (img) {
            const $img = $("<div/>", {
                class: "parallax",
                css: {
                    backgroundImage: `url(${img.src})`,
                },
            });

            $("#img-container").append($img);
        });
    });
}

function details() {
    $(".card button").click(function () {
        // Obtén el ID de la tarjeta
        var cardId = $(this).closest(".card").attr("id");

        // Redirige a la página de detalles con el ID de la tarjeta como parámetro
        window.location.href = "./html/detalles.html?id=" + cardId;
    });
}
