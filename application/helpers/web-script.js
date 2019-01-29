
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
      dots: false,
      slidesToShow: 5,
      slidesToScroll: 3,
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
  select_catblog();
  view_blog("",1,3);
  view_blog2();

  select_catvideo();
  view_video();
  view_video2();
  $(document).on('click','.catvideoblog',search_video);

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

  var df = new Date(añoactual,'12','01');
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
      attfilas = "";
      $.each(response.ver_blog,function(key,val){
        filas+= '<div class="mb-4" idblog="' + val.IDBlog + '">'+
                    '<div class="row no-gutters mb-3">'+
                        '<div class="col-4">'+
                            '<img src="' + val.Imagen + '" class="img-fluid" alt="">'+
                        '</div>'+
                        '<div class="col-8">'+
                            '<div class="card-block px-4">'+
                      '<p class="text-muted" style="font-size: 12px;">Publicado el ' + val.Fecha + '</p>'+
                                '<h5 class="card-title">' + val.Titulo + '</h5>'+
                                '<div class="card-text pointsusp">' + val.Cuerpo + '</div>'+
                                '<div class="d-flex justify-content-between">'+
                                  '<a href="normativas_view?idblog='+val.IDBlog+'&title='+val.Titulo+'" class="btn btn-primary btn-viewblog">Leer más &rarr;</a>'+
                                  '<span class="text-muted d-flex align-items-center" idcat="' + val.IDCategoria + '" style="font-size: 12px;">Categoria: ' + val.Descripcion + '</span>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<hr>'+
                '</div>';

        attfilas+='<div class="card mb-4" idblog="' + val.IDBlog + '">' +
                  '<img class="card-img-top" src="assets/images/blog/20190123_082015_FWGCULRB5E.png" alt="Card image cap">' +
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
      if ((filas == "") && (attfilas == "")) {
        $("#viewblog").html('<div class="text-center text-muted">No existen resultados</div><br><br>');
        $("#attnovedades").html('<div class="text-center text-muted">No existen resultados</div><br><br>');
      }else{
        $("#viewblog").html(filas);
        $("#attnovedades").html(attfilas);
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
function view_video()
{
    $.getJSON("view_video", function (data){ 
        $.each(data, function(index, val){
            $('.viewvideo').append('<div class=" col-lg-4 col-md-6 col-sm-12 col-xs-12 d-flex p-2">'+
                        '<div class="card bg-light">'+
                        '<a href="videos_view?idvideo='+val.IDVideo+'&title='+val.Titulo+'"><img class="card-img-top" src="'+ val.Imagen+'" alt="Card image cap"></a>'+
                        '<div class="card-body">'+
                        '<p class="card-text"><small class="text-muted">'+ val.Fecha +'</small></p>'+
                          '<h5 class="card-title">'+ val.Titulo +'</h5>'+
                          '<p class="card-text text-justify">'+ val.Cuerpo+'</p>'+
                          '<p class="card-text"><small class="text-muted">Categoria: '+ val.Descripcion+'</small></p>'+
                          '<p class="card-tex text-center"><a href="videos_view?idvideo='+val.IDVideo+'&title='+val.Titulo+'" class="btn btn-outline-info">Ver más</a></p>'+
                        '</div>'+
                        '</div>'+
                      '</div>');
            //$('.grid').append('<div class="grid-item"><img src="'+ val.Imagen+'" alt="Card image cap"></div>');
        })
    });
}
/******************************************************************************************************************************************************************************/
function view_video2()
{
    var idvideo = getParameterByName('idvideo');
    var data={};
    data.idvideo = idvideo

    $.ajax({
    url : "view_video2",
    type: "POST",
    data: JSON.stringify(data),
    dataType:"json",
    success:function(resp){
      
    $('#viewvideo2').html('<div><small class="text-muted">'+ resp[0].Fecha +' / Categoria: '+ resp[0].Descripcion +'</small></div>'+
              '<h3 class="mt-4 mb-3">'+resp[0].Titulo+'</h3>'+
              '<br>'+
              '<div class="embed-responsive embed-responsive-4by3">'+
              '<iframe src="'+resp[0].Link+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'+
            '</div>'+
            '<br>'+
            '<hr>'+
            '<div class="text-center">COMPARTIR:</div>'+
            '<div class="fb-share-button" data-href="http://saidcorp.pe/videos_view?idvideo=17&title=#NuestraFamilia" data-layout="button" data-size="large" data-mobile-iframe="true"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fsaidcorp.pe%2Fnovedades_view%3Fidblog%3D181%26title%3DNormas%2BTributarias&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore"></a></div>');
    }
  });
}
/******************************************************************************************************************************************************************************/
function search_video(){

    var data={};
    data.v_buscar = $(this).attr('buscav');

    $.ajax({
        type: "POST",
        url: "get_catvideoblog",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        beforeSend: function () 
        {
            $('.viewvideo').html('');
        },
        success: function (data)
        {  
          $.each(data, function(index, val){
            $('.viewvideo').append('<div class=" col-lg-4 col-md-6 col-sm-12 col-xs-12 d-flex p-2">'+
                        '<div class="card bg-light">'+
                        '<a href="videos_view?idvideo='+val.IDVideo+'&title='+val.Titulo+'"><img class="card-img-top" src="'+ val.Imagen+'" alt="Card image cap"></a>'+
                        '<div class="card-body">'+
                        '<p class="card-text"><small class="text-muted">'+ val.Fecha +'</small></p>'+
                          '<h5 class="card-title">'+ val.Titulo +'</h5>'+
                          '<p class="card-text text-justify">'+ val.Cuerpo+'</p>'+
                          '<p class="card-text"><small class="text-muted">Categoria: '+ val.Descripcion+'</small></p>'+
                          '<p class="card-tex text-center"><a href="videos_view?idvideo='+val.IDVideo+'&title='+val.Titulo+'" class="btn btn-outline-info">Ver más</a></p>'+
                        '</div>'+
                        '</div>'+
                      '</div>');
         })
        },
        complete: function () 
        {     

        },
        error: function(data)
        {
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
function select_catblog()
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
function select_catvideo()
{
    $.getJSON("get_catvideo", function (data){
        concav = '';
        concav += '<a href="javascript:void(0)" class="catvideoblog" buscav="">Todos</a>';
        $.each(data, function(index, val){
          concav += '<a href="javascript:void(0)" class="catvideoblog" buscav="' + val.Descripcion + '">' + val.Descripcion + '</a>';
        })

        $('.catvideos').html(concav);
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

