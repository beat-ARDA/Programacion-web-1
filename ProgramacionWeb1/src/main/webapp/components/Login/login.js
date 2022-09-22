$.ajax({
    type: 'GET',
    dataType: "json",
    url: "../../RevisarSesion"
}).done(function (data, textEstado, jqXHR) {
    if (data.resultado) {
        window.location.href = "../../index.html";
    }
}).fail(function (jqXHR, textEstado) {
    console.log("La solicitud no se pudo realizar error: " + textEstado);
});

$(document).ready(function () {
    $("#button-registrarse").click(function () {
        location.href = "../Register/register.html";
    });

    $("#logo").click(function () {
        location.href = "../../index.html";
    });

    $("#Login").submit(function (event) {
        event.preventDefault();
        $.ajax({
            data: $(this).serialize(),
            type: 'POST',
            dataType: "json",
            url: "../../Login"
        }).done(function (data, textEstado, jqXHR) {
            if (data.resultado) {
                console.log(data.resultado);
                window.localStorage.setItem('userName', data.resultado);
                window.location.href = "../../index.html";
            } else {
                alert("Credenciales incorrectas");
            }
        }).fail(function (jqXHR, textEstado) {
            console.log("La solicitud no se pudo realizar error: " + textEstado);
        });
    });
});