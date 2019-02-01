$(document).ready(init_blog);
/******************************************************************************************************************************************************************************/
function init_blog()
{

  $('#table-blog').DataTable({
    "ordering": false,
    "info":     false,
    "searching": false,
    "autoWidth": false,
    responsive: true,
    "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
    }
  });

  $('#txt-cuerpo').froalaEditor({
    language: 'es'
  });

  fnc_list_blog();
  fnc_get_catblog();

  $('#form-blog').on('submit',fnc_insert_blog);
  $(document).on('click','.btn-delete-blog', fnc_delete_blog);

}
/******************************************************************************************************************************************************************************/
$('#btnAgregarBlog').on('click', function(){
    $('#agregarblog').show();
    $('#listblog').hide();
});

$('#btnCancelarBlog').on('click', function(){
    $('#agregarblog').hide();
    $('#listblog').show();
});
/***********************************************************************************************************************************************************/
function fnc_get_catblog()
{
    $.getJSON("get_catblog", function (data){ 
        $.each(data, function(index, val){
            $('#listcat').append('<div class="form-check">' +
                                  '<input class="form-check-input" type="radio" name="radCategoria" value="'+val.IDCategoria+'">' +
                                  '<label>' + val.Descripcion + ' </label>' +
                                '</div>');
        })
    });
}
/***********************************************************************************************************************************************************/
function fnc_list_blog()
{
    $.getJSON("list_blog", function (data){ 

    $('#table-blog').DataTable().row().clear().draw( false );
    for (var i = 0; i<data.length;i++) 
    {
        $('#table-blog').DataTable().row.add([i+1,
        data[i].Fecha,
        data[i].Descripcion,
        data[i].Titulo,
        data[i].Cuerpo,
        '<a class="btn btn-editar-blog" data-idblog="'+data[i].IDBlog+'"><i class="fa fa-edit"></i></a>'+
        '<a class="btn btn-delete-blog" data-idblog="'+data[i].IDBlog+'"><i class="fa fa-trash"></i></a>'
        ]).draw(false);
    }         
    });
}
/***********************************************************************************************************************************************************/
function fnc_insert_blog ()
{
    var inputFileImage          =   $('#txt-upimagen')[0];
    var file                    =   inputFileImage.files[0];
    var data_image              = new FormData();
    data_image.append('imagen',file)

    $.ajax({
        url: "subir_imagen",
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
          data.txt_titulo             = $('#txt-titulo').val();
          data.txt_cuerpo             = $('#txt-cuerpo').val();
          data.txt_upimagen           = resp;

          $.ajax({
              type: "POST",
              url: "insert_blog",
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
                  fnc_list_blog();
              },
              complete: function () 
              { 

                $('#agregarblog').hide();
                $('#listblog').show();
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
/***********************************************************************************************************************************************************/
function fnc_delete_blog()
{
    var r = confirm("¿Desea eliminar el siguiente Blog?");
    if (r == true) {
    var data={}; 
    data.ID_Blog  = parseInt($(this).attr('data-idblog'));

        $.ajax({
            type: "POST",
            url: "delete_blog",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () 
            {
            },
            success: function (resp) 
            {  
               fnc_list_blog();
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