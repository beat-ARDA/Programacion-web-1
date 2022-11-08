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
    /*              OBTENER CANTIDAD                                         */
    /*-----------------------------------------------------------------------*/
    let cantidadPublicaciones = -1;
    let initialLimit = 3;
    let nextLimit = 0;
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: "ObtenerCantidadPublicaciones"
    }).done(function (data, textEstado, jqXHR) {
        cantidadPublicaciones = data.resultado;
    }).fail(function (jqXHR, textEstado) {
        console.log("La solicitud no se pudo realizar error: " + textEstado);
    });
    /*-----------------------------------------------------------------------*/
    /*              OBTENER PUBLICACIONES                                    */
    /*-----------------------------------------------------------------------*/
    $.ajax({
        data: {
            "initialLimit": initialLimit,
            "nextLimit": nextLimit},
        type: 'GET',
        dataType: "json",
        url: "ObtenerTodasPublicaciones"
    }).done(function (data, textEstado, jqXHR) {
        if (!data.resultado) {
            console.log("No fue posible regresar los datos");
        } else {
            for (let i = 0; i < data.resultado.length; i++) {
                $("#contenedor-cards").append(
                        '<div class="container card mt-2">' +
                        '<div class="row">' +
                        '<div class="col-4">' +
                        '<samll>' + data.resultado[i].fecha_creacion + '</samll>' +
                        '</div>' +
                        '<div class="col-4 text-center">' +
                        '</div>' +
                        '<div class="col-4 d-flex justify-content-end">' +
                        '<label>' + data.resultado[i].num_votos + '</label>' +
                        '<i class="ps-1 like-icon fa-solid fa-thumbs-up"></i>' +
                        '<label class="ps-1">' + data.resultado[i].num_comentarios + '</label>' +
                        '<i class="ps-1 like-icon fa-solid fa-comment"></i>' +
                        '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col text-center">' +
                        '<h1>' + data.resultado[i].titulo + '</h1>' +
                        '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col text-center">' +
                        '<h5>' + data.resultado[i].descripcion + '</h5>' +
                        '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col d-flex justify-content-center">' +
                        '<div id="imagen' + data.resultado[i].id + '" class="img-publicacion"></div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col text-center">' +
                        '<h6>' + data.resultado[i].texto + '</h6>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                        );

                $("#imagen" + data.resultado[i].id).css("background-image", "url(" + data.resultado[i].imagen + ")");
            }
        }
    }).fail(function (jqXHR, textEstado) {
        console.log("La solicitud no se pudo realizar error: " + textEstado);
    });
    /*----------------------------------------------------------------*/
    /*                       CLICK NEXT PAGINACION                    */
    /*----------------------------------------------------------------*/
    $(document).on('click', '#next', function (e) {
        if (nextLimit + 3 < cantidadPublicaciones) {
            nextLimit = nextLimit + 3;
            $(".card").remove();
            $.ajax({
                data: {
                    "initialLimit": initialLimit,
                    "nextLimit": nextLimit},
                type: 'GET',
                dataType: "json",
                url: "ObtenerTodasPublicaciones"
            }).done(function (data, textEstado, jqXHR) {
                if (!data.resultado) {
                    console.log("No fue posible regresar los datos");
                } else {
                    for (let i = 0; i < data.resultado.length; i++) {
                        $("#contenedor-cards").append(
                                '<div class="container card mt-2">' +
                                '<div class="row">' +
                                '<div class="col-4">' +
                                '<samll>' + data.resultado[i].fecha_creacion + '</samll>' +
                                '</div>' +
                                '<div class="col-4 text-center">' +
                                '</div>' +
                                '<div class="col-4 d-flex justify-content-end">' +
                                '<label>' + data.resultado[i].num_votos + '</label>' +
                                '<i class="ps-1 like-icon fa-solid fa-thumbs-up"></i>' +
                                '<label class="ps-1">' + data.resultado[i].num_comentarios + '</label>' +
                                '<i class="ps-1 like-icon fa-solid fa-comment"></i>' +
                                '</div>' +
                                '</div>' +
                                '<div class="row">' +
                                '<div class="col text-center">' +
                                '<h1>' + data.resultado[i].titulo + '</h1>' +
                                '</div>' +
                                '</div>' +
                                '<div class="row">' +
                                '<div class="col text-center">' +
                                '<h5>' + data.resultado[i].descripcion + '</h5>' +
                                '</div>' +
                                '</div>' +
                                '<div class="row">' +
                                '<div class="col d-flex justify-content-center">' +
                                '<div id="imagen' + data.resultado[i].id + '" class="img-publicacion"></div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="row">' +
                                '<div class="col text-center">' +
                                '<h6>' + data.resultado[i].texto + '</h6>' +
                                '</div>' +
                                '</div>' +
                                '</div>'
                                );

                        $("#imagen" + data.resultado[i].id).css("background-image", "url(" + data.resultado[i].imagen + ")");
                    }
                }
            }).fail(function (jqXHR, textEstado) {
                console.log("La solicitud no se pudo realizar error: " + textEstado);
            });
        }
    });

    /*----------------------------------------------------------------*/
    /*                       CLICK PREV PAGINACION                    */
    /*----------------------------------------------------------------*/
    $(document).on('click', '#previous', function (e) {
        if (nextLimit > 0) {
            nextLimit = nextLimit - 3;
            $(".card").remove();
            $.ajax({
                data: {
                    "initialLimit": initialLimit,
                    "nextLimit": nextLimit},
                type: 'GET',
                dataType: "json",
                url: "ObtenerTodasPublicaciones"
            }).done(function (data, textEstado, jqXHR) {
                if (!data.resultado) {
                    console.log("No fue posible regresar los datos");
                } else {
                    for (let i = 0; i < data.resultado.length; i++) {
                        $("#contenedor-cards").append(
                                '<div class="container card mt-2">' +
                                '<div class="row">' +
                                '<div class="col-4">' +
                                '<samll>' + data.resultado[i].fecha_creacion + '</samll>' +
                                '</div>' +
                                '<div class="col-4 text-center">' +
                                '</div>' +
                                '<div class="col-4 d-flex justify-content-end">' +
                                '<label>' + data.resultado[i].num_votos + '</label>' +
                                '<i class="ps-1 like-icon fa-solid fa-thumbs-up"></i>' +
                                '<label class="ps-1">' + data.resultado[i].num_comentarios + '</label>' +
                                '<i class="ps-1 like-icon fa-solid fa-comment"></i>' +
                                '</div>' +
                                '</div>' +
                                '<div class="row">' +
                                '<div class="col text-center">' +
                                '<h1>' + data.resultado[i].titulo + '</h1>' +
                                '</div>' +
                                '</div>' +
                                '<div class="row">' +
                                '<div class="col text-center">' +
                                '<h5>' + data.resultado[i].descripcion + '</h5>' +
                                '</div>' +
                                '</div>' +
                                '<div class="row">' +
                                '<div class="col d-flex justify-content-center">' +
                                '<div id="imagen' + data.resultado[i].id + '" class="img-publicacion"></div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="row">' +
                                '<div class="col text-center">' +
                                '<h6>' + data.resultado[i].texto + '</h6>' +
                                '</div>' +
                                '</div>' +
                                '</div>'
                                );

                        $("#imagen" + data.resultado[i].id).css("background-image", "url(" + data.resultado[i].imagen + ")");
                    }
                }
            }).fail(function (jqXHR, textEstado) {
                console.log("La solicitud no se pudo realizar error: " + textEstado);
            });

        }
    });
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