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
    console.log("Alvaro Ramses Duron Alejo");

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
                console.log(data.resultado);
                $("#titulo").val(data.resultado.titulo);
                $("#descripcion").val(data.resultado.descripcion);
                $("#texto").val(data.resultado.texto);
                if (data.resultado.spoiler === 0)
                    $("#spoiler").prop('checked', false);
                else
                    $("#spoiler").prop('checked', true);
                $("#imagen-prev").attr("src", data.resultado.imagen);

                //$('.myCheckbox').prop('checked', true);
            }).fail(function (jqXHR, textEstado) {
                console.log("La solicitud no se pudo realizar error: " + textEstado);
            });
        }
    });

    $('#form-publicacion').submit(function (event) {
        event.preventDefault();

        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            dataType: "json",
            url: "../../ActualizarPublicacion"
        }).done(function (data) {
            if (data.resultado)
            {
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

