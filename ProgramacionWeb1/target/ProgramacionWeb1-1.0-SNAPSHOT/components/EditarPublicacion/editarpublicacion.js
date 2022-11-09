/*-----------------------------------------------------------------------*/
/*COMPROBAR SESION*/
/*-----------------------------------------------------------------------*/
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
    /*--------------------------------------------------------*/
    /*                  MANEJO IMAGEN                         */
    /*--------------------------------------------------------*/
    $("#imagen").change(function () {
        const archivo = $(this).get(0).files[0];

        var allowedExtensions = /(.jpg|.jpeg|.png)$/i;
        if (!allowedExtensions.exec(archivo.name)) {
            alert("Extension de imagen no permitida");
            $("#imagen-prev").attr("src", "");
            return;
        }

        if (archivo == undefined || archivo == null) {
            $("#imagen-prev").attr("src", "");
            return;
        }
        const objectURL = URL.createObjectURL(archivo);
        $("#imagen-prev").attr("src", objectURL);
    });
    /*-----------------------------------------------------------*/
    /*                  OBTENER ETIQUETAS ID                 */
    /*-------------------------------------------------------*/
    $.ajax({
        data: {"idPubli": window.localStorage.getItem("publicacionId")},
        type: "GET",
        dataType: "json",
        url: "../../ObtenerEtiquetasId"
    }).done(function (data) {
        /*Obtener etiquetas by id*/
        data.resultado.map((dato) => {
            let etiqueta = dato.idEtiqueta.toString();
            $.ajax({
                data: {"id": etiqueta},
                type: "GET",
                dataType: "json",
                url: "../../ObtenerEtiquetaById"
            }).done(function (data) {
                data.resultado.map((dato) => {
                    $("#tags option[value='" + dato.id + "']").attr("selected", "selected");
                });
            }).fail(function (jqXHR, textEstado) {
                console.log("La solicitud regreso con un error: " + textEstado);
            });
        });

    }).fail(function (jqXHR, textEstado) {
        console.log("La solicitud regreso con un error: " + textEstado);
    });


    /*-----------------------------------------------------------*/
    /*                  OBTENER ETIQUETAS                        */
    /*-----------------------------------------------------------*/
    $.ajax({
        data: {},
        type: "GET",
        dataType: "json",
        url: "../../ObtenerEtiquetas"
    }).done(function (data) {
        data.resultado.map((dato) => {
            $("#tags").append(
                    '<option id="' + dato.id + '" value="' + dato.id + '">' + dato.etiqueta + '</option>'
                    );
        });
    }).fail(function (jqXHR, textEstado) {
        console.log("La solicitud regreso con un error: " + textEstado);
    });
    /*-----------------------------------------------------------*/
    /*                  OBTENER PUBLICACION                      */
    /*-----------------------------------------------------------*/
    $.ajax({
        data: {"usuario": window.localStorage.getItem('userName')},
        type: 'POST',
        dataType: "json",
        url: "../../ObtenerUsuario"
    }).done(function (data, textEstado, jqXHR) {
        if (!data.resultado) {
            console.log("No fue posible regresar los datos");
        } else {
            $.ajax({
                data: {"userId": data.resultado.idusuario, "publicacionId": window.localStorage.getItem("publicacionId")},
                type: 'POST',
                dataType: "json",
                url: "../../ObtenerPublicacion"
            }).done(function (data, textEstado, jqXHR) {
                $("#titulo").val(data.resultado.titulo);
                $("#descripcion").val(data.resultado.descripcion);
                $("#texto").val(data.resultado.texto);
                if (data.resultado.spoiler === 0)
                    $("#spoiler").prop('checked', false);
                else
                    $("#spoiler").prop('checked', true);
                $("#imagen-prev").attr("src", "../../" + data.resultado.imagen);
            }).fail(function (jqXHR, textEstado) {
                console.log("La solicitud no se pudo realizar error: " + textEstado);
            });
        }
    });
    /*-----------------------------------------------------------*/
    /*                   EDITAR PUBLICACION                      */
    /*-----------------------------------------------------------*/
    $('#form-publicacion').submit(function (event) {
        event.preventDefault();
        let formData = new FormData(this);
        formData.append("id", window.localStorage.getItem("publicacionId"));
        $.ajax({
            data: formData,
            type: "POST",
            dataType: "json",
            url: "../../ActualizarPublicacion",
            cache: false,
            contentType: false,
            processData: false
        }).done(function (data) {
            if (data.resultado)
            {
                /*ELIMINAR ETIQUETAS PUBLICACION*/
                $("#tags").val().map((dato) => {
                    $.ajax({
                        data: {"idPubli": window.localStorage.getItem("publicacionId"), "idEtiqueta": dato},
                        type: "POST",
                        dataType: "json",
                        url: "../../EliminarEtiquetaPublicacion"
                    }).done(function (data) {

                    }).fail(function (jqXHR, textEstado) {
                        console.log("La solicitud regreso con un error: " + textEstado);
                    });
                });
                /*ACTUALIZAR ETIQUETA PUBLI*/
                $("#tags").val().map((dato) => {
                    console.log("Entre");
                    $.ajax({
                        data: {"idPubli": window.localStorage.getItem("publicacionId"), "idEtiqueta": dato},
                        type: "POST",
                        dataType: "json",
                        url: "../../InsertarEtiquetaPublicacion"
                    }).done(function (data) {
                        console.log(data);
                    }).fail(function (jqXHR, textEstado) {
                        console.log("La solicitud regreso con un error: " + textEstado);
                    });
                });
                alert("Publicacion actualizada");
                window.location.href = "../AdministrarPublicaciones/administrar-publicaciones.html";
            } else
            {
                console.log(data);
                alert("No se pudo actualizar el registro");
            }
        }).fail(function (jqXHR, textEstado) {
            console.log("La solicitud regreso con un error: " + textEstado);
        });
    }
    );
});


