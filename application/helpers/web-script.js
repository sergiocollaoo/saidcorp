
$(document).ready(init_web);
/******************************************************************************************************************************************************************************/
function init_web()
{
$(".loader").delay(1600).fadeOut("slow");

$('.carousel').carousel({
  interval: 10000
})

navidad();

/* Menu pegado */
var altura = $('.menu').offset().top;
$(window).on('scroll', function(){
  if ($(window).scrollTop() > altura) {
    $('.body-menu-full').addClass('menu-sticky');
  }else{
    $('.body-menu-full').removeClass('menu-sticky');
  }
});

/* web slider de clientes */
  $('#slider-client').slick({
      cssEase: 'linear',
      dots: true,
      slidesToShow: 7,
      slidesToScroll: 1,
      autoplay: true,
      infinite: true,
      centerMode: true,
      mobileFirst: true,
      variableWidth: true,
      prevArrow: false,
      nextArrow: false,
      responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

/*tooltip*/
  $('[data-toggle="tooltip"]').tooltip();
  
/*ver más*/
/*  $('.more').on('click',function(e){
          $(this).siblings().toggle(200);
          $(this).text( $(this).text() == '... Leer menos' ? 'Leer más ...' : '... Leer menos' );
          e.preventDefault();
  });*/

/*blog*/
  select_categoria();
  view_blog("",1,3);
  view_blog2();

  $("#busquedablog").on('click', function(){
    textobuscar = $('input[name=busqueda]').val();
    valoroption = 3;
    view_blog(textobuscar,1,valoroption);
  });

  $("body").on("click",".paginacion li a",function(e){
    e.preventDefault();
    valorhref = $(this).attr("href");
    valorBuscar = $("input[name=busqueda]").val();
    valoroption = 3;
    view_blog(valorBuscar,valorhref,valoroption);
  });

  $('div').on('click', '.bloco a', function(){
    $("input[name=busqueda]").val($(this).attr('buscat'));
    textobuscar = $(this).attr('buscat');
    valoroption = 3;
    view_blog(textobuscar,1,valoroption);
  });
  
  $(document).on('click','.btn-viewblog',view_blog2);

/*inicializar herramienta ciiu*/
  $('#h_ciiu').click(function(event){
    $('#form-ciiu')[0].reset();
    $('#tab-ciiu a[href="#v-pills-home"]').tab('show');
    $('#tbt-ciiu').html('<thead class="thead-light">'+
                        '<tr>'+
                          '<th scope="col">Periodo</th>'+
                          '<th scope="col">Base de ventas</th>'+
                          '<th scope="col">IGV a pagar</th>'+
                          '<th scope="col">Ratio</th>'+
                          '<th scope="col">Indicador</th>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody>'+
                      '<tr>'+
                        '<td><input type="text" class="form-control"></td>'+
                        '<td><input type="text" class="form-control BVciiu" value="0.000" onClick="this.select()"></td>'+
                        '<td><input type="text" class="form-control IGVciiu" value="0.000" onClick="this.select()"></td>'+
                        '<td><input type="text" class="form-control ratciiu" readonly></td>'+
                        '<td><input type="text" class="form-control"></td>'+
                      '</tr>'+
                    '</tbody>'+
                    '<tfoot>'+
                      '<tr>'+
                        '<th>Periodo</th>'+
                        '<th>Base de ventas</th>'+
                        '<th>IGV a pagar</th>'+
                        '<th>Ratio</th>'+
                        '<th>Indicador</th>'+
                      '</tr>'+
                    '</tfoot>');
  });

/*ciiu optimo*/
  $('#plusciiu').on('click', function(){
    $('#tbt-ciiu').append('<tr>'+
                    '<td><input type="text" class="form-control"></td>'+
                    '<td><input type="text" class="form-control BVciiu" value="0.000" onClick="this.select()"></td>'+
                    '<td><input type="text" class="form-control IGVciiu" value="0.000" onClick="this.select()"></td>'+
                    '<td><input type="text" class="form-control ratciiu" readonly></td>'+
                    '<td><input type="text" class="form-control"></td>'+
                  '</tr>');
    view_ciiu();
    sumcolumnas();
    sumfilas();
  });

  $('#txt-ciiu').keyup(function(e){
    if($(this).val().length == 4){
      view_ciiu();
    }
  });
}
/******************************************************************************************************************************************************************************/
function navidad(){
  var a = new Date();
  var añoactual = a.getFullYear();

  var fechahoy = moment(a).format("YYYY-MM-DD");

  var di = new Date(añoactual,'11','01');
  var diciembrei = moment(di).format("YYYY-MM-DD");

  var df = new Date(añoactual,'11','31');
  var diciembref = moment(df).format("YYYY-MM-DD");
  // var range = moment().range(di, df);
  if (moment(fechahoy).isBetween(diciembrei,diciembref)) {
    $.fn.snow({ minSize: 15, maxSize: 37, newOn: 600, flakeColor: '#b7c2f0'});
    $(".logo-navidad").show();
    $(".logo-normal").hide();
  }else{
    $(".logo-navidad").hide();
    $(".logo-normal").show();
  }
}
/******************************************************************************************************************************************************************************/
function view_blog(valorBuscar,pagina,cantidad){
  $.ajax({
    url : "view_blog",
    type: "POST",
    data: {buscar:valorBuscar,nropagina:pagina,cantidad:cantidad},
    dataType:"json",
    success:function(response){
      filas = "";
      $.each(response.ver_blog,function(key,val){
        filas+='<div class="card mb-4" idblog="' + val.IDBlog + '">' +
                  '<img class="card-img-top" src="' + val.Imagen + '" alt="Card image cap">' +
                  '<div class="card-body">' +
                    '<h2 class="card-title">' + val.Titulo + '</h2>' +
                    '<div class="card-text pointsusp">' + val.Cuerpo + '</div>'+  
                  '</div>' +
                  '<div class="card-body">'+
                    '<a href="novedades_view?idblog='+val.IDBlog+'&title='+val.Titulo+'" class="btn btn-primary btn-viewblog">Leer más &rarr;</a>' +
                  '</div>'+
                  '<div class="card-footer d-flex text-muted justify-content-between">'+
                    '<div idcat="' + val.IDCategoria + '">' + val.Descripcion + '</div>'+
                    '<div>Publicado el ' + val.Fecha + '</div>'+
                  '</div>'+
                '</div>';
      });
      if (filas == "") {
        $("#viewblog").html('<div class="text-center text-muted">No existen resultados</div><br><br>');
      }else{
        $("#viewblog").html(filas);
      }
      

      linkseleccionado = Number(pagina);
      //total registros
      totalregistros = response.totalregistros;
      //cantidad de registros por pagina
      cantidadregistros = response.cantidad;

      numerolinks = Math.ceil(totalregistros/cantidadregistros);

      paginador = "<ul class='pagination justify-content-center'>";
      if(linkseleccionado>1)
      {
        paginador+="<li class='page-item'><a class='page-link' href='1'>&laquo;</a></li>";
        paginador+="<li class='page-item'><a class='page-link' href='"+(linkseleccionado-1)+"' '>&lsaquo;</a></li>";

      }
      else
      {
        paginador+="<li class='page-item disabled'><a class='page-link' href='#'>&laquo;</a></li>";
        paginador+="<li class='page-item disabled'><a class='page-link' href='#'>&lsaquo;</a></li>";
      }
      //muestro de los enlaces 
      //cantidad de link hacia atras y adelante
      cant = 2;
      //inicio de donde se va a mostrar los links
      pagInicio = (linkseleccionado > cant) ? (linkseleccionado - cant) : 1;
      //condicion en la cual establecemos el fin de los links
      if (numerolinks > cant)
      {
        //conocer los links que hay entre el seleccionado y el final
        pagRestantes = numerolinks - linkseleccionado;
        //defino el fin de los links
        pagFin = (pagRestantes > cant) ? (linkseleccionado + cant) :numerolinks;
      }
      else 
      {
        pagFin = numerolinks;
      }

      for (var i = pagInicio; i <= pagFin; i++) {
        if (i == linkseleccionado)
          paginador +="<li class='page-item active'><a class='page-link' href='javascript:void(0)'>"+i+"</a></li>";
        else
          paginador +="<li class='page-item'><a class='page-link' href='"+i+"'>"+i+"</a></li>";
      }
      //condicion para mostrar el boton sigueinte y ultimo
      if(linkseleccionado<numerolinks)
      {
        paginador+="<li class='page-item'><a class='page-link' href='"+(linkseleccionado+1)+"' >&rsaquo;</a></li>";
        paginador+="<li class='page-item'><a class='page-link' href='"+numerolinks+"'>&raquo;</a></li>";

      }
      else
      {
        paginador+="<li class='page-item disabled'><a class='page-link' href='#'>&rsaquo;</a></li>";
        paginador+="<li class='page-item disabled'><a class='page-link' href='#'>&raquo;</a></li>";
      }
      
      paginador +="</ul>";
      $(".paginacion").html(paginador);
    }
  });
}
/******************************************************************************************************************************************************************************/
function view_blog2()
{
    var idblog = getParameterByName('idblog');
    var data={};
    data.idblog = idblog

    $.ajax({
    url : "view_blog2",
    type: "POST",
    data: JSON.stringify(data),
    dataType:"json",
    success:function(resp){
      
    $('#viewblog2').html('<img class="img-fluid rounded" src="'+resp[0].Imagen+'" alt="">'+
                        '<hr>'+
                        '<p>Publicado el '+resp[0].Fecha+'</p>'+
                        '<hr>'+
                        '<h3 class="card-title">'+resp[0].Titulo+'</h3>'+
                        '<p>'+resp[0].Cuerpo+'</p>'+
                        '<hr>'+
                        '<p>Categoria: '+resp[0].Descripcion+'</p>');
    }
  });
}
/******************************************************************************************************************************************************************************/
function view_hour(){
        if (!document.layers&&!document.all&&!document.getElementById)
        return

         var Digital=new Date()
         var hours=Digital.getHours()
         var minutes=Digital.getMinutes()
         var seconds=Digital.getSeconds()

        var dn="PM"
        if (hours<12)
        dn="AM"
        if (hours>12)
        hours=hours-12
        if (hours==0)
        hours=12

         if (minutes<=9)
         minutes="0"+minutes
         if (seconds<=9)
         seconds="0"+seconds
        //change font size here to your desire
        myclock="<font size='5' face='Arial' >"+hours+":"+minutes+":"
         +seconds+" "+dn+"</font>"
        if (document.layers){
        document.layers.liveclock.document.write(myclock)
        document.layers.liveclock.document.close()
        }
        else if (document.all)
        liveclock.innerHTML=myclock
        else if (document.getElementById)
        document.getElementById("liveclock").innerHTML=myclock
        setTimeout("view_hour()",1000)
         }

        window.onload=view_hour();
/******************************************************************************************************************************************************************************/
function select_categoria()
{
    $.getJSON("get_catblog", function (data){
        concat = '';
        concat += '<div class="bloco"><a class="catblog" buscat=" ">Todos</a></div>';
        $.each(data, function(index, val){
          concat += '<div class="bloco"><a class="catblog" buscat="' + val.Descripcion + '">' + val.Descripcion + '</a></div>';
        })
        $('.dividir').html(concat);

        $('.bloco').each(function (inx) {

                if (!$(this).parent().hasClass('contain')) {
                    if (inx % Math.ceil(data.length/2) == 0) {
                        $('.dividir').append($('<div></div>')
                            .addClass('contain col-6')
                            .append($(this)));
                    } else {
                        $('.contain:last').append($(this));
                    }
                }
            });
    });
}
/******************************************************************************************************************************************************************************/
function view_ciiu()
{
    var data={};    
    data.codciiu          = $('#txt-ciiu').val();

    $.ajax({
        type: "POST",
        url: "view_ciiu",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () 
        { 
        },
        success: function (resp) 
        {
          $('#ciiu-ae').val(resp[0].Descripcion);
          $('.ratciiu').val(resp[0].Ratio);
        },
        complete: function () 
        {
        },
        error: function(resp)
        {
        }
    });
}

function sumcolumnas(){
   var sumBV = 0;
   var sumIGV = 0;
  $("td input.BVciiu").each(function(){
   sumBV += parseFloat($(this).val());
  });
  
  $("td input.IGVciiu").each(function(){
   sumIGV += parseFloat($(this).val());
  });

  $('#sumBV').val(sumBV);
  $('#sumIGV').val(sumIGV);
}

function sumfilas(){
   var sumBV = 0;
   var sumIGV = 0;
  $("tr input").each(function(){
   sumBV += parseFloat($(this).val());
  });

  alert(sumBV);
  $('#sumBV').val(sumBV);
}

