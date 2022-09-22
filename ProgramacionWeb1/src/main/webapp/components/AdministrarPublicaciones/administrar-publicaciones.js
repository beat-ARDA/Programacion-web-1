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
    let idPublicacion = -1;

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
                data: {"userId": data.resultado.idusuario},
                type: 'POST',
                dataType: "json",
                url: "../../ObtenerPublicaciones"
            }).done(function (data, textEstado, jqXHR) {
                if (!data.resultado) {
                    console.log("No fue posible regresar los datos");
                } else {
                    for (let i = 0; i < data.resultado.length; i++) {
                        $("#contenedor-cards").append(
                                '<div class="row mx-5">' +
                                '<div class="col">' +
                                '<div class="px-4 card mt-2 d-flex flex-row align-items-center justify-content-between">' +
                                '<label>' + data.resultado[i].titulo + '</label>' +
                                '<label>' + data.resultado[i].descripcion + '</label>' +
                                '<div class="d-flex flex-column">' +
                                '<label>' + data.resultado[i].fecha_creacion + '</label>' +
                                '<label>Num comentarios: ' + data.resultado[i].num_comentarios + '</label>' +
                                '<label>Num votados: ' + data.resultado[i].num_votos + '</label>' +
                                '</div>' +
                                '<div>' +
                                '<i id="' + data.resultado[i].id + '" class="px-3 editar-publicacion icono-administrar-usuario fa-solid fa-pen"></i>' +
                                '<i data-bs-toggle="modal" data-bs-target="#eliminar-publicacion-modal" id="' + data.resultado[i].id + '" class="px-3 eliminar-publicacion icono-administrar-usuario fa-solid fa-trash"></i>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>'

                                );
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

    $(document).on('click', '.editar-publicacion', function (e) {
        window.location.href = "../EditarPublicacion/editarpublicacion.html";
        window.localStorage.setItem('publicacionId', e.currentTarget.id);
    });

    $(document).on('click', '.eliminar-publicacion', function (e) {
        idPublicacion = e.currentTarget.id;
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

    $("#logo").click(function () {
        window.location.href = "../../index.html";
    });

    $("#nueva-publicacion").click(function () {
        window.location.href = "../Publicacion/publicacion.html";
    });
});