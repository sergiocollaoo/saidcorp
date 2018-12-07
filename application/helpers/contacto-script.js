(function(){
    $(".boton_envio").click(function() {
 
        var nombre = $(".nombre").val();
            email = $(".email").val();
            validacion_email = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
            telefono = $(".telefono").val();
            asunto = $(".asunto").val();
            mensaje = $(".mensaje").val();
 
        if (nombre == "") {
            $(".nombre").focus();
            return false;
        }else if(email == "" || !validacion_email.test(email)){
            $(".email").focus();    
            return false;
        }else if(telefono == ""){
            $(".telefono").focus();
            return false;
        }else if(asunto == ""){
            $(".asunto").focus();
            return false;
        }else if(mensaje == ""){
            $(".mensaje").focus();
            return false;
        }else{
            var datos = 'nombre='+ nombre + '&email=' + email + '&telefono=' + telefono + '&asunto=' + asunto + '&mensaje=' + mensaje;
            $.ajax({
                type: "POST",
                url: "contacto",
                data: datos,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function() {
                    $('#sendmessage').show();
                },
                error: function() {
                    $('#errormessage').show();                 
                }
            });
            return false;
        }
 
    });
})();

(function(){
    $(".btn_envioc").click(function() {
        var nombre = $(".nombrec").val();
            email = $(".emailc").val();
            validacion_email = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
            telefono = $(".telefonoc").val();
            destino = $('input:radio[name=servicio]:checked').val()
            asunto = $(".asuntoc").val();
            mensaje = $(".mensajec").val();
 
        if (nombre == "") {
            $(".nombrec").focus();
            return false;
        }else if(email == "" || !validacion_email.test(email)){
            $(".emailc").focus();    
            return false;
        }else if(telefono == ""){
            $(".telefonoc").focus();
            return false;
        }else if(asunto == ""){
            $(".asuntoc").focus();
            return false;
        }else if(mensaje == ""){
            $(".mensajec").focus();
            return false;
        }else{
            var datos = 'nombre='+ nombre + '&email=' + email + '&telefono=' + telefono + '&destino=' + destino + '&asunto=' + asunto + '&mensaje=' + mensaje;
            $.ajax({
                type: "POST",
                url: "contactoc",
                data: datos,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function() {
                    $('#sendmessagec').show();
                },
                error: function() {
                    $('#errormessagec').show();                 
                }
            });
            return false;
        }
 
    });
})();
