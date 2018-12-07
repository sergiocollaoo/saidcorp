$(document).ready(init_fua);
/***********************************************************************************************************************************************************/
function init_fua() 
{
    // //INICIO DETALLES DEL SERVICIO
    var fuaservicio = $('#fuaservicio').DataTable({
                        "language": {
                            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                        },
                        "paging":   false,
                        "bRetrieve": true,
                        "ordering": false,
                        "info":     false,
                        "searching": false
                        });

    $('#fuaservicio tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
            $('#editservicio').prop('disabled', true);
            $('#delservicio').prop('disabled', true);
        }
        else {
            fuaservicio.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            $('#editservicio').prop('disabled', false);
            $('#delservicio').prop('disabled', false);
        }
    });
    /*$('#delservicio').click( function () {
        fuaservicio.row('.selected').remove().draw( false );
    });*/
    $(document).on('click','#delservicio', fnc_eliminar_fuadetalles);
    // //FIN

    // // INICIO RETRIBUCIÓN
    var fuaretri = $('#fuaretri').DataTable({
                    "language": {
                        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                    },
                    "paging":   false,
                    "bRetrieve": true,
                    "ordering": false,
                    "info":     false,
                    "searching": false
                    });

    $('#fuaretri tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            fuaretri.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    /*$('#delretri').click( function () {
        fuaretri.row('.selected').remove().draw( false );
    });*/
    $(document).on('click','#delretri', fnc_eliminar_fuar);
    // //FIN
    $('.input-group.date').datepicker({
        format: "dd/mm/yyyy",
        maxViewMode: 2,
        todayBtn: "linked",
        orientation: "bottom auto",
        language: "es",
        autoclose: true,
        todayHighlight: true
    });

    $('#fuaretri tbody').on('dblclick', 'tr', function () {
            $(this).find('td:eq(3) div:eq(1)').hide();
            var v_fechap= $(this).find('td:eq(3) :input').val();
            $(this).find('td:eq(3) div:eq(0)').html(v_fechap);
            $(this).find('td:eq(3) div:eq(0)').show();
    });

    $('#fuaservicio tbody').on( 'click', 'tr', function () {
        var idds = $('#fuaservicio tbody').find("tr.selected td:eq(2)").find('button').attr('data-idfuadetalle');
        if ( $(this).hasClass('selected') ) {
            $('.lbl-idfua').attr('data-idfuads',idds);
        }
        else {
            $('.lbl-idfua').attr('data-idfuads','');
        }
    });

    $('#form-fua').on('submit',fnc_crear_fua);
    $('#modifyDG').on('click',fnc_update_fua);
    $('#form-fuads').on('submit',fnc_insert_fuads);
    $('#edit-fuads').on('click',fnc_update_fuadetalles);
    $('#form-fuar').on('submit',fnc_insert_fuar);
    $('#form-cbcr').on('submit',fnc_update_fuacbcr);
}
/***********************************************************************************************************************************************************/
function fnc_crear_fua()
{
    var data={};    
    data.txt_namerz       = $('#txt-namerz').val();
    data.txt_dniruc       = $('#txt-dniruc').val();
    data.txt_reprelegal   = $('#txt-reprelegal').val();
    data.txt_dni          = $('#txt-dni').val();
    data.txt_contacto     = $('#txt-contacto').val();
    data.txt_domicilio    = $('#txt-domicilio').val();
    data.txt_telefono     = $('#txt-telefono').val();
    data.txt_correo       = $('#txt-correo').val();
    $.ajax({
        type: "POST",
        url: "crear_fua",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
            
        },
        success: function (resp)
        {  
            alert('Se registro correctamente');
            $('#lbl-codfua').html(resp.codfua);
            $('#lbl-codfua').attr('data-idfua',resp.idfua);
            $('.lbl-idfua').attr('data-idfua',resp.idfua);
            $('.lbl-idfua').attr('data-idfua',resp.idfua);
            $('#saveDG').hide();
            $('#modifyDG').show();
        },
        complete: function () 
        {
        },
        error: function(resp)
        {
        }
    });
}
/***********************************************************************************************************************************************************/
function fnc_update_fua()
{   
    var data={};
    data.IDfua            = $('#lbl-codfua').attr('data-idfua');
    data.txt_namerz       = $('#txt-namerz').val();
    data.txt_dniruc       = $('#txt-dniruc').val();
    data.txt_reprelegal   = $('#txt-reprelegal').val();
    data.txt_dni          = $('#txt-dni').val();
    data.txt_contacto     = $('#txt-contacto').val();
    data.txt_domicilio    = $('#txt-domicilio').val();
    data.txt_telefono     = $('#txt-telefono').val();
    data.txt_correo       = $('#txt-correo').val();

    $.ajax({
        type: "POST",
        url: "update_fua",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
        },
        success: function (resp) 
        {  
            alert('Se editó correctamente');
        },
        complete: function () 
        {
        },
        error: function(resp)
        {
        }
    });
}
/***********************************************************************************************************************************************************/
function fnc_update_fuacbcr()
{   
    var data={};
    data.IDfua                  = parseInt($('.lbl-idfua').attr('data-idfua'));
    data.txt_monto              = $('#txt-monto').val();
    data.txt_bono               = $('#txt-bono').val();
    data.txt_observaciones      = $('#txt-obs').val();

    $.ajax({
        type: "POST",
        url: "update_fuacbcr",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
        },
        success: function (resp) 
        {
            alert('Se guardó correctamente');
            $('#montoModal').modal('hide');
        },
        complete: function () 
        {
            $('#txt-montoRO').val($('#txt-monto').val());
            $('#txt-bonoRO').val($('#txt-bono').val());
            $('#txt-obsRO').val($('#txt-obs').val());
        },
        error: function(resp)
        {
        }
    });
}
/***********************************************************************************************************************************************************/
function fnc_insert_fuads()
{
    var data={};
    data.IDfua              = parseInt($('.lbl-idfua').attr('data-idfua'));
    data.txt_accion         = $('#txt-accionds').val();
    data.txt_descripcion    = $('#txt-descripcion').val();

    $.ajax({
        type: "POST",
        url: "insert_fuads",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
            
        },
        success: function (resp)
        {  
            alert('Se agregó correctamente');
            $('#txt-accionds').val('');
            $('#txt-descripcion').val('');
            $('#dsModal').modal('hide');
            fnc_get_fuadetalles();
        },
        complete: function () 
        {     
        },
        error: function(resp)
        {
        }
    });
}
/***********************************************************************************************************************************************************/
function fnc_get_fuadetalles()
{
    var data={};
    data.IDfua              = parseInt($('.lbl-idfua').attr('data-idfua'));

    $.ajax({
        type: "POST",
        url: "get_fuadetalles",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        { 
            $('#fuaservicio').DataTable({
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                },
                retrieve: true,
                "aoColumns" : [
                    { sWidth : "47%" },
                    { sWidth : "47%" },
                    { sWidth : "6%" }
                ],
            }).row().clear().draw(false);
        },
        success: function (data) 
        {
            for (var i = 0; i<data.length;i++) 
            {
                $('#fuaservicio').DataTable().row.add([
                data[i].Accion,
                data[i].Descripcion,
                '<button type="button" data-idfuadetalle="'+data[i].IDFuadetalle+'" class="btn btn-outline-primary btn-agregart" data-toggle="modal" data-target="#agregar-tareas" style="margin-right: 5px;"><i class="fa fa-edit"></i></button>'
                ]).draw(false);
            }
        },
        complete: function () 
        {
        },
        error: function(data)
        {
        }
    });
}
/***********************************************************************************************************************************************************/
function fnc_update_fuadetalles()
{   
    var data={};
    data.IDfuadetalle           = $('.lbl-idfua').attr('data-idfuads');
    data.txt_accion             = $('#txt-accionds').val();
    data.txt_descripcion        = $('#txt-descripcion').val();
    
    $.ajax({
        type: "POST",
        url: "update_fuadetalles",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
        },
        success: function (resp) 
        {  
            alert('Se editó correctamente');
            fnc_get_fuadetalles();
        },
        complete: function () 
        {           
        },
        error: function(resp)
        {
        }
    });
}
/***********************************************************************************************************************************************************/
function fnc_eliminar_fuadetalles()
{
    var r = confirm("¿Desea eliminar el siguiente detalle?");
    if (r == true) {

        var data={};
        data.IDfuadetalle  = parseInt($('#fuaservicio tbody').find("tr.selected td:eq(2)").find('button').attr('data-idfuadetalle'));
        $.ajax({
            type: "POST",
            url: "eliminar_fuadetalles",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () 
            {
            },
            success: function (data) 
            {  
                fnc_get_fuadetalles();
            },
            complete: function () 
            {
                alert("Se eliminó correctamente.")
            },
            error: function(data)
            {
            }
        });
    }
}
/***********************************************************************************************************************************************************/
function fnc_insert_fuar()
{
    var data={};
    data.IDfua                  = parseInt($('.lbl-idfua').attr('data-idfua'));
    data.txt_fechar             = stringToDate($('#txt-fechar').val(),'dd/mm/yyyy','/');
    data.txt_montor             = $('#txt-montor').val();
    data.txt_consideraciones    = $('#txt-consideracion').val();

    $.ajax({
        type: "POST",
        url: "insert_fuar",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
            
        },
        success: function (resp)
        {  
            alert('Se agregó correctamente');
            $('#txt-fechar').val('');
            $('#txt-montor').val('');
            $('#txt-consideracion').val('');
            $('#rModal').modal('hide');
            fnc_get_fuar();
        },
        complete: function () 
        {     
        },
        error: function(resp)
        {
        }
    });
}
/***********************************************************************************************************************************************************/
function fnc_get_fuar()
{
    var data={};
    data.IDfua              = parseInt($('.lbl-idfua').attr('data-idfua'));

    $.ajax({
        type: "POST",
        url: "get_fuar",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        { 
            $('#fuaretri').DataTable({
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                },
                retrieve: true,
                "aoColumns" : [
                    { sWidth : "20%" },
                    { sWidth : "20%" },
                    { sWidth : "40%" },
                    { sWidth : "20%" }
                ],
            }).row().clear().draw(false);
        },
        success: function (data) 
        {
            for (var i = 0; i<data.length;i++) 
            {
                $('#fuaretri').DataTable({
                }).row.add([
                data[i].Fechao,
                data[i].Monto,
                data[i].Consideraciones,
                '<div style="display:none;"></div><div class="input-group date" data-provide="datepicker">'+
                  '<input data-idfuar ="'+data[i].IDFuaretribucion+'" type="text" class="form-control" id="txt-fechap">'+
                  '<div class="input-group-addon">'+
                    '<span class="fa fa-calendar"></span>'+
                  '</div>'+
                '</div>'
                ]).draw(false);
            }

        },
        complete: function () 
        {
            $('.input-group.date').datepicker({
                format: "dd/mm/yyyy",
                maxViewMode: 2,
                todayBtn: "linked",
                orientation: "top auto",
                language: "es",
                autoclose: true,
                todayHighlight: true
            });
        },
        error: function(data)
        {
        }
    });
}
/***********************************************************************************************************************************************************/
function fnc_eliminar_fuar()
{
    var r = confirm("¿Desea eliminar la siguiente retribución?");
    if (r == true) {

        var data={};
        data.IDFuaretribucion  = parseInt($('#fuaretri tbody').find('tr.selected td:eq(3) :input').attr('data-idfuar'));
        
        $.ajax({
            type: "POST",
            url: "eliminar_fuar",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () 
            {
            },
            success: function (data) 
            {  
                fnc_get_fuar();
            },
            complete: function () 
            {
                alert("Se eliminó correctamente.")
            },
            error: function(data)
            {
            }
        });
    }
}
/***********************************************************************************************************************************************************/

/*$('#returnfua').on('click', function () {
    window.open("principal","_self");
    window.onload = init_principal;
        
});*/

$('#saveDG').on('click', function(){
    $('#fuaTab a[href="#DetalleServ"]').removeClass('disabled');
    $('#fuaTab a[href="#DetalleServ"]').tab('show');
});

$('#sgtDS').on('click', function(){
    $('#fuaTab a[href="#Retri"]').removeClass('disabled');
    $('#fuaTab a[href="#Retri"]').tab('show');
    $('#sgtDS').hide();
});

$('#sgtSP').on('click', function(){
    var r = confirm("");
    if (r == true) {
        $('#fuaTab a[href="#SocioProv"]').removeClass('disabled');
        $('#fuaTab a[href="#SocioProv"]').tab('show');
        $('#sgtSP').hide();
    }
});

$('#addservicio').on('click', function(){
    $('#label-ds').html('Agregar detalle del servicio');
    $('#add-fuads').show();
    $('#edit-fuads').hide();
});

$('#editservicio').on('click', function(){
    $('#label-ds').html('Editar detalle del servicio');
    $('#add-fuads').hide();
    $('#edit-fuads').show();
});

$('#addcbc').on('click', function(){
    $('#label-cbc').html('Agregar datos de retribución');
});

$('#editcbc').on('click', function(){
    $('#label-cbc').html('Editar datos de retribución');
});

$('#form-fua').on('keyup keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    return false;
  }
});


