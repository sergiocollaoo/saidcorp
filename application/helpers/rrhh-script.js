$(document).ready(init_rrhh);
/***********************************************************************************************************************************************************/
function init_rrhh() 
{
    $('.input-group.date').datepicker({
        format: "dd/mm/yyyy",
        maxViewMode: 2,
        todayBtn: "linked",
        orientation: "bottom auto",
        language: "es",
        autoclose: true,
        todayHighlight: true
    });
    $('.input-daterange').datepicker({
        format: "dd/mm/yyyy",
        maxViewMode: 2,
        todayBtn: "linked",
        orientation: "bottom auto",
        language: "es",
        autoclose: true,
        todayHighlight: true
    });
    $('.grouptimepicker').timepicker({
        minuteStep: 1,
        showMeridian: false,
        showSeconds: true,
        secondStep: 1,
        showInputs: false,
        explicitMode: false

    });

    $('#form-employee').on('submit',fnc_insert_employee);
    $('#form-asistencia').on('submit',fnc_insert_asistencia);
	$('#form-ajustarmarca').on('submit',fnc_insert_ajustar_attendance);
    $('#btn-cname').on('click',fnc_get_asistencia);
    $('#btn-tcname').on('click',fnc_get_timecontrol);
    $('#btn-editar-asistencia').on('click',fnc_update_asistencia)

    $('#form-inserthorario').on('submit',fnc_insert_timecontrol)

    $(document).on('click','.btn-editar-asistencia',fnc_vista_editar_asistencia);
    $(document).on('click','.btn-eliminar-asistencia', fnc_eliminar_asistencia);

    fnc_get_employee();
    fnc_get_datos_attendance();
    
}
/***********************************************************************************************************************************************************/
function fnc_insert_employee ()
{
    var data={};    
    data.txt_name           = $('#txt-name').val();
    data.txt_lastname       = $('#txt-lastname').val();
    data.txt_dni            = $('#txt-dni').val();
    data.txt_day            = stringToDate($('#txt-day').val(),'dd/mm/yyyy','/');
    $.ajax({
        type: "POST",
        url: "insert_employee",
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
            fnc_limpiar_campos();
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
function fnc_get_employee()
{
    $.getJSON("get_employee", function (data){ 

    $('#table-personal').DataTable({
        "aoColumns" : [
            { sWidth : "5%" },
            { sWidth : "50%" },
            { sWidth : "20%" },
            { sWidth : "20%" },
            { sWidth : "5%" }
        ]
    }).row().clear().draw( false );    
    for (var i = 0; i<data.length;i++) 
    {
    $('#table-personal').DataTable().row.add([i+1,
        data[i].CompleteName,
        data[i].DNI,
        data[i].DateAdmission,
       '<button type="button" data-idpersonal="'+data[i].IDEmployee+'" class="btn btn-primary btn-ver-editar-personal"><i class="fa fa-edit"></i></button>'
        ]).draw(false);
    }     
    });
}
/***********************************************************************************************************************************************************/
function fnc_insert_asistencia ()
{
    var data={};    
    data.in_dni            = $('#in-dni').val();

    $.ajax({
        type: "POST",
        url: "insert_asistencia",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
            
        },
        success: function (resp)                                                                                                                        
        {  
            $('#view-welcome').show();
            $('#ver-name').html(resp.completename);
            fnc_limpiar_campos();
        },
        complete: function () 
        {     
            $('#form-asistencia').hide();
        },
        error: function(resp)
        {
        }
    });
}
/***********************************************************************************************************************************************************/

function fnc_get_asistencia()
{
    var data={};    
    data.txt_cname          = $('#txt-cname').val();
    data.txt_fechai         = stringToDate($('#txt-fechai').val(),'dd/mm/yyyy','/');
    data.txt_fechaf         = stringToDate($('#txt-fechaf').val(),'dd/mm/yyyy','/');
    $.ajax({
        type: "POST",
        url: "get_asistencia",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        { 
            $('#table-asistencia').DataTable({
                    retrieve: true,
                    /*scrollY: 600,*/
                    "aoColumnDefs": [
                      { "bSortable": false, "aTargets": [ 1, 2, 3, 4, 5, 6, 7 ] },
                      { "visible": false, "targets": 0 }
                    ],
                    "displayLength": 25,
                    "drawCallback": function ( settings ) {
                        var api = this.api();
                        var rows = api.rows( {page:'current'} ).nodes();
                        var last=null;
             
                        api.column(0, {page:'current'} ).data().each( function ( group, i ) {
                            if ( last !== group ) {
                                $(rows).eq( i ).before(
                                    '<tr class="group"><td colspan="8">'+group+'</td></tr>'
                                );
                                last = group;
                            }
                        } );
                    }
                }).row().clear().draw(false);
        },
        success: function (data) 
        {
            for (var i = 0; i<data.length;i++) 
            {
                $('#table-asistencia').DataTable({
                   retrieve: true,
                    "aoColumnDefs": [
                      { "bSortable": false, "aTargets": [ 1, 2, 3, 4, 5, 6, 7,8 ] },
                      { "visible": false, "targets": 0 }
                    ],
                    "displayLength": 25,
                    "drawCallback": function ( settings ) {
                        var api = this.api();
                        var rows = api.rows( {page:'current'} ).nodes();
                        var last=null;
             
                        api.column(0, {page:'current'} ).data().each( function ( group, i ) {
                            if ( last !== group ) {
                                $(rows).eq( i ).before(
                                    '<tr class="group"><td colspan="8">'+group+'</td></tr>'
                                );
                                last = group;
                            }
                        } );
                    }
                }).row.add([
                data[i].CompleteName,
                data[i].Type,
                data[i].Day,
                data[i].Hour,
                data[i].Motive,
                data[i].Description,
                data[i].Hour_j,
                data[i].FileMotivo,
                '<button type="button" data-idasistencia="'+data[i].IDAttendancecontrol+'" class="btn btn-outline-primary btn-editar-asistencia" data-toggle="modal" data-target="#editar-asistencia" style="margin-right: 5px;"><i class="fa fa-edit"></i></button>' +
                '<button type="button" data-idasistencia="'+data[i].IDAttendancecontrol+'" class="btn btn-outline-danger btn-eliminar-asistencia"><i class="fa fa-close"></i></button>'
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
function fnc_get_datos_attendance()
{
    $('.cbo-personal').html('<option value="0">Seleccione...</option>');
    $('.cbo-motivo').html('<option value="0">Seleccione...</option>');
    $('.cbo-emotivo').html('<option value="0">Seleccione...</option>');
    $.getJSON("get_datos_attendance", function (data){ 
        $.each(data, function(index, val){
            if(val.Tipo == 1){
                $('.cbo-personal').append('<option value="'+val.ID+'">'+val.Descripcion+'</option>');
            }
            else if(val.Tipo == 2) {
                $('.cbo-motivo').append('<option value="'+val.ID+'">'+val.Descripcion+'</option>');
                $('.cbo-emotivo').append('<option value="'+val.ID+'">'+val.Descripcion+'</option>');
            }
            else if(val.Tipo == 3){
                $('#txt-fechai').val(val.ID);
                $('#txt-fechaf').val(val.ID);
                $('#txt-fechaj').val(val.ID);
            }
        })
    });
}
/***********************************************************************************************************************************************************/
function  fnc_insert_ajustar_attendance()
{
    var data={};    
    data.IDEmployee         = $('.cbo-personal').val();
    data.txt_fechaj         = stringToDate($('#txt-fechaj').val(),'dd/mm/yyyy','/');
    data.txt_horaj          = $('#txt-horaj').val();
    data.IDMotive           = $('.cbo-motivo').val();
    data.txt_descripcion    = $('#txtarea-descrip').val();
    $.ajax({
        type: "POST",
        url: "insert_ajustar_attendance",
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
            $('#ajustar-marcacion').modal('hide')
            /*fnc_limpiar_campos();*/
        },
        complete: function () 
        {
            fnc_get_asistencia();
        },
        error: function(resp)
        {
        }
    });
}
/***********************************************************************************************************************************************************/
function fnc_eliminar_asistencia()
{
    var r = confirm("¿Desea eliminar la siguiente asistencia?");
    if (r == true) {

        var data={};
        data.IDattendancecontrol  = parseInt($(this).attr('data-idasistencia'));

        $.ajax({
            type: "POST",
            url: "eliminar_asistencia",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () 
            {
            },
            success: function (data) 
            {  
                fnc_get_asistencia();
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
function fnc_vista_editar_asistencia()
{
    var data={};
    data.IDAttendancecontrol  = parseInt($(this).attr('data-idasistencia'));
    
    $.ajax({
        type: "POST",
        url: "vista_editar_asistencia",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
        },
        success: function (resp) 
        {
            $('#id-asistencia').attr('data-idasistencia',resp[0].IDAttendancecontrol)
            $('#lbl-ename').text(resp[0].Fullname);
            $('.cbo-emotivo').val(resp[0].IDMotivo == null ? 0 :resp[0].IDMotivo).trigger("change");
            $('#txtarea-edescrip').val(resp[0].Description);
            $('#txt-horajustificada').val(resp[0].Hour_j == null ? "00:00:00" : resp[0].Hour_j);
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
function fnc_update_asistencia()
{   
    var data={};
    data.IDAttendancecontrol   = parseInt($('#id-asistencia').attr('data-idasistencia'));
    data.IDMotivo              = parseInt($('.cbo-emotivo').val());
    data.txt_descripcion       = $('#txtarea-edescrip').val();
    data.txt_hourj             = $('#txt-horajustificada').val();        
    data.file_data             = 1;       

    $.ajax({
        type: "POST",
        url: "update_asistencia",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
        },
        success: function (resp) 
        {  
            $('#editar-asistencia').modal('hide');
            alert('Se editó correctamente');
            fnc_get_asistencia();
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
function cpuntos(texto,limite){
    var cpuntos = ' ...';
    if(texto.length > limite){
        texto = texto.substring(0,limite) + cpuntos;
    }
    return texto;
}
/***********************************************************************************************************************************************************/
function fnc_get_timecontrol()
{
    var data={};    
    data.txt_tcname          = $('#txt-tcname').val();

    if(data.txt_tcname == "" || data.txt_tcname.length <= 3 ){
        alert("Por favor no deje la casilla en blanco.");
    }else{
        $.ajax({
            type: "POST",
            url: "get_timecontrol",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () 
            { 
                $("#ver-horarios").show();
                $('#table-horario').DataTable({
                    "paging":   false,
                    "bRetrieve": true,
                    "ordering": false,
                    "info":     false,
                    "searching": false
                }).row().clear().draw(false);
            },
            success: function (data) 
            {
                for (var i = 0; i<data.length;i++) 
                {
                $("#e-personal").attr("mh-personal",data[0].IDEmployee);
                $('#mh-personal').text(data[1].Fullname);
                $('#table-horario').DataTable({
                    "paging":   false,
                    "bRetrieve": true,
                    "ordering": false,
                    "info":     false,
                    "searching": false
                }).row.add([
                    data[i].Datei,
                    data[i].Datef,
                    data[i].Tmi,
                    data[i].Tmf,
                    data[i].Tti,
                    data[i].Ttf,
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
}
/***********************************************************************************************************************************************************/
function fnc_insert_timecontrol ()
{
    var data={};    
    data.IDEmployee       = $('#e-personal').attr("mh-personal");
    data.txt_ifecha        = stringToDate($('#txt-ifecha').val(),'dd/mm/yyyy','/');
    data.txt_ffecha        = stringToDate($('#txt-ffecha').val(),'dd/mm/yyyy','/');
    data.txt_me            = $("#txt-me").val();
    data.txt_ms            = $("#txt-ms").val();
    data.txt_te            = $("#txt-te").val();
    data.txt_ts            = $("#txt-ts").val();
    $.ajax({
        type: "POST",
        url: "insert_timecontrol",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
            
        },
        success: function (resp)
        {  
            $('#agregar-horario').modal('hide');
        },
        complete: function () 
        {     
            fnc_get_timecontrol();
        },
        error: function(resp)
        {
        }
    });
}
/***********************************************************************************************************************************************************/
$('#volver-asistencia').on( "click", function() {
  $('#form-asistencia').show();
  $('#view-welcome').hide();
});

$('.custom-file-input').change(function(){
        var file = this.files[0];
        $(this).next('.form-control-file').addClass("selected").html(
            cpuntos(file.name,12)
        );
        /*$(".form-control-file").append(file.name);*/
});