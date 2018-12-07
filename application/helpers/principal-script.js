$(document).ready(init_principal);
/** ********************************************************************************************************************************************** **/
function init_principal(){
  
	$('#fua').on( "click", function() {
    $('#1').show();
    $('#return').show();
    $('#principal').hide();
    $('#secundario').show();
  });
}
/** ********************************************************************************************************************************************** **/
$('#fua').on( "click", function() {
  $('#1').show();
  $('#return').show();
  $('#principal').hide();
  $('#secundario').show();
});

$('#return').on( "click", function() {
  $('#principal').show();
  $('#secundario').hide();
});