$(document).ready(function () {
    let banderaNombres = false;
    let banderaApellidos = false;
    let banderaFecha = false;
    let banderaCorreo = false;
    let banderaUsuario = false;
    let banderaContraseña = false;
    let banderaContraseñaCheck = false;

    const regexNombres = /^[a-zA-Z0-9À-ÿ\u00f1\u00d1]+(\s[a-zA-Z0-9À-ÿ\u00f1\u00d1]+)*$/;
    const regexCorreo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    const regexContraseña = /^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])(?=.*[.,*!?¿¡/#$%&])\S{8,64}$/;

    $("#button-inicio").click(function () {
        location.href = "../Login/login.html";
    });

    $("#logo").click(function () {
        location.href = "../../index.html";
    });
    //Aviso nombres
    $("#nombres").ready(function () {
        $("#formato-aviso-nombres").css({"color": "yellow"});
        $("#formato-aviso-nombres").text("Solo letras del español y un solo espacio entre letras");
        banderaNombres = false;
    });

    $("#nombres").on('input', function (ev) {
        if ($("#nombres").val() == "") {
            $("#formato-aviso-nombres").css({"color": "yellow", "weight": "bold"});
            $("#formato-aviso-nombres").text("Solo letras del español y un solo espacio entre letras");
            banderaNombres = false;
        } else if (regexNombres.test(ev.target.value)) {
            $("#formato-aviso-nombres").css({"color": "lightgreen", "weight": "bold"});
            $("#formato-aviso-nombres").text("El formato coincide");
            banderaNombres = true;
        } else {
            $("#formato-aviso-nombres").css({"color": "red", "weight": "bold"});
            $("#formato-aviso-nombres").text("Formato incorrecto solo letras del español y un solo espacio entre letras");
            banderaNombres = false;
        }
    });
    //Aviso Apellidos
    $("#apellidos").ready(function () {
        $("#formato-aviso-apellidos").css({"color": "yellow", "weight": "bold"});
        $("#formato-aviso-apellidos").text("Solo letras del español y un solo espacio entre letras");
        banderaApellidos = false;
    });

    $("#apellidos").on('input', function (ev) {
        if ($("#apellidos").val() == "") {
            $("#formato-aviso-apellidos").css({"color": "yellow", "weight": "bold"});
            $("#formato-aviso-apellidos").text("Solo letras del español y un solo espacio entre letras");
            banderaApellidos = false;
        } else if (regexNombres.test(ev.target.value)) {
            $("#formato-aviso-apellidos").css({"color": "lightgreen", "weight": "bold"});
            $("#formato-aviso-apellidos").text("El formato coincide");
            banderaApellidos = true;
        } else {
            $("#formato-aviso-apellidos").css({"color": "red", "weight": "bold"});
            $("#formato-aviso-apellidos").text("Formato incorrecto solo letras del español y un solo espacio entre letras");
            banderaApellidos = false;
        }
    });
    //Fecha
    $("#fecha-nacimiento").ready(function () {
        let fecha = new Date;
        var dd = fecha.getDate();
        var mm = fecha.getMonth() + 1;
        var yyyy = fecha.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = yyyy + '-' + mm + '-' + dd;
        $("#fecha-nacimiento").attr("max", today);

        $("#formato-aviso-fecha-nacimiento").css({"color": "yellow", "weight": "bold"});
        $("#formato-aviso-fecha-nacimiento").text("Solo personas mayores de 13 años!");
        banderaFecha = false;
    });

    $("#fecha-nacimiento").on('change', function () {
        let hoy = new Date();
        let fechaNacimiento = new Date($("#fecha-nacimiento").val());
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
        if (
                diferenciaMeses < 0 ||
                (diferenciaMeses === 0 && hoy.getDate() <= fechaNacimiento.getDate())
                ) {
            edad--;
        }

        if (edad < 13) {
            $("#formato-aviso-fecha-nacimiento").css({"color": "red", "weight": "bold"});
            $("#formato-aviso-fecha-nacimiento").text("Debes de ser mayor de 13 años!");
            banderaFecha = false;
        } else {
            $("#formato-aviso-fecha-nacimiento").css({"color": "lightgreen", "weight": "bold"});
            $("#formato-aviso-fecha-nacimiento").text("Fecha valida!");
            banderaFecha = true;
        }
    });
    //Email
    $("#correo-electronico").ready(function () {
        $("#formato-aviso-correo").css({"color": "yellow", "weight": "bold"});
        $("#formato-aviso-correo").text("Ingresa un correo valido");
        banderaCorreo = false;
    });

    $("#correo-electronico").on('input', function (ev) {
        if ($("#correo-electronico").val() == "") {
            $("#formato-aviso-correo").css({"color": "yellow", "weight": "bold"});
            $("#formato-aviso-correo").text("Ingresa un correo valido");
            banderaCorreo = false;
        } else if (regexCorreo.test(ev.target.value)) {
            $("#formato-aviso-correo").css({"color": "lightgreen", "weight": "bold"});
            $("#formato-aviso-correo").text("Correo valido¡");
            banderaCorreo = true;
        } else {
            $("#formato-aviso-correo").css({"color": "red", "weight": "bold"});
            $("#formato-aviso-correo").text("Correo no valido");
            banderaCorreo = false;
        }
    });
    //Usuario
    $("#nombre-usuario").ready(function () {
        $("#formato-aviso-usuario").css({"color": "yellow", "weight": "bold"});
        $("#formato-aviso-usuario").text("Ingresa un usuario no se permiten espacios en blanco");
        banderaUsuario = false;
    });

    $("#nombre-usuario").on('input', function (ev) {
        let usuario = $("#nombre-usuario").val().replace(/ /g, "");
        $("#nombre-usuario").val(usuario);
        if ($("#nombre-usuario").val() == "") {
            $("#formato-aviso-usuario").css({"color": "yellow", "weight": "bold"});
            $("#formato-aviso-usuario").text("Ingresa un usuario no se permiten espacios en blanco");
            banderaUsuario = false;
        } else {
            $("#formato-aviso-usuario").css({"color": "lightgreen", "weight": "bold"});
            $("#formato-aviso-usuario").text("Usuario valido¡");
            banderaUsuario = true;
        }
    });
    //Contraseña
    $("#contrasenia").ready(function () {
        $("#formato-aviso-contrasenia").css({"color": "yellow", "weight": "bold"});
        $("#formato-aviso-contrasenia").text("Por lo menos 8 caracteres, una letra mayuscula, una minuscula, un numero y un signo de puntacion");
        banderaContraseña = false;
    });

    function esMayuscula(letra) {
        return letra === letra.toUpperCase();
    }

    function esMinuscula(letra) {
        return letra === letra.toLowerCase();
    }

    $("#contrasenia").on('input', function (ev) {
        //Contar 8 digitos
        let contrasenia = $("#contrasenia").val().replace(/ /g, "");
        $("#contrasenia").val(contrasenia);
        if ($("#contrasenia").val() == "") {
            $("#formato-aviso-contrasenia").css({"color": "yellow", "weight": "bold"});
            $("#formato-aviso-contrasenia").text("Por lo menos 8 caracteres, una letra mayuscula, una minuscula, un numero y un signo de puntacion");
            banderaContraseña = false;
            return;
        }
        if (contrasenia.length < 8) {
            $("#formato-aviso-contrasenia").css({"color": "red", "weight": "bold"});
            $("#formato-aviso-contrasenia").text("Debe de ser mayor a 8 caracteres");
            banderaContraseña = false;
            return;
        }
        let banderaMayus = false;
        let banderaMin = false;
        let banderaNum = false;
        let banderaSigPunt = false;

        for (var index = 0; index < contrasenia.length; index++) {
            var letraActual = contrasenia.charAt(index);
            if (esMayuscula(letraActual) && !banderaMayus)
                banderaMayus = true;
            else if (esMinuscula(letraActual) && !banderaMin)
                banderaMin = true;
            else if (!isNaN(letraActual) && !banderaNum)
                banderaNum = true;
            else if ((
                    letraActual == '.' ||
                    letraActual == ',' ||
                    letraActual == ';' ||
                    letraActual == ':' ||
                    letraActual == '(' ||
                    letraActual == ')' ||
                    letraActual == '[' ||
                    letraActual == ']' ||
                    letraActual == '¿' ||
                    letraActual == '?' ||
                    letraActual == '!' ||
                    letraActual == '¡' ||
                    letraActual == '-') &&
                    !banderaSigPunt)
                banderaSigPunt = true;
        }

        if (!banderaMayus) {
            $("#formato-aviso-contrasenia").css({"color": "red", "weight": "bold"});
            $("#formato-aviso-contrasenia").text("Debe de tener al menos una mayuscula");
            banderaContraseña = false;
            return;
        } else if (!banderaMin) {
            $("#formato-aviso-contrasenia").css({"color": "red", "weight": "bold"});
            $("#formato-aviso-contrasenia").text("Debe de tener al menos una minuscula");
            banderaContraseña = false;
            return;
        } else if (!banderaNum) {
            $("#formato-aviso-contrasenia").css({"color": "red", "weight": "bold"});
            $("#formato-aviso-contrasenia").text("Debe de tener al menos un numero");
            banderaContraseña = false;
            return;
        } else if (!banderaSigPunt) {
            $("#formato-aviso-contrasenia").css({"color": "red", "weight": "bold"});
            $("#formato-aviso-contrasenia").text("Debe de tener al menos un signo de puntuacion");
            banderaContraseña = false;
            return;
        }

        $("#formato-aviso-contrasenia").css({"color": "lightgreen", "weight": "bold"});
        $("#formato-aviso-contrasenia").text("Contraseña valida!");
        banderaContraseña = true;
    });
    //Contra check
    $("#contrasenia-check").ready(function () {
        $("#formato-aviso-contrasenia-check").css({"color": "yellow", "weight": "bold"});
        $("#formato-aviso-contrasenia-check").text("Confirma tu contraseña!");
        banderaContraseñaCheck = false;
    });

    $("#contrasenia-check").on('input', function () {
        if ($("#contrasenia-check").val() == "") {
            $("#formato-aviso-contrasenia-check").css({"color": "yellow", "weight": "bold"});
            $("#formato-aviso-contrasenia-check").text("Confirma tu contraseña!");
            banderaContraseñaCheck = false;
        } else if ($("#contrasenia-check").val() == $("#contrasenia").val()) {
            $("#formato-aviso-contrasenia-check").css({"color": "lightgreen", "weight": "bold"});
            $("#formato-aviso-contrasenia-check").text("Las contraseñas coinciden!");
            banderaContraseñaCheck = true;
        } else if ($("#contrasenia-check").val() !== $("#contrasenia").val()) {
            $("#formato-aviso-contrasenia-check").css({"color": "red", "weight": "bold"});
            $("#formato-aviso-contrasenia-check").text("Las contraseñas no coinciden!");
            banderaContraseñaCheck = false;
        }
    });

    $('#register-form').submit(function (event) {
        event.preventDefault();

        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            dataType: "json",
            url: "../../InsertarUsuario"
        }).done(function (data) {
            console.log(data);
            if (data.resultado)
            {
                alert("Inserte correctamente");
            } else
            {
                alert("No se pudo insertar");
            }
        }).fail(function (jqXHR, textEstado) {
            console.log("La solicitud regreso con un error: " + textEstado);
        });
    });
});