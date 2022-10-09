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
    let userId = "";

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
            console.log(userId);
        }
    }
    ).fail(function (jqXHR, textEstado)
    {
        console.log("La solicitud no se pudo realizar error: " + textEstado);
    });

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

    $('#form-publicacion').submit(function (event) {
        event.preventDefault();
        $.ajax({
            data: {
                "idusuarios": userId,
                "descripcion": $("#descripcion").val(),
                "imagen": null,
                "texto": $("#texto").val(),
                "titulo": $("#titulo").val(),
                "spoiler": $("#spoiler option:selected").text()},
            type: "POST",
            dataType: "json",
            url: "../../InsertarPublicacion"
        }).done(function (data) {
            if (data.resultado)
            {
                alert("Publicacion insertado");
                window.location.reload();
            } else
            {
                console.log(data);
                alert("No se pudo insertar el registro");
            }
        }).fail(function (jqXHR, textEstado) {
            console.log("La solicitud regreso con un error: " + textEstado);
        });
    }
    );
});


