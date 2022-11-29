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
    let banderaFiltro = 0;

    $("#logo").click(function () {
        banderaFiltro = 0;
        /*-----------------------------------------------------------------------*/
        /*              OBTENER PUBLICACIONES                                    */
        /*-----------------------------------------------------------------------*/
        $.ajax({
            data: {
                "banderaFiltro": 0,
                "initialLimit": initialLimit,
                "nextLimit": nextLimit},
            type: 'GET',
            dataType: "json",
            url: "ObtenerTodasPublicaciones"
        }).done(function (data, textEstado, jqXHR) {
            if (!data.resultado) {
                console.log("No fue posible regresar los datos");
            } else {
                $(".card").remove();
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
                                            '<div id="spoiler' + data.resultado[i].id + '" ></div>' +
                                            '</div>' +
                                            '<div class="col-4 d-flex justify-content-end">' +
                                            '<label>' + cantidad.resultado + '</label>' +
                                            '<i id="icono' + data.resultado[i].id + '" class="like ps-1 like-icon fa-solid fa-thumbs-up"></i>' +
                                            '<label class="ps-1">' + cantidadComentarios.resultado + '</label>' +
                                            '<i id="comentario' + data.resultado[i].id + '" data-bs-toggle="modal" data-bs-target="#agregar-comentarios" class="comentario-icon ps-1 like-icon fa-solid fa-comment"></i>' +
                                            '</div>' +
                                            '</div>' +
                                            '<div id="contenido' + data.resultado[i].id + '">' +
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
                                    if (data.resultado[i].spoiler == 1) {
                                        $("#spoiler" + data.resultado[i].id).text("spoiler");
                                        $("#spoiler" + data.resultado[i].id).css("background-color", "red");
                                        $("#spoiler" + data.resultado[i].id).css("color", "white");

                                        if (verSpoilers)
                                        {
                                            $("#contenido" + data.resultado[i].id).css("display", "block");
                                        } else {
                                            $("#contenido" + data.resultado[i].id).css("display", "none");
                                        }
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
    });

    let esSpoiler = false;
    $('#esSpoiler').change(function () {
        if (this.checked) {
            esSpoiler = true;
        } else
        {
            esSpoiler = false;
        }
    });

    let verSpoilers = false;
    $('#verSpoiler').change(function () {
        if (this.checked) {
            verSpoilers = true;
        } else
        {
            verSpoilers = false;
        }
    });


    let parametroFiltro = 0;
    let cantidadPublicaciones = -1;
    let initialLimit = 10;
    let nextLimit = 0;
    let publicacionesBusqueda = false;

    $.ajax({
        data: {
            "banderaFiltro": 0,
            "initialLimit": initialLimit,
            "nextLimit": nextLimit},
        type: 'GET',
        dataType: "json",
        url: "ObtenerTodasPublicaciones"
    }).done(function (data, textEstado, jqXHR) {
        if (!data.resultado) {
            console.log("No fue posible regresar los datos");
        } else {
            $(".card").remove();
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
                                        '<div id="spoiler' + data.resultado[i].id + '" ></div>' +
                                        '</div>' +
                                        '<div class="col-4 d-flex justify-content-end">' +
                                        '<label>' + cantidad.resultado + '</label>' +
                                        '<i id="icono' + data.resultado[i].id + '" class="like ps-1 like-icon fa-solid fa-thumbs-up"></i>' +
                                        '<label class="ps-1">' + cantidadComentarios.resultado + '</label>' +
                                        '<i id="comentario' + data.resultado[i].id + '" data-bs-toggle="modal" data-bs-target="#agregar-comentarios" class="comentario-icon ps-1 like-icon fa-solid fa-comment"></i>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div id="contenido' + data.resultado[i].id + '">' +
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
                                if (data.resultado[i].spoiler == 1) {
                                    $("#spoiler" + data.resultado[i].id).text("spoiler");
                                    $("#spoiler" + data.resultado[i].id).css("background-color", "red");
                                    $("#spoiler" + data.resultado[i].id).css("color", "white");

                                    if (verSpoilers)
                                    {
                                        $("#contenido" + data.resultado[i].id).css("display", "block");
                                    } else {
                                        $("#contenido" + data.resultado[i].id).css("display", "none");
                                    }
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

    /*-----------------------------------------------------------------------*/
    /*                       FILTRO MAS RECIENTES                            */
    /*-----------------------------------------------------------------------*/
    $(document).on('click', '#masRecientes', function (e) {
        var Publicaciones;
        var Usuario;
        banderaFiltro = 1;
        //OBTENER PUBLICACIONES
        Publicaciones = $.ajax({
            data: {
                "banderaFiltro": 1,
                "initialLimit": initialLimit,
                "nextLimit": nextLimit},
            type: 'GET',
            dataType: "json",
            url: "ObtenerTodasPublicaciones"
        }).done(function (data, textEstado, jqXHR) {
            //Colocar publicaciones
            $(".card").remove();
            for (let i = 0; i < data.resultado.length; i++) {
                $("#contenedor-cards").append(
                        '<div class="container card mt-2">' +
                        '<div class="row">' +
                        '<div class="col-4">' +
                        '<samll>' + data.resultado[i].fecha_creacion + '</samll>' +
                        '</div>' +
                        '<div class="col-4 text-center">' +
                        '<div id="spoiler' + data.resultado[i].id + '" ></div>' +
                        '</div>' +
                        '<div class="col-4 d-flex justify-content-end">' +
                        '<label id="cantidadVotos' + data.resultado[i].id + '">' + 0 + '</label>' +
                        '<i id="icono' + data.resultado[i].id + '" class="like ps-1 like-icon fa-solid fa-thumbs-up"></i>' +
                        '<label id="cantidadComentarios' + data.resultado[i].id + '" class="ps-1">' + 0 + '</label>' +
                        '<i id="comentario' + data.resultado[i].id + '" data-bs-toggle="modal" data-bs-target="#agregar-comentarios" class="comentario-icon ps-1 like-icon fa-solid fa-comment"></i>' +
                        '</div>' +
                        '</div>' +
                        '<div id="contenido' + data.resultado[i].id + '">' +
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
                        '</div>' +
                        '</div>'
                        );

                if (data.resultado[i].spoiler == 1) {
                    $("#spoiler" + data.resultado[i].id).text("spoiler");
                    $("#spoiler" + data.resultado[i].id).css("background-color", "red");
                    $("#spoiler" + data.resultado[i].id).css("color", "white");

                    if (verSpoilers)
                    {
                        $("#contenido" + data.resultado[i].id).css("display", "block");
                    } else {
                        $("#contenido" + data.resultado[i].id).css("display", "none");
                    }
                }
                $("#imagen" + data.resultado[i].id).css("background-image", "url(" + data.resultado[i].imagen + ")");
            }
        }).fail(function (jqXHR, textEstado) {
            console.log("Error: " + jqXHR);
        });

        //OBTENER USUARIO
        Usuario = $.ajax({
            data: {
                "usuario": window.localStorage.getItem('userName')},
            type: 'POST',
            dataType: "json",
            url: "ObtenerUsuario"
        }).done(function (usuario, textEstado, jqXHR) {}).fail(function (jqXHR, textEstado) {
            console.log("Error: " + jqXHR);
        });

        //ESTABLECER DATOS A LA PUBLICACION
        Usuario.then(function (usuario) {
            Publicaciones.then(function (data) {
                for (let i = 0; i < data.resultado.length; i++) {
                    //CANTIDAD VOTOS
                    $.ajax({
                        data: {
                            "idPublicacion": data.resultado[i].id},
                        type: 'GET',
                        dataType: "json",
                        url: "ObtenerCantidadVotosPublicacion"
                    }).done(function (cantidad, textEstado, jqXHR) {
                        $("#cantidadVotos" + data.resultado[i].id).text(cantidad.resultado.toString());
                    }).fail(function (jqXHR, textEstado) {
                        console.log("Error: " + jqXHR);
                    });

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
                        if (existe.resultado)
                        {
                            $("#icono" + data.resultado[i].id).addClass("like-blue");
                        } else
                        {
                            $("#icono" + data.resultado[i].id).addClass("like-gray");
                        }
                    }).fail(function (jqXHR, textEstado) {
                        console.log("Error: " + jqXHR);
                    });

                    //OBTENER CANTIDAD DE COMENTARIOS
                    $.ajax({
                        data: {
                            "idPublicacion": data.resultado[i].id},
                        type: 'GET',
                        dataType: "json",
                        url: "ObtenerCantidadComentarios"
                    }).done(function (cantidadComentarios, textEstado, jqXHR) {
                        $("#cantidadComentarios" + data.resultado[i].id).text(cantidadComentarios.resultado.toString());
                    }).fail(function (jqXHR, textEstado) {
                        console.log("Error: " + jqXHR);
                    });
                }
            });
        });
    });

    /*-----------------------------------------------------------------------*/
    /*                       FILTRO MAS COMENTADAS                           */
    /*-----------------------------------------------------------------------*/
    $(document).on('click', '#masComentadas', function (e) {
        var Publicaciones;
        var Usuario;
        banderaFiltro = 2;
        //OBTENER PUBLICACIONES
        Publicaciones = $.ajax({
            data: {
                "banderaFiltro": 2,
                "initialLimit": initialLimit,
                "nextLimit": nextLimit},
            type: 'GET',
            dataType: "json",
            url: "ObtenerTodasPublicaciones"
        }).done(function (data, textEstado, jqXHR) {
            //Colocar publicaciones
            $(".card").remove();
            for (let i = 0; i < data.resultado.length; i++) {
                $("#contenedor-cards").append(
                        '<div class="container card mt-2">' +
                        '<div class="row">' +
                        '<div class="col-4">' +
                        '<samll>' + data.resultado[i].fecha_creacion + '</samll>' +
                        '</div>' +
                        '<div class="col-4 text-center">' +
                        '<div id="spoiler' + data.resultado[i].id + '" ></div>' +
                        '</div>' +
                        '<div class="col-4 d-flex justify-content-end">' +
                        '<label id="cantidadVotos' + data.resultado[i].id + '">' + 0 + '</label>' +
                        '<i id="icono' + data.resultado[i].id + '" class="like ps-1 like-icon fa-solid fa-thumbs-up"></i>' +
                        '<label id="cantidadComentarios' + data.resultado[i].id + '" class="ps-1">' + 0 + '</label>' +
                        '<i id="comentario' + data.resultado[i].id + '" data-bs-toggle="modal" data-bs-target="#agregar-comentarios" class="comentario-icon ps-1 like-icon fa-solid fa-comment"></i>' +
                        '</div>' +
                        '</div>' +
                        '<div id="contenido' + data.resultado[i].id + '">' +
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
                        '</div>' +
                        '</div>'
                        );

                if (data.resultado[i].spoiler == 1) {
                    $("#spoiler" + data.resultado[i].id).text("spoiler");
                    $("#spoiler" + data.resultado[i].id).css("background-color", "red");
                    $("#spoiler" + data.resultado[i].id).css("color", "white");

                    if (verSpoilers)
                    {
                        $("#contenido" + data.resultado[i].id).css("display", "block");
                    } else {
                        $("#contenido" + data.resultado[i].id).css("display", "none");
                    }
                }
                $("#imagen" + data.resultado[i].id).css("background-image", "url(" + data.resultado[i].imagen + ")");
            }
        }).fail(function (jqXHR, textEstado) {
            console.log("Error: " + jqXHR);
        });

        //OBTENER USUARIO
        Usuario = $.ajax({
            data: {
                "usuario": window.localStorage.getItem('userName')},
            type: 'POST',
            dataType: "json",
            url: "ObtenerUsuario"
        }).done(function (usuario, textEstado, jqXHR) {}).fail(function (jqXHR, textEstado) {
            console.log("Error: " + jqXHR);
        });

        //ESTABLECER DATOS A LA PUBLICACION
        Usuario.then(function (usuario) {
            Publicaciones.then(function (data) {
                for (let i = 0; i < data.resultado.length; i++) {
                    //CANTIDAD VOTOS
                    $.ajax({
                        data: {
                            "idPublicacion": data.resultado[i].id},
                        type: 'GET',
                        dataType: "json",
                        url: "ObtenerCantidadVotosPublicacion"
                    }).done(function (cantidad, textEstado, jqXHR) {
                        $("#cantidadVotos" + data.resultado[i].id).text(cantidad.resultado.toString());
                    }).fail(function (jqXHR, textEstado) {
                        console.log("Error: " + jqXHR);
                    });

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
                        if (existe.resultado)
                        {
                            $("#icono" + data.resultado[i].id).addClass("like-blue");
                        } else
                        {
                            $("#icono" + data.resultado[i].id).addClass("like-gray");
                        }
                    }).fail(function (jqXHR, textEstado) {
                        console.log("Error: " + jqXHR);
                    });

                    //OBTENER CANTIDAD DE COMENTARIOS
                    $.ajax({
                        data: {
                            "idPublicacion": data.resultado[i].id},
                        type: 'GET',
                        dataType: "json",
                        url: "ObtenerCantidadComentarios"
                    }).done(function (cantidadComentarios, textEstado, jqXHR) {
                        $("#cantidadComentarios" + data.resultado[i].id).text(cantidadComentarios.resultado.toString());
                    }).fail(function (jqXHR, textEstado) {
                        console.log("Error: " + jqXHR);
                    });
                }
            });
        });
    });

    /*-----------------------------------------------------------------------*/
    /*                       FILTRO MAS VOTADAS                           */
    /*-----------------------------------------------------------------------*/
    $(document).on('click', '#masVotadas', function (e) {
        var Publicaciones;
        var Usuario;
        banderaFiltro = 3;
        //OBTENER PUBLICACIONES
        Publicaciones = $.ajax({
            data: {
                "banderaFiltro": 3,
                "initialLimit": initialLimit,
                "nextLimit": nextLimit},
            type: 'GET',
            dataType: "json",
            url: "ObtenerTodasPublicaciones"
        }).done(function (data, textEstado, jqXHR) {
            //Colocar publicaciones
            $(".card").remove();
            for (let i = 0; i < data.resultado.length; i++) {
                $("#contenedor-cards").append(
                        '<div class="container card mt-2">' +
                        '<div class="row">' +
                        '<div class="col-4">' +
                        '<samll>' + data.resultado[i].fecha_creacion + '</samll>' +
                        '</div>' +
                        '<div class="col-4 text-center">' +
                        '<div id="spoiler' + data.resultado[i].id + '" ></div>' +
                        '</div>' +
                        '<div class="col-4 d-flex justify-content-end">' +
                        '<label id="cantidadVotos' + data.resultado[i].id + '">' + 0 + '</label>' +
                        '<i id="icono' + data.resultado[i].id + '" class="like ps-1 like-icon fa-solid fa-thumbs-up"></i>' +
                        '<label id="cantidadComentarios' + data.resultado[i].id + '" class="ps-1">' + 0 + '</label>' +
                        '<i id="comentario' + data.resultado[i].id + '" data-bs-toggle="modal" data-bs-target="#agregar-comentarios" class="comentario-icon ps-1 like-icon fa-solid fa-comment"></i>' +
                        '</div>' +
                        '</div>' +
                        '<div id="contenido' + data.resultado[i].id + '">' +
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
                        '</div>' +
                        '</div>'
                        );

                if (data.resultado[i].spoiler == 1) {
                    $("#spoiler" + data.resultado[i].id).text("ver spoiler");
                    $("#spoiler" + data.resultado[i].id).css("background-color", "red");
                    $("#spoiler" + data.resultado[i].id).css("color", "white");

                    if (verSpoilers)
                    {
                        $("#contenido" + data.resultado[i].id).css("display", "block");
                    } else {
                        $("#contenido" + data.resultado[i].id).css("display", "none");
                    }
                }



                $("#imagen" + data.resultado[i].id).css("background-image", "url(" + data.resultado[i].imagen + ")");
            }
        }).fail(function (jqXHR, textEstado) {
            console.log("Error: " + jqXHR);
        });

        //OBTENER USUARIO
        Usuario = $.ajax({
            data: {
                "usuario": window.localStorage.getItem('userName')},
            type: 'POST',
            dataType: "json",
            url: "ObtenerUsuario"
        }).done(function (usuario, textEstado, jqXHR) {}).fail(function (jqXHR, textEstado) {
            console.log("Error: " + jqXHR);
        });

        //ESTABLECER DATOS A LA PUBLICACION
        Usuario.then(function (usuario) {
            Publicaciones.then(function (data) {
                for (let i = 0; i < data.resultado.length; i++) {
                    //CANTIDAD VOTOS
                    $.ajax({
                        data: {
                            "idPublicacion": data.resultado[i].id},
                        type: 'GET',
                        dataType: "json",
                        url: "ObtenerCantidadVotosPublicacion"
                    }).done(function (cantidad, textEstado, jqXHR) {
                        $("#cantidadVotos" + data.resultado[i].id).text(cantidad.resultado.toString());
                    }).fail(function (jqXHR, textEstado) {
                        console.log("Error: " + jqXHR);
                    });

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
                        if (existe.resultado)
                        {
                            $("#icono" + data.resultado[i].id).addClass("like-blue");
                        } else
                        {
                            $("#icono" + data.resultado[i].id).addClass("like-gray");
                        }
                    }).fail(function (jqXHR, textEstado) {
                        console.log("Error: " + jqXHR);
                    });

                    //OBTENER CANTIDAD DE COMENTARIOS
                    $.ajax({
                        data: {
                            "idPublicacion": data.resultado[i].id},
                        type: 'GET',
                        dataType: "json",
                        url: "ObtenerCantidadComentarios"
                    }).done(function (cantidadComentarios, textEstado, jqXHR) {
                        $("#cantidadComentarios" + data.resultado[i].id).text(cantidadComentarios.resultado.toString());
                    }).fail(function (jqXHR, textEstado) {
                        console.log("Error: " + jqXHR);
                    });
                }
            });
        });
    });

    /*-----------------------------------------------------------------------*/
    /*                      BUSCAR PUBLICACIONES                             */
    /*-----------------------------------------------------------------------*/
    $("#search-pub").click(function () {
        let valorTexto = $("#valorBusqueda").val();
        banderaFiltro = 0;
        if (valorTexto.trim() == "") {

        } else {
            $.ajax({
                data: {
                    "valorBusqueda": $("#valorBusqueda").val(),
                    "initialLimit": initialLimit,
                    "nextLimit": nextLimit},
                type: 'GET',
                dataType: "json",
                url: "BuscarPublicaciones"
            }).done(function (data, textEstado, jqXHR) {
                publicacionesBusqueda = true;
                $(".card").remove();
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
                                                '<div id="spoiler' + data.resultado[i].id + '" ></div>' +
                                                '</div>' +
                                                '<div class="col-4 d-flex justify-content-end">' +
                                                '<label>' + cantidad.resultado + '</label>' +
                                                '<i id="icono' + data.resultado[i].id + '" class="like ps-1 like-icon fa-solid fa-thumbs-up"></i>' +
                                                '<label class="ps-1">' + cantidadComentarios.resultado + '</label>' +
                                                '<i id="comentario' + data.resultado[i].id + '" data-bs-toggle="modal" data-bs-target="#agregar-comentarios" class="comentario-icon ps-1 like-icon fa-solid fa-comment"></i>' +
                                                '</div>' +
                                                '</div>' +
                                                '<div id="contenido' + data.resultado[i].id + '">' +
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
                                        if (data.resultado[i].spoiler == 1) {
                                            $("#spoiler" + data.resultado[i].id).text("spoiler");
                                            $("#spoiler" + data.resultado[i].id).css("background-color", "red");
                                            $("#spoiler" + data.resultado[i].id).css("color", "white");

                                            if (verSpoilers)
                                            {
                                                $("#contenido" + data.resultado[i].id).css("display", "block");
                                            } else {
                                                $("#contenido" + data.resultado[i].id).css("display", "none");
                                            }
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
            }).fail(function (jqXHR, textEstado) {
                console.log(jqXHR);
            });
        }
    });

    /*-----------------------------------------------------------------------*/
    /*                      CARGAR COMENTARIOS                               */
    /*-----------------------------------------------------------------------*/
    let idPub;
    $(document).on('click', '.comentario-icon', function (e) {
        idPub = e.currentTarget.id.split('o')[2];
        $(".comentario-item").remove();

        $.ajax({
            data: {
                "idPublicacion": idPub},
            type: 'GET',
            dataType: "json",
            url: "ObtenerComentariosPublicacion"
        }).done(function (data, textEstado, jqXHR) {
            data.resultado.map((dato) => {
                if (dato.spoiler === 1 && !verSpoilers)
                {
                    $("#contenedor-comentarios").append(
                            '<div class="comentario-spoiler"> Spoiler </div>'
                            );
                } else {
                    $("#contenedor-comentarios").append(
                            '<div class="comentario-item">' + dato.comentario + '</div>'
                            );
                }
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
                    "esSpoiler": esSpoiler,
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
                        "idPublicacion": idIcono
                    },
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
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: "ObtenerCantidadPublicaciones"
    }).done(function (data, textEstado, jqXHR) {
        cantidadPublicaciones = data.resultado;
    }).fail(function (jqXHR, textEstado) {
        console.log("La solicitud no se pudo realizar error: " + textEstado);
    });

    /*----------------------------------------------------------------*/
    /*                       CLICK NEXT PAGINACION                    */
    /*----------------------------------------------------------------*/
    $(document).on('click', '#next', function (e) {
        let servlet = "";
        if (publicacionesBusqueda) {
            servlet = "BuscarPublicaciones";
        } else {
            servlet = "ObtenerTodasPublicaciones";
        }
        if (nextLimit + 10 < cantidadPublicaciones) {
            nextLimit = nextLimit + 10;
            $(".card").remove();

            var Publicaciones;
            var Usuario;

            //OBTENER PUBLICACIONES
            Publicaciones = $.ajax({
                data: {
                    "valorBusqueda": $("#valorBusqueda").val(),
                    "banderaFiltro": banderaFiltro,
                    "initialLimit": initialLimit,
                    "nextLimit": nextLimit},
                type: 'GET',
                dataType: "json",
                url: servlet
            }).done(function (data, textEstado, jqXHR) {
                //Colocar publicaciones
                $(".card").remove();
                for (let i = 0; i < data.resultado.length; i++) {
                    $("#contenedor-cards").append(
                            '<div class="container card mt-2">' +
                            '<div class="row">' +
                            '<div class="col-4">' +
                            '<samll>' + data.resultado[i].fecha_creacion + '</samll>' +
                            '</div>' +
                            '<div class="col-4 text-center">' +
                            '<div id="spoiler' + data.resultado[i].id + '" ></div>' +
                            '</div>' +
                            '<div class="col-4 d-flex justify-content-end">' +
                            '<label id="cantidadVotos' + data.resultado[i].id + '">' + 0 + '</label>' +
                            '<i id="icono' + data.resultado[i].id + '" class="like ps-1 like-icon fa-solid fa-thumbs-up"></i>' +
                            '<label id="cantidadComentarios' + data.resultado[i].id + '" class="ps-1">' + 0 + '</label>' +
                            '<i id="comentario' + data.resultado[i].id + '" data-bs-toggle="modal" data-bs-target="#agregar-comentarios" class="comentario-icon ps-1 like-icon fa-solid fa-comment"></i>' +
                            '</div>' +
                            '</div>' +
                            '<div id="contenido' + data.resultado[i].id + '">' +
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
                            '</div>' +
                            '</div>'
                            );

                    if (data.resultado[i].spoiler == 1) {
                        $("#spoiler" + data.resultado[i].id).text("spoiler");
                        $("#spoiler" + data.resultado[i].id).css("background-color", "red");
                        $("#spoiler" + data.resultado[i].id).css("color", "white");

                        if (verSpoilers)
                        {
                            $("#contenido" + data.resultado[i].id).css("display", "block");
                        } else {
                            $("#contenido" + data.resultado[i].id).css("display", "none");
                        }
                    }
                    $("#imagen" + data.resultado[i].id).css("background-image", "url(" + data.resultado[i].imagen + ")");
                }
            }).fail(function (jqXHR, textEstado) {
                console.log("Error: " + jqXHR);
            });

            //OBTENER USUARIO
            Usuario = $.ajax({
                data: {
                    "usuario": window.localStorage.getItem('userName')},
                type: 'POST',
                dataType: "json",
                url: "ObtenerUsuario"
            }).done(function (usuario, textEstado, jqXHR) {}).fail(function (jqXHR, textEstado) {
                console.log("Error: " + jqXHR);
            });

            //ESTABLECER DATOS A LA PUBLICACION
            Usuario.then(function (usuario) {
                Publicaciones.then(function (data) {
                    for (let i = 0; i < data.resultado.length; i++) {
                        //CANTIDAD VOTOS
                        $.ajax({
                            data: {
                                "idPublicacion": data.resultado[i].id},
                            type: 'GET',
                            dataType: "json",
                            url: "ObtenerCantidadVotosPublicacion"
                        }).done(function (cantidad, textEstado, jqXHR) {
                            $("#cantidadVotos" + data.resultado[i].id).text(cantidad.resultado.toString());
                        }).fail(function (jqXHR, textEstado) {
                            console.log("Error: " + jqXHR);
                        });

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
                            if (existe.resultado)
                            {
                                $("#icono" + data.resultado[i].id).addClass("like-blue");
                            } else
                            {
                                $("#icono" + data.resultado[i].id).addClass("like-gray");
                            }
                        }).fail(function (jqXHR, textEstado) {
                            console.log("Error: " + jqXHR);
                        });

                        //OBTENER CANTIDAD DE COMENTARIOS
                        $.ajax({
                            data: {
                                "idPublicacion": data.resultado[i].id},
                            type: 'GET',
                            dataType: "json",
                            url: "ObtenerCantidadComentarios"
                        }).done(function (cantidadComentarios, textEstado, jqXHR) {
                            $("#cantidadComentarios" + data.resultado[i].id).text(cantidadComentarios.resultado.toString());
                        }).fail(function (jqXHR, textEstado) {
                            console.log("Error: " + jqXHR);
                        });
                    }
                });
            });
        }
    });

    /*----------------------------------------------------------------*/
    /*                       CLICK PREV PAGINACION                    */
    /*----------------------------------------------------------------*/
    $(document).on('click', '#previous', function (e) {
        let servlet = "";
        if (publicacionesBusqueda) {
            servlet = "BuscarPublicaciones";
        } else {
            servlet = "ObtenerTodasPublicaciones";
        }
        if (nextLimit > 0) {
            nextLimit = nextLimit - 10;
            $(".card").remove();

            var Publicaciones;
            var Usuario;

            //OBTENER PUBLICACIONES
            Publicaciones = $.ajax({
                data: {
                    "valorBusqueda": $("#valorBusqueda").val(),
                    "banderaFiltro": banderaFiltro,
                    "initialLimit": initialLimit,
                    "nextLimit": nextLimit},
                type: 'GET',
                dataType: "json",
                url: servlet
            }).done(function (data, textEstado, jqXHR) {
                //Colocar publicaciones
                $(".card").remove();
                for (let i = 0; i < data.resultado.length; i++) {
                    $("#contenedor-cards").append(
                            '<div class="container card mt-2">' +
                            '<div class="row">' +
                            '<div class="col-4">' +
                            '<samll>' + data.resultado[i].fecha_creacion + '</samll>' +
                            '</div>' +
                            '<div class="col-4 text-center">' +
                            '<div id="spoiler' + data.resultado[i].id + '" ></div>' +
                            '</div>' +
                            '<div class="col-4 d-flex justify-content-end">' +
                            '<label id="cantidadVotos' + data.resultado[i].id + '">' + 0 + '</label>' +
                            '<i id="icono' + data.resultado[i].id + '" class="like ps-1 like-icon fa-solid fa-thumbs-up"></i>' +
                            '<label id="cantidadComentarios' + data.resultado[i].id + '" class="ps-1">' + 0 + '</label>' +
                            '<i id="comentario' + data.resultado[i].id + '" data-bs-toggle="modal" data-bs-target="#agregar-comentarios" class="comentario-icon ps-1 like-icon fa-solid fa-comment"></i>' +
                            '</div>' +
                            '</div>' +
                            '<div id="contenido' + data.resultado[i].id + '">' +
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
                            '</div>' +
                            '</div>'
                            );

                    if (data.resultado[i].spoiler == 1) {
                        $("#spoiler" + data.resultado[i].id).text("spoiler");
                        $("#spoiler" + data.resultado[i].id).css("background-color", "red");
                        $("#spoiler" + data.resultado[i].id).css("color", "white");

                        if (verSpoilers)
                        {
                            $("#contenido" + data.resultado[i].id).css("display", "block");
                        } else {
                            $("#contenido" + data.resultado[i].id).css("display", "none");
                        }
                    }
                    $("#imagen" + data.resultado[i].id).css("background-image", "url(" + data.resultado[i].imagen + ")");
                }
            }).fail(function (jqXHR, textEstado) {
                console.log("Error: " + jqXHR);
            });

            //OBTENER USUARIO
            Usuario = $.ajax({
                data: {
                    "usuario": window.localStorage.getItem('userName')},
                type: 'POST',
                dataType: "json",
                url: "ObtenerUsuario"
            }).done(function (usuario, textEstado, jqXHR) {}).fail(function (jqXHR, textEstado) {
                console.log("Error: " + jqXHR);
            });

            //ESTABLECER DATOS A LA PUBLICACION
            Usuario.then(function (usuario) {
                Publicaciones.then(function (data) {
                    for (let i = 0; i < data.resultado.length; i++) {
                        //CANTIDAD VOTOS
                        $.ajax({
                            data: {
                                "idPublicacion": data.resultado[i].id},
                            type: 'GET',
                            dataType: "json",
                            url: "ObtenerCantidadVotosPublicacion"
                        }).done(function (cantidad, textEstado, jqXHR) {
                            $("#cantidadVotos" + data.resultado[i].id).text(cantidad.resultado.toString());
                        }).fail(function (jqXHR, textEstado) {
                            console.log("Error: " + jqXHR);
                        });

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
                            if (existe.resultado)
                            {
                                $("#icono" + data.resultado[i].id).addClass("like-blue");
                            } else
                            {
                                $("#icono" + data.resultado[i].id).addClass("like-gray");
                            }
                        }).fail(function (jqXHR, textEstado) {
                            console.log("Error: " + jqXHR);
                        });

                        //OBTENER CANTIDAD DE COMENTARIOS
                        $.ajax({
                            data: {
                                "idPublicacion": data.resultado[i].id},
                            type: 'GET',
                            dataType: "json",
                            url: "ObtenerCantidadComentarios"
                        }).done(function (cantidadComentarios, textEstado, jqXHR) {
                            $("#cantidadComentarios" + data.resultado[i].id).text(cantidadComentarios.resultado.toString());
                        }).fail(function (jqXHR, textEstado) {
                            console.log("Error: " + jqXHR);
                        });
                    }
                });
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