$.ajax({
    type: 'GET',
    dataType: "json",
    url: "RevisarSesion"
}).done(function (data, textEstado, jqXHR) {
    if (!data.resultado) {
        window.location.href = "./components/Login/login.html";
    }
}).fail(function (jqXHR, textEstado) {
    console.log("La solicitud no se pudo realizar error: " + textEstado);
});

$(document).ready(function () {
    /*-----------------------------------------------------------------------*/
    /*                             OBTENER USUARIO DATA HEADER               */
    /*-----------------------------------------------------------------------*/
    $.ajax({
        data: {"usuario": window.localStorage.getItem('userName')},
        type: 'GET',
        dataType: "json",
        url: "./ObtenerUsuarioData"
    }).done(function (data, textEstado, jqXHR) {
        if (data)
        {
            $("#nombre").text(data.resultado.nombre + " " + data.resultado.apellidos);
            $("#imagen-perfil").css("background-image", "url( " + data.resultado.imagen_perfil + " )");
        }
    }).fail(function (jqXHR, textEstado) {
        console.log("La solicitud no se pudo realizar error: " + textEstado);
    });
    /*-----------------------------------------------------------------------*/
    /*                             CERRAR SESION                             */
    /*-----------------------------------------------------------------------*/
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