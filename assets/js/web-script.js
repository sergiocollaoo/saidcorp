$(document).ready(init_menu);
/******************************************************************************************************************************************************************************/
function init_menu ()
{
    /*FUNCIONES ANTIGUAS BY SERGIO COLLAO */
/*    $('[data-target]').click(function() {
      const target = $(this).data('target');
      $('.info').removeClass('sight');
      $(target).addClass('sight');
    });

    $('ul.nav li').click(function(){
        $('li').removeClass("active");
        $(this).addClass("active");
    });

    $('.btnmostrar').on('click',function(e){
            $(this).siblings().toggle(300);
            $(this).text( $(this).text() == '... Leer menos' ? 'Leer más ...' : '... Leer menos' );
            e.preventDefault();
    });*/
    var showChar = 300;
    var content = $('#morecss').html();
    if(content.length > showChar) {
        var c = content.substr(0, showChar);
        var html = '<input id="morecss-element-toggle" type="checkbox" /><div id="morecss-abstract">' + c + '...' + '</div>' + '<div id="morecss-toggled-element">' + content + '</div>' + '<label for="morecss-element-toggle" id="morecss-trigger-toggle"><span class="morelink">Seguir leyendo ></span><span class="lesslink">Mostrar menos</span></label>';
        $('#morecss').html(html);
    }

    alert("asdasd")
}
/******************************************************************************************************************************************************************************/
