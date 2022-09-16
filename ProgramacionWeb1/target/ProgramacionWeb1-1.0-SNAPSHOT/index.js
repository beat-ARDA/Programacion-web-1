$.ajax({
    type: 'GET',
    dataType: "json",
    url: "RevisarSesion"
}).done(function (data, textEstado, jqXHR) {
    console.log(data);
    if (!data.resultado) {
        window.location.href = "./components/Login/login.html";
    }
}).fail(function (jqXHR, textEstado) {
    console.log("La solicitud no se pudo realizar error: " + textEstado);
});

$(document).ready(function () {
    $("#button-inicio").click(function () {
        location.href = "./components/Login/login.html";
    });

    $("#button-registrarse").click(function () {
        location.href = "./components/Register/register.html";
    });

    $("#button-cerrarSession").click(function (event) {

        $.ajax({

            type: 'GET',
            dataType: "json",
            url: "./CerrarSesion"
        }).done(function (data, textEstado, jqXHR) {
            console.log(data);
            if (data.resultado) {
                alert("Sesion cerrada");
                window.location.href = "index.html";
            } else {
                alert("No se pudo cerrar la sesion");
            }
        }).fail(function (jqXHR, textEstado) {
            console.log("La solicitud no se pudo realizar error: " + textEstado);
        });
    });
});