$(document).ready(function () {
    $("#button-registrarse").click(function () {
        location.href = "../Register/register.html";
    });

    $("#logo").click(function () {
        location.href = "../../index.html";
    });
    
    //AJAX
    $("#Login").submit(function(event){
       event.preventDefault();
       alert("Enviando informacion");
       
    $.ajax({
        data: $(this).serialize(),
        type: 'POST',
        url: "../../Login"
    }).done(function(data, textEstado, jqXHR){
        console.log(data);
    }).fail(function(jqXHR, textEstado){
        //Al momento de hacer la conexion
        console.log("La solicitud no se pudo realizar error: " + textEstado);
    });
    
    });
});