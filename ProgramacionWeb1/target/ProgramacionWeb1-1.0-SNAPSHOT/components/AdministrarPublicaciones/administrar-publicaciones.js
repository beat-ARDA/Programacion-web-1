$.ajax({
    type: 'GET',
    dataType: "json",
    url: "../../RevisarSesion"
}).done(function (data, textEstado, jqXHR) {
    if (!data.resultado) {
        window.location.href = "../Login/login.html";
    }
}).fail(function (jqXHR, textEstado) {
    console.log("La solicitud no se pudo realizar error: " + textEstado);
});

$(document).ready(function () {
    $("#logo").click(function () {
        window.location.href = "../../index.html";
    });

    $("#nueva-publicacion").click(function () {
        window.location.href = "../Publicacion/publicacion.html";
    });
});