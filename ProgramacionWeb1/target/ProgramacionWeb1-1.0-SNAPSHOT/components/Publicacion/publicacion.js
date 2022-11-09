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
    let userId = "";
    /*-----------------------------------------------------------*/
    /*                  OBTENER USUARIO ID                       */
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
            userId = data.resultado.idusuario;
        }
    }
    ).fail(function (jqXHR, textEstado)
    {
        console.log("La solicitud no se pudo realizar error: " + textEstado);
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
    /*                  IR A INICIO                              */
    /*-----------------------------------------------------------*/
    $("#logo").click(function () {
        window.location.href = "../../index.html";
    });

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
    /*                  ISERTAR PUBLICACION                      */
    /*-----------------------------------------------------------*/
    $('#form-publicacion').submit(function (event) {
        event.preventDefault();

        /*INSERTAR PUBLICACION*/
        let formData = new FormData(this);
        formData.append("idusuarios", userId);
        $.ajax({
            data: formData,
            type: "POST",
            dataType: "json",
            url: "../../InsertarPublicacion",
            cache: false,
            contentType: false,
            processData: false
        }).done(function (data) {
            let idPublicacion = data.resultado.toString();
            $("#tags").val().map((dato) => {
                $.ajax({
                    data: {"idPubli": idPublicacion, "idEtiqueta": dato},
                    type: "POST",
                    dataType: "json",
                    url: "../../InsertarEtiquetaPublicacion"
                }).done(function (data) {
                    console.log(data);
                }).fail(function (jqXHR, textEstado) {
                    console.log("La solicitud regreso con un error: " + textEstado);
                });
            });
            alert("Publicacion insertada");
            window.location = "../AdministrarPublicaciones/administrar-publicaciones.html";
        }).fail(function (jqXHR, textEstado) {
            console.log("La solicitud regreso con un error: " + textEstado);
        });
    }
    );
});


