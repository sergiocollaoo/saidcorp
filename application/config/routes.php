<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'web_controller';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
/************************************************************************************************************************************************************************/
$route['inicio'] 						= 'web_controller/index';
$route['nosotros'] 						= 'web_controller/nosotros';
$route['equipo'] 						= 'web_controller/equipo';
$route['servicios'] 					= 'web_controller/servicios';
$route['clientes'] 						= 'web_controller/clientes';
$route['novedades'] 					= 'web_controller/novedades';
$route['novedades_view'] 				= 'web_controller/novedades_view';
$route['vcontacto'] 					= 'web_controller/viewcontacto';
$route['herramienta-empresarial'] 		= 'web_controller/herr_empresa';
$route['contacto']		 				= 'web_controller/contacto';
$route['contactoc']		 				= 'web_controller/contacto_c';
/************************************************************************************************************************************************************************/
$route['blog'] 							= 'blog_controller/blog';
$route['get_catblog'] 					= 'blog_controller/get_catblog';
$route['list_blog'] 					= 'blog_controller/list_blog';
$route['insert_blog'] 					= 'blog_controller/insert_blog';
$route['subir_imagen'] 					= 'blog_controller/subir_imagen';
$route['view_blog'] 					= 'blog_controller/view_blog';
$route['view_blog2'] 					= 'blog_controller/view_blog2';
/************************************************************************************************************************************************************************/
$route['view_ciiu'] 					= 'web_controller/view_ciiu';
/************************************************************************************************************************************************************************/
$route['principal']						='principal_controller/principal';

$route['asistencia']		 			= 'rrhh_controller/asistencia';
$route['insert_asistencia'] 			= 'rrhh_controller/insert_asistencia';
$route['control_asistencia'] 			= 'rrhh_controller/control_asistencia';
$route['get_asistencia'] 				= 'rrhh_controller/get_asistencia';
$route['eliminar_asistencia'] 			= 'rrhh_controller/eliminar_asistencia';
$route['get_datos_attendance'] 			= 'rrhh_controller/get_datos_attendance';
$route['insert_ajustar_attendance']		= 'rrhh_controller/insert_ajustar_attendance';
$route['update_asistencia']				= 'rrhh_controller/update_asistencia';
$route['vista_editar_asistencia']		= 'rrhh_controller/vista_editar_asistencia';

$route['control_horario']				= 'rrhh_controller/control_horario';
$route['get_timecontrol']				= 'rrhh_controller/get_timecontrol';
$route['insert_timecontrol']			= 'rrhh_controller/insert_timecontrol';

$route['personal'] 						= 'rrhh_controller/personal';
$route['insert_employee'] 				= 'rrhh_controller/insert_employee';
$route['get_employee'] 					= 'rrhh_controller/get_employee';
/************************************************************************************************************************************************************************/
$route['fua'] 							= 'fua_controller/fua';
$route['crear_fua'] 					= 'fua_controller/crear_fua';
$route['update_fua'] 					= 'fua_controller/update_fua';
$route['update_fuacbcr'] 				= 'fua_controller/update_fuacbcr';
$route['insert_fuads'] 					= 'fua_controller/insert_fuads';
$route['get_fuadetalles'] 				= 'fua_controller/get_fuadetalles';
$route['update_fuadetalles'] 			= 'fua_controller/update_fuadetalles';
$route['eliminar_fuadetalles'] 			= 'fua_controller/eliminar_fuadetalles';
$route['insert_fuar'] 					= 'fua_controller/insert_fuar';
$route['get_fuar'] 						= 'fua_controller/get_fuar';
$route['eliminar_fuar'] 				= 'fua_controller/eliminar_fuar';
