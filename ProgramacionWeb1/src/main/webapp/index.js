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
    let idPub;
    $(document).on('click', '.comentario-icon', function (e) {
        idPub = e.currentTarget.id.split('o')[2];
        $(".comentario-item").remove();
        /*-----------------------------------------------------------------------*/
        /*                      CARGAR COMENTARIOS                               */
        /*-----------------------------------------------------------------------*/

        $.ajax({
            data: {
                "idPublicacion": idPub},
            type: 'GET',
            dataType: "json",
            url: "ObtenerComentariosPublicacion"
        }).done(function (data, textEstado, jqXHR) {

            data.resultado.map((dato) => {
                $("#contenedor-comentarios").append(
                        '<div class="comentario-item">' + dato.comentario + '</div>'
                        );
            });
        }).fail(function (jqXHR, textEstado) {
            console.log(jqXHR);
        });
    });

    /*-----------------------------------------------------------------------*/
    /*                      INSERTAR COMENTARIOS                             */
    /*-----------------------------------------------------------------------*/
    $(document).on('click', '#añadir-comentario', function (e) {
        /*OBTENER USUARIO*/
        $.ajax({
            data: {
                "usuario": window.localStorage.getItem('userName')},
            type: 'POST',
            dataType: "json",
            url: "ObtenerUsuario"
        }).done(function (data, textEstado, jqXHR) {
            $.ajax({
                data: {
                    "comentario": $("#comentario").val(),
                    "idPublicacion": idPub,
                    "idUsuario": data.resultado.idusuario},
                type: 'POST',
                dataType: "json",
                url: "InsertarComentario"
            }).done(function (data, textEstado, jqXHR) {
                if (!data)
                    console.log("Error");
                else
                    window.location.reload();
            }).fail(function (jqXHR, textEstado) {
                console.log(jqXHR);
            });
        }).fail(function (jqXHR, textEstado) {
            console.log(jqXHR);
        });
    });

    /*-----------------------------------------------------------------------*/
    /*                       INSERTAR VOTO                                   */
    /*-----------------------------------------------------------------------*/
    $(document).on('click', '.like', function (e) {
        let idIcono = e.currentTarget.id.split('o')[2];

        if ($("#icono" + idIcono).hasClass("like-gray")) {
            $.ajax({
                data: {
                    "usuario": window.localStorage.getItem('userName')},
                type: 'POST',
                dataType: "json",
                url: "ObtenerUsuario"
            }).done(function (data, textEstado, jqXHR) {
                $.ajax({
                    data: {
                        "idUsuario": data.resultado.idusuario,
                        "idPublicacion": idIcono},
                    type: 'POST',
                    dataType: "json",
                    url: "InsertarVoto"
                }).done(function (data, textEstado, jqXHR) {
                    if (!data)
                        console.log(textEstado);
                    else
                        window.location.reload();
                }).fail(function (jqXHR, textEstado) {
                    console.log("La solicitud no se pudo realizar error: " + textEstado);
                });
            }).fail(function (jqXHR, textEstado) {
                console.log("La solicitud no se pudo realizar error: " + textEstado);
            });
        } else if ($("#icono" + idIcono).hasClass("like-blue")) {
            console.log("blue");
            $.ajax({
                data: {
                    "usuario": window.localStorage.getItem('userName')},
                type: 'POST',
                dataType: "json",
                url: "ObtenerUsuario"
            }).done(function (data, textEstado, jqXHR) {
                $.ajax({
                    data: {
                        "idUsuario": data.resultado.idusuario,
                        "idPublicacion": idIcono},
                    type: 'POST',
                    dataType: "json",
                    url: "EliminarVoto"
                }).done(function (data, textEstado, jqXHR) {
                    if (!data)
                        console.log(textEstado);
                    else
                        window.location.reload();
                }).fail(function (jqXHR, textEstado) {
                    console.log("La solicitud no se pudo realizar error: " + textEstado);
                });
            }).fail(function (jqXHR, textEstado) {
                console.log("La solicitud no se pudo realizar error: " + textEstado);
            });
        }
    });

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
                /*OBTENER CANTIDAD DE VOTOS*/
                $.ajax({
                    data: {
                        "idPublicacion": data.resultado[i].id},
                    type: 'GET',
                    dataType: "json",
                    url: "ObtenerCantidadVotosPublicacion"
                }).done(function (cantidad, textEstado, jqXHR) {
                    /*OBTENER ID USUARIO*/
                    $.ajax({
                        data: {
                            "usuario": window.localStorage.getItem('userName')},
                        type: 'POST',
                        dataType: "json",
                        url: "ObtenerUsuario"
                    }).done(function (usuario, textEstado, jqXHR) {
                        /*COMPROBAR SI ACTUAL USUARIO LE A DADO LIKE A LA PUBLI*/
                        $.ajax({
                            data: {
                                "idUsuario": usuario.resultado.idusuario,
                                "idPublicacion": data.resultado[i].id
                            },
                            type: 'GET',
                            dataType: "json",
                            url: "ObtenerVotoPorIdUsuario"
                        }).done(function (existe, textEstado, jqXHR) {
                            /*OBTENER CANTIDAD COMENTARIOS*/
                            $.ajax({
                                data: {
                                    "idPublicacion": data.resultado[i].id},
                                type: 'GET',
                                dataType: "json",
                                url: "ObtenerCantidadComentarios"
                            }).done(function (cantidadComentarios, textEstado, jqXHR) {
                                $("#contenedor-cards").append(
                                        '<div class="container card mt-2">' +
                                        '<div class="row">' +
                                        '<div class="col-4">' +
                                        '<samll>' + data.resultado[i].fecha_creacion + '</samll>' +
                                        '</div>' +
                                        '<div class="col-4 text-center">' +
                                        '</div>' +
                                        '<div class="col-4 d-flex justify-content-end">' +
                                        '<label>' + cantidad.resultado + '</label>' +
                                        '<i id="icono' + data.resultado[i].id + '" class="like ps-1 like-icon fa-solid fa-thumbs-up"></i>' +
                                        '<label class="ps-1">' + cantidadComentarios.resultado + '</label>' +
                                        '<i id="comentario' + data.resultado[i].id + '" data-bs-toggle="modal" data-bs-target="#agregar-comentarios" class="comentario-icon ps-1 like-icon fa-solid fa-comment"></i>' +
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
                                if (existe.resultado)
                                {
                                    $("#icono" + data.resultado[i].id).addClass("like-blue");
                                } else
                                {
                                    $("#icono" + data.resultado[i].id).addClass("like-gray");
                                }

                                $("#imagen" + data.resultado[i].id).css("background-image", "url(" + data.resultado[i].imagen + ")");
                            }).fail(function (jqXHR, textEstado) {
                                console.log("La solicitud no se pudo realizar error: " + textEstado);
                            });
                            ;
                        }).fail(function (jqXHR, textEstado) {
                            console.log("La solicitud no se pudo realizar error: " + textEstado);
                        });
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
                        /*OBTENER CANTIDAD DE VOTOS*/
                        $.ajax({
                            data: {
                                "idPublicacion": data.resultado[i].id},
                            type: 'GET',
                            dataType: "json",
                            url: "ObtenerCantidadVotosPublicacion"
                        }).done(function (cantidad, textEstado, jqXHR) {
                            /*OBTENER ID USUARIO*/
                            $.ajax({
                                data: {
                                    "usuario": window.localStorage.getItem('userName')},
                                type: 'POST',
                                dataType: "json",
                                url: "ObtenerUsuario"
                            }).done(function (usuario, textEstado, jqXHR) {
                                /*COMPROBAR SI ACTUAL USUARIO LE A DADO LIKE A LA PUBLI*/
                                $.ajax({
                                    data: {
                                        "idUsuario": usuario.resultado.idusuario,
                                        "idPublicacion": data.resultado[i].id
                                    },
                                    type: 'GET',
                                    dataType: "json",
                                    url: "ObtenerVotoPorIdUsuario"
                                }).done(function (existe, textEstado, jqXHR) {
                                    /*OBTENER CANTIDAD COMENTARIOS*/
                                    $.ajax({
                                        data: {
                                            "idPublicacion": data.resultado[i].id},
                                        type: 'GET',
                                        dataType: "json",
                                        url: "ObtenerCantidadComentarios"
                                    }).done(function (cantidadComentarios, textEstado, jqXHR) {
                                        $("#contenedor-cards").append(
                                                '<div class="container card mt-2">' +
                                                '<div class="row">' +
                                                '<div class="col-4">' +
                                                '<samll>' + data.resultado[i].fecha_creacion + '</samll>' +
                                                '</div>' +
                                                '<div class="col-4 text-center">' +
                                                '</div>' +
                                                '<div class="col-4 d-flex justify-content-end">' +
                                                '<label>' + cantidad.resultado + '</label>' +
                                                '<i id="icono' + data.resultado[i].id + '" class="like ps-1 like-icon fa-solid fa-thumbs-up"></i>' +
                                                '<label class="ps-1">' + cantidadComentarios.resultado + '</label>' +
                                                '<i id="comentario' + data.resultado[i].id + '" data-bs-toggle="modal" data-bs-target="#agregar-comentarios" class="comentario-icon ps-1 like-icon fa-solid fa-comment"></i>' +
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
                                        if (existe.resultado)
                                        {
                                            $("#icono" + data.resultado[i].id).addClass("like-blue");
                                        } else
                                        {
                                            $("#icono" + data.resultado[i].id).addClass("like-gray");
                                        }

                                        $("#imagen" + data.resultado[i].id).css("background-image", "url(" + data.resultado[i].imagen + ")");
                                    }).fail(function (jqXHR, textEstado) {
                                        console.log("La solicitud no se pudo realizar error: " + textEstado);
                                    });
                                }).fail(function (jqXHR, textEstado) {
                                    console.log("La solicitud no se pudo realizar error: " + textEstado);
                                });
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
                        /*OBTENER CANTIDAD DE VOTOS*/
                        $.ajax({
                            data: {
                                "idPublicacion": data.resultado[i].id},
                            type: 'GET',
                            dataType: "json",
                            url: "ObtenerCantidadVotosPublicacion"
                        }).done(function (cantidad, textEstado, jqXHR) {
                            /*OBTENER ID USUARIO*/
                            $.ajax({
                                data: {
                                    "usuario": window.localStorage.getItem('userName')},
                                type: 'POST',
                                dataType: "json",
                                url: "ObtenerUsuario"
                            }).done(function (usuario, textEstado, jqXHR) {
                                /*COMPROBAR SI ACTUAL USUARIO LE A DADO LIKE A LA PUBLI*/
                                $.ajax({
                                    data: {
                                        "idUsuario": usuario.resultado.idusuario,
                                        "idPublicacion": data.resultado[i].id
                                    },
                                    type: 'GET',
                                    dataType: "json",
                                    url: "ObtenerVotoPorIdUsuario"
                                }).done(function (existe, textEstado, jqXHR) {
                                    /*OBTENER CANTIDAD COMENTARIOS*/
                                    $.ajax({
                                        data: {
                                            "idPublicacion": data.resultado[i].id},
                                        type: 'GET',
                                        dataType: "json",
                                        url: "ObtenerCantidadComentarios"
                                    }).done(function (cantidadComentarios, textEstado, jqXHR) {
                                        $("#contenedor-cards").append(
                                                '<div class="container card mt-2">' +
                                                '<div class="row">' +
                                                '<div class="col-4">' +
                                                '<samll>' + data.resultado[i].fecha_creacion + '</samll>' +
                                                '</div>' +
                                                '<div class="col-4 text-center">' +
                                                '</div>' +
                                                '<div class="col-4 d-flex justify-content-end">' +
                                                '<label>' + cantidad.resultado + '</label>' +
                                                '<i id="icono' + data.resultado[i].id + '" class="like ps-1 like-icon fa-solid fa-thumbs-up"></i>' +
                                                '<label class="ps-1">' + cantidadComentarios.resultado + '</label>' +
                                                '<i id="comentario' + data.resultado[i].id + '" data-bs-toggle="modal" data-bs-target="#agregar-comentarios" class="comentario-icon ps-1 like-icon fa-solid fa-comment"></i>' +
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
                                        if (existe.resultado)
                                        {
                                            $("#icono" + data.resultado[i].id).addClass("like-blue");
                                        } else
                                        {
                                            $("#icono" + data.resultado[i].id).addClass("like-gray");
                                        }

                                        $("#imagen" + data.resultado[i].id).css("background-image", "url(" + data.resultado[i].imagen + ")");
                                    }).fail(function (jqXHR, textEstado) {
                                        console.log("La solicitud no se pudo realizar error: " + textEstado);
                                    });
                                }).fail(function (jqXHR, textEstado) {
                                    console.log("La solicitud no se pudo realizar error: " + textEstado);
                                });
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