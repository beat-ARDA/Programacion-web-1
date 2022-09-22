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
    console.log("Entre");

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
            data: $(this).serialize(),
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


