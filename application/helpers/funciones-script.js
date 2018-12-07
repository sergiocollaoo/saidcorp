$(document).ready(init_funciones);
/** ********************************************************************************************************************************************** **/
function init_funciones()
{
  $('.modal').modal({
    show: false,
    backdrop: 'static',
    keyboard: false
  });
}
/************************************************************************************************************************************************* **/
function stringToDate(_date,_format,_delimiter)
{
    var formatLowerCase=_format.toLowerCase();
    var formatItems=formatLowerCase.split(_delimiter);
    var dateItems=_date.split(_delimiter);
    var monthIndex=formatItems.indexOf("mm");
    var dayIndex=formatItems.indexOf("dd");
    var yearIndex=formatItems.indexOf("yyyy");
    var month=parseInt(dateItems[monthIndex]);
    month-=1;
    var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
    return formatedDate;
}
/************************************************************************************************************************************************* **/
function fnc_limpiar_campos () 
{
    $('input[type="text"],input[type="password"],input[type="email"],input[type="file"],textarea').val('');
    $('input[type="checkbox"]').removeAttr('checked');
}
/************************************************************************************************************************************************* **/
function fnc_select2 (_select,_placeholder)
{
    _select.html('<option></option>');
    _select.select2({
        placeholder: _placeholder,
        allowClear: true
    });

}
/************************************************************************************************************************************************* **/
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}