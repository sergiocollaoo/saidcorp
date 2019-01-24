$(document).ready(init_videoblog);
/******************************************************************************************************************************************************************************/
function init_videoblog()
{    
  // $('#txt-cuerpo').froalaEditor({
  //   language: 'es'
  // });
  $('#table-videoblog').DataTable({
    "ordering": false,
    "info":     false,
    "searching": false,
    "autoWidth": false,
    responsive: true,
    "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
    }
  });

  fnc_list_videoblog();
  fnc_get_catvideo();
  $('#form-videoblog').on('submit',fnc_insert_videoblog);
  $(document).on('click','.btn-delete-videoblog', fnc_delete_videoblog);
}
/******************************************************************************************************************************************************************************/
$('#btnAgregarVideoBlog').on('click', function(){
    $('#agregarvideoblog').show();
    $('#listvideoblog').hide();
});

$('#btnCancelarVideoBlog').on('click', function(){
    $('#agregarvideoblog').hide();
    $('#listvideoblog').show();
});
/***********************************************************************************************************************************************************/
function fnc_get_catvideo()
{
    $.getJSON("get_catvideo", function (data){ 
        $.each(data, function(index, val){
            $('#listvideocat').append('<div class="form-check">' +
                                  '<input class="form-check-input" type="radio" name="radCategoria" value="'+val.IDCategoria+'">' +
                                  '<label>' + val.Descripcion + ' </label>' +
                                '</div>');
        })
    });
}
/***********************************************************************************************************************************************************/
function fnc_list_videoblog()
{
    $.getJSON("list_videoblog", function (data){ 

    $('#table-videoblog').DataTable().row().clear().draw( false );
    for (var i = 0; i<data.length;i++) 
    {
        $('#table-videoblog').DataTable().row.add([i+1,
        data[i].Fecha,
        data[i].Descripcion,
        data[i].Titulo,
        data[i].Cuerpo,
        '<a class="btn btn-editar-videoblog" data-idvideo="'+data[i].IDVideo+'"><i class="fa fa-edit"></i></a>'+
        '<a class="btn btn-delete-videoblog" data-idvideo="'+data[i].IDVideo+'"><i class="fa fa-trash"></i></a>'
        ]).draw(false);
    }         
    });
}
/***********************************************************************************************************************************************************/
function fnc_insert_videoblog ()
{
    var inputFileImage          =   $('#txt-videoupimagen')[0];
    var file                    =   inputFileImage.files[0];
    var data_image              = new FormData();
    data_image.append('imagen',file)

    $.ajax({
        url: "subir_videoimagen",
        type:'POST',
        contentType:false,
        data: data_image,
        processData:false,
        cache:false,
        beforeSend: function()
        {
        },
        success: function(resp)
        {
          var data={};    
          data.id_categoria           = $('input:radio[name=radCategoria]:checked').val()
          data.txt_titulo             = $('#txt-videotitulo').val();
          data.txt_cuerpo             = $('#txt-videocuerpo').val();
          data.txt_link               = $('#txt-link').val();
          data.txt_videoupimagen      = resp;

          $.ajax({
              type: "POST",
              url: "insert_videoblog",
              data: JSON.stringify(data),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              async: true,
              beforeSend: function () 
              {
                  
              },
              success: function (resp)
              {  
                  alert('Se registró correctamente');
                  fnc_list_videoblog();
              },
              complete: function () 
              { 

                $('#agregarvideoblog').hide();
                $('#listvideoblog').show();
                fnc_limpiar_campos();
                $('input:radio[name=radCategoria]').prop('checked', false);
                $('.fr-view').html('');
              },
              error: function(resp)
              {
              }
          });
        }
    });    
}
/******************************************************************************************************************************************************************************/
function fnc_delete_videoblog()
{
    var r = confirm("¿Desea eliminar el siguiente Video Blog?");
    if (r == true) {
    var data={}; 
    data.ID_Video  = parseInt($(this).attr('data-idvideo'));

        $.ajax({
            type: "POST",
            url: "delete_videoblog",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () 
            {
            },
            success: function (resp) 
            {  
               fnc_list_videoblog();

            },
            complete: function () 
            {    
                
            },
            error: function(resp)
            {
            }
        });
         alert('Se eliminó correctamente');
    }
}
/***********************************************************************************************************************************************************/