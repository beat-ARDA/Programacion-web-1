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
    /*-----------------------------------------------------------------------*/
    /*                             OBTENER USUARIO DATA HEADER               */
    /*-----------------------------------------------------------------------*/
    $.ajax({
        data: {"usuario": window.localStorage.getItem('userName')},
        type: 'GET',
        dataType: "json",
        url: "../../ObtenerUsuarioData"
    }).done(function (data, textEstado, jqXHR) {
        if (data)
        {
            $("#nombre").text(data.resultado.nombre + " " + data.resultado.apellidos);
            $("#imagen-perfil").css("background-image", "url(../../" + data.resultado.imagen_perfil + ")");
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
            url: "../../CerrarSesion"
        }).done(function (data, textEstado, jqXHR) {
            console.log(data);
            if (data.resultado) {
                alert("Sesion cerrada");
                window.location.href = "../../index.html";
            } else {
                alert("No se pudo cerrar la sesion");
            }
        }).fail(function (jqXHR, textEstado) {
            console.log("La solicitud no se pudo realizar error: " + textEstado);
        });
    });

    /*-----------------------------------------------------------------------*/
    /*              OBTENER PUBLICACIONES POR IDUSUARIO                      */
    /*-----------------------------------------------------------------------*/
    let cantidadPublicaciones;
    let idPublicacion = -1;
    let initialLimit = 2;
    let nextLimit = 0;
    $.ajax({
        data: {
            "usuario": window.localStorage.getItem('userName')},
        type: 'POST',
        dataType: "json",
        url: "../../ObtenerUsuario"
    }).done(function (data, textEstado, jqXHR) {
        if (!data.resultado) {
            console.log("No fue posible regresar los datos");
        } else {
            /*-----------------------------------------------------------------------*/
            /*              OBTENER CANTIDAD                                         */
            /*-----------------------------------------------------------------------*/
            $.ajax({
                data: {"userId": data.resultado.idusuario},
                type: 'GET',
                dataType: "json",
                url: "../../ObtenerCantidadPublicacionesPorUsuario"
            }).done(function (data, textEstado, jqXHR) {
                cantidadPublicaciones = data.resultado;
            }).fail(function (jqXHR, textEstado) {
                console.log("La solicitud no se pudo realizar error: " + textEstado);
            });

            $.ajax({
                data: {
                    "userId": data.resultado.idusuario,
                    "initialLimit": initialLimit,
                    "nextLimit": nextLimit},
                type: 'GET',
                dataType: "json",
                url: "../../ObtenerPublicaciones"
            }).done(function (data, textEstado, jqXHR) {
                if (!data.resultado) {
                    console.log("No fue posible regresar los datos");
                } else {
                    for (let i = 0; i < data.resultado.length; i++) {
                        $.ajax({
                            data: {
                                "idPublicacion": data.resultado[i].id},
                            type: 'GET',
                            dataType: "json",
                            url: "../../ObtenerCantidadVotosPublicacion"
                        }).done(function (cantidadVotosPublicacion, textEstado, jqXHR) {
                            $.ajax({
                                data: {
                                    "idPublicacion": data.resultado[i].id},
                                type: 'GET',
                                dataType: "json",
                                url: "../../ObtenerCantidadComentarios"
                            }).done(function (cantidadComentarios, textEstado, jqXHR) {
                                $("#contenedor-cards").append(
                                        '<div class="container card mt-2">' +
                                        '<div class="row">' +
                                        '<div class="col-4">' +
                                        '<samll>' + data.resultado[i].fecha_creacion + '</samll>' +
                                        '</div>' +
                                        '<div class="col-4 text-center">' +
                                        '<i id="' + data.resultado[i].id + '" class="editar-publicacion like-icon edit-icon fa-solid fa-pen-to-square"></i>' +
                                        '<i id="' + data.resultado[i].id + '" data-bs-toggle="modal" data-bs-target="#eliminar-publicacion-modal" class="eliminar-publicacion ps-2 like-icon trash-icon fa-solid fa-trash"></i>' +
                                        '</div>' +
                                        '<div class="col-4 d-flex justify-content-end">' +
                                        '<label>' + cantidadVotosPublicacion.resultado + '</label>' +
                                        '<i class="ps-1 like-icon fa-solid fa-thumbs-up"></i>' +
                                        '<label class="ps-1">' + cantidadComentarios.resultado + '</label>' +
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

                                $("#imagen" + data.resultado[i].id).css("background-image", "url(../../" + data.resultado[i].imagen + ")");
                            }).fail(function (jqXHR, textEstado) {
                                console.log("La solicitud no se pudo realizar error: " + textEstado);
                            });
                        }).fail(function (jqXHR, textEstado) {
                            console.log("La solicitud no se pudo realizar error: " + textEstado);
                        });
                    }
                }
            }).fail(function (jqXHR, textEstado) {
                console.log("La solicitud no se pudo realizar error: " + textEstado);
            });
        }
    }
    ).fail(function (jqXHR, textEstado)
    {
        console.log("La solicitud no se pudo realizar error: " + textEstado);
    });
    /*----------------------------------------------------------------*/
    /*                       CLICK NEXT PAGINACION                    */
    /*----------------------------------------------------------------*/
    $(document).on('click', '#next', function (e) {
        if (nextLimit + 2 < cantidadPublicaciones) {
            nextLimit = nextLimit + 2;
            $(".card").remove();
            $.ajax({
                data: {
                    "usuario": window.localStorage.getItem('userName')},
                type: 'POST',
                dataType: "json",
                url: "../../ObtenerUsuario"
            }).done(function (data, textEstado, jqXHR) {
                if (!data.resultado) {
                    console.log("No fue posible regresar los datos");
                } else {
                    $.ajax({
                        data: {
                            "userId": data.resultado.idusuario,
                            "initialLimit": initialLimit,
                            "nextLimit": nextLimit},
                        type: 'GET',
                        dataType: "json",
                        url: "../../ObtenerPublicaciones"
                    }).done(function (data, textEstado, jqXHR) {
                        if (!data.resultado) {
                            console.log("No fue posible regresar los datos");
                        } else {
                            for (let i = 0; i < data.resultado.length; i++) {
                                $.ajax({
                                    data: {
                                        "idPublicacion": data.resultado[i].id},
                                    type: 'GET',
                                    dataType: "json",
                                    url: "../../ObtenerCantidadVotosPublicacion"
                                }).done(function (cantidadVotosPublicacion, textEstado, jqXHR) {
                                    $.ajax({
                                        data: {
                                            "idPublicacion": data.resultado[i].id},
                                        type: 'GET',
                                        dataType: "json",
                                        url: "../../ObtenerCantidadComentarios"
                                    }).done(function (cantidadComentarios, textEstado, jqXHR) {
                                        $("#contenedor-cards").append(
                                                '<div class="container card mt-2">' +
                                                '<div class="row">' +
                                                '<div class="col-4">' +
                                                '<samll>' + data.resultado[i].fecha_creacion + '</samll>' +
                                                '</div>' +
                                                '<div class="col-4 text-center">' +
                                                '<i id="' + data.resultado[i].id + '" class="editar-publicacion like-icon edit-icon fa-solid fa-pen-to-square"></i>' +
                                                '<i id="' + data.resultado[i].id + '" data-bs-toggle="modal" data-bs-target="#eliminar-publicacion-modal" class="eliminar-publicacion ps-2 like-icon trash-icon fa-solid fa-trash"></i>' +
                                                '</div>' +
                                                '<div class="col-4 d-flex justify-content-end">' +
                                                '<label>' + cantidadVotosPublicacion.resultado + '</label>' +
                                                '<i class="ps-1 like-icon fa-solid fa-thumbs-up"></i>' +
                                                '<label class="ps-1">' + cantidadComentarios.resultado + '</label>' +
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
                                        $("#imagen" + data.resultado[i].id).css("background-image", "url(../../" + data.resultado[i].imagen + ")");
                                    }).fail(function (jqXHR, textEstado) {
                                        console.log("La solicitud no se pudo realizar error: " + textEstado);
                                    });
                                }).fail(function (jqXHR, textEstado) {
                                    console.log("La solicitud no se pudo realizar error: " + textEstado);
                                });
                            }
                        }
                    }
                    ).fail(function (jqXHR, textEstado) {
                        console.log("La solicitud no se pudo realizar error: " + textEstado);
                    });
                }
            }
            ).fail(function (jqXHR, textEstado)
            {
                console.log("La solicitud no se pudo realizar error: " + textEstado);
            });
        }
    });

    /*----------------------------------------------------------------*/
    /*                       CLICK PREV PAGINACION                    */
    /*----------------------------------------------------------------*/
    $(document).on('click', '#previous', function (e) {
        if (nextLimit > 0) {
            nextLimit = nextLimit - 2;
            $(".card").remove();
            $.ajax({
                data: {
                    "usuario": window.localStorage.getItem('userName')},
                type: 'POST',
                dataType: "json",
                url: "../../ObtenerUsuario"
            }).done(function (data, textEstado, jqXHR) {
                if (!data.resultado) {
                    console.log("No fue posible regresar los datos");
                } else {
                    $.ajax({
                        data: {
                            "userId": data.resultado.idusuario,
                            "initialLimit": initialLimit,
                            "nextLimit": nextLimit},
                        type: 'GET',
                        dataType: "json",
                        url: "../../ObtenerPublicaciones"
                    }).done(function (data, textEstado, jqXHR) {
                        if (!data.resultado) {
                            console.log("No fue posible regresar los datos");
                        } else {
                            for (let i = 0; i < data.resultado.length; i++) {
                                $.ajax({
                                    data: {
                                        "idPublicacion": data.resultado[i].id},
                                    type: 'GET',
                                    dataType: "json",
                                    url: "../../ObtenerCantidadVotosPublicacion"
                                }).done(function (cantidadVotosPublicacion, textEstado, jqXHR) {
                                    $.ajax({
                                        data: {
                                            "idPublicacion": data.resultado[i].id},
                                        type: 'GET',
                                        dataType: "json",
                                        url: "../../ObtenerCantidadComentarios"
                                    }).done(function (cantidadComentarios, textEstado, jqXHR) {
                                        $("#contenedor-cards").append(
                                                '<div class="container card mt-2">' +
                                                '<div class="row">' +
                                                '<div class="col-4">' +
                                                '<samll>' + data.resultado[i].fecha_creacion + '</samll>' +
                                                '</div>' +
                                                '<div class="col-4 text-center">' +
                                                '<i id="' + data.resultado[i].id + '" class="editar-publicacion like-icon edit-icon fa-solid fa-pen-to-square"></i>' +
                                                '<i id="' + data.resultado[i].id + '" data-bs-toggle="modal" data-bs-target="#eliminar-publicacion-modal" class="eliminar-publicacion ps-2 like-icon trash-icon fa-solid fa-trash"></i>' +
                                                '</div>' +
                                                '<div class="col-4 d-flex justify-content-end">' +
                                                '<label>' + cantidadVotosPublicacion.resultado + '</label>' +
                                                '<i class="ps-1 like-icon fa-solid fa-thumbs-up"></i>' +
                                                '<label class="ps-1">' + cantidadComentarios.resultado + '</label>' +
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

                                        $("#imagen" + data.resultado[i].id).css("background-image", "url(../../" + data.resultado[i].imagen + ")");
                                    }).fail(function (jqXHR, textEstado) {
                                        console.log("La solicitud no se pudo realizar error: " + textEstado);
                                    });
                                }).fail(function (jqXHR, textEstado) {
                                    console.log("La solicitud no se pudo realizar error: " + textEstado);
                                });
                            }
                        }
                    }).fail(function (jqXHR, textEstado) {
                        console.log("La solicitud no se pudo realizar error: " + textEstado);
                    });
                }
            }
            ).fail(function (jqXHR, textEstado)
            {
                console.log("La solicitud no se pudo realizar error: " + textEstado);
            });
        }
    });
    /*----------------------------------------------------------------*/
    /*                       EDITAR PUBLICACION                       */
    /*----------------------------------------------------------------*/
    $(document).on('click', '.editar-publicacion', function (e) {
        window.location.href = "../EditarPublicacion/editarpublicacion.html";
        window.localStorage.setItem('publicacionId', e.currentTarget.id);
    });
    /*----------------------------------------------------------------*/
    /*                       ELIMINAR PUBLICACION                     */
    /*----------------------------------------------------------------*/
    $(document).on('click', '.eliminar-publicacion', function (e) {
        idPublicacion = e.currentTarget.id;
        console.log(idPublicacion);
    });
    $(document).on('click', '#aceptar-eliminar-publicacion', function () {
        $.ajax({
            data: {"id": idPublicacion},
            type: 'POST',
            dataType: "json",
            url: "../../EliminarPublicacion"
        }).done(function (data, textEstado, jqXHR) {
            if (data.resultado) {
                $(".toast").addClass('show');
                $('#eliminar-publicacion-modal').modal('toggle');
                window.setTimeout(function () {
                    window.location.reload();
                }, 2000);
            } else {
                alert("No se pudo eliminar la publicacion");
            }
        }).fail(function (jqXHR, textEstado) {
            console.log("La solicitud no se pudo realizar error: " + textEstado);
        });
    });
    /*----------------------------------------------------------------*/
    /*                       IR AL INICIO                             */
    /*----------------------------------------------------------------*/
    $("#logo").click(function () {
        window.location.href = "../../index.html";
    });
    /*----------------------------------------------------------------*/
    /*                       IR A NUEVA PUBLICACION                   */
    /*----------------------------------------------------------------*/
    /*$("#nueva-publicacion").click(function () {
     window.location.href = "../Publicacion/publicacion.html";
     });*/

    $(document).on('click', '#nueva-publicacion', function () {
        window.location.href = "../Publicacion/publicacion.html";
    });
});