<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Web_controller extends CI_Controller {

    public function __construct(){
           parent::__construct();
           $this->load->model('web_model');
    }
/************************************************************************************************************************************************************************/
    public function index()
    {
        $this->load->helper('url');
        $this->load->view('webmaster/header-web.html');
        $this->load->view('web/index.html');
        $this->load->view('webmaster/footer-web.html');

        //$this->load->view('web/mantenimientoweb.html');
    }
/************************************************************************************************************************************************************************/
    public function nosotros()
    {
        $this->load->helper('url');
        $this->load->view('webmaster/header-web.html');
        $this->load->view('web/nosotros.html');
        $this->load->view('webmaster/footer-web.html');
    }
/************************************************************************************************************************************************************************/
    public function equipo()
    {
        $this->load->helper('url');
        $this->load->view('webmaster/header-web.html');
        $this->load->view('web/equipo.html');
        $this->load->view('webmaster/footer-web.html');
    }
/************************************************************************************************************************************************************************/
    public function servicios()
    {
        $this->load->helper('url');
        $this->load->view('webmaster/header-web.html');
        $this->load->view('web/servicios.html');
        $this->load->view('webmaster/footer-web.html');
    }
/************************************************************************************************************************************************************************/
    public function legal()
    {
        $this->load->helper('url');
        $this->load->view('webmaster/header-web.html');
        $this->load->view('web/legal.html');
        $this->load->view('webmaster/footer-web.html');
    }
/************************************************************************************************************************************************************************/
    public function tributaria()
    {
        $this->load->helper('url');
        $this->load->view('webmaster/header-web.html');
        $this->load->view('web/tributaria.html');
        $this->load->view('webmaster/footer-web.html');
    }
/************************************************************************************************************************************************************************/
    public function contable()
    {
        $this->load->helper('url');
        $this->load->view('webmaster/header-web.html');
        $this->load->view('web/contable.html');
        $this->load->view('webmaster/footer-web.html');
    }
/************************************************************************************************************************************************************************/
    public function organizacional()
    {
        $this->load->helper('url');
        $this->load->view('webmaster/header-web.html');
        $this->load->view('web/organizacional.html');
        $this->load->view('webmaster/footer-web.html');
    }
/************************************************************************************************************************************************************************/
    public function comunicaciones()
    {
        $this->load->helper('url');
        $this->load->view('webmaster/header-web.html');
        $this->load->view('web/comunicaciones.html');
        $this->load->view('webmaster/footer-web.html');
    }
/************************************************************************************************************************************************************************/
    public function capacitaciones()
    {
        $this->load->helper('url');
        $this->load->view('webmaster/header-web.html');
        $this->load->view('web/capacitaciones.html');
        $this->load->view('webmaster/footer-web.html');
    }
/************************************************************************************************************************************************************************/
    public function clientes()
    {
        $this->load->helper('url');
        $this->load->view('webmaster/header-web.html');
        $this->load->view('web/clientes.html');
        $this->load->view('webmaster/footer-web.html');
    }
/************************************************************************************************************************************************************************/
    public function normativas()
    {
        $this->load->helper('url');
        $this->load->view('webmaster/header-web.html');
        $this->load->view('web/normativas.html');
        $this->load->view('webmaster/footer-web.html');
    }
/************************************************************************************************************************************************************************/
    public function normativas_view()
    {
        $this->load->helper('url');
        $this->load->view('webmaster/header-web.html');
        $this->load->view('web/normativas_view.html');
        $this->load->view('webmaster/footer-web.html');
    }
/************************************************************************************************************************************************************************/
    public function videos()
    {
        $this->load->helper('url');
        $this->load->view('webmaster/header-web.html');
        $this->load->view('web/videos.html');
        $this->load->view('webmaster/footer-web.html');
    }
/************************************************************************************************************************************************************************/
    public function videos_view()
    {
        $this->load->helper('url');
        $this->load->view('webmaster/header-web.html');
        $this->load->view('web/videos_view.html');
        $this->load->view('webmaster/footer-web.html');
    }
/************************************************************************************************************************************************************************/
    public function herr_empresa()
    {
        $this->load->helper('url');
        $this->load->view('webmaster/header-web.html');
        $this->load->view('web/herr_empresa.html');
        $this->load->view('webmaster/footer-web.html');
    }
/************************************************************************************************************************************************************************/
     public function viewcontacto()
    {
        $this->load->view('webmaster/header-web.html');
        $this->load->view('web/contacto.html');
        $this->load->view('webmaster/footer-web.html');
    }
/************************************************************************************************************************************************************************/
/*    public function indexb()
    {
        $this->load->view('web/indexb.html');
    }
*/
    public function contacto_c()
    {
        // Guardar los datos recibidos en variables:
        $nombre = $_POST['nombre'];
        $email = $_POST['email'];
        $telefono = $_POST['telefono'];
        $destino = $_POST['destino'];
        $asuntom = $_POST['asunto'];
        $mensaje = $_POST['mensaje'];
        // Definir el correo de destino:
        if ($destino == 'laboral') {
            $dest = "baguilar@saidcorp.pe".", ";
            $dest .= "strujillo@saidcorp.pe".", ";
            $dest .= "informes@saidcorp.pe";

        }elseif ($destino == 'tributaria') {
            $dest = "arodriguez@saidcorp.pe".", ";
            $dest .= "strujillo@saidcorp.pe".", ";
            $dest .= "informes@saidcorp.pe";

        }elseif ($destino == 'contable') {

           $dest = "arodriguez@saidcorp.pe".", ";
           $dest .= "strujillo@saidcorp.pe".", ";
           $dest .= "informes@saidcorp.pe";

        }elseif ($destino == 'legal') {

           $dest = "baguilar@saidcorp.pe".", ";
           $dest .= "strujillo@saidcorp.pe".", ";
           $dest .= "informes@saidcorp.pe";

        }elseif ($destino == 'organizacional') {

            $dest = "amiranda@saidcorp.pe".", ";
            $dest .= "strujillo@saidcorp.pe".", ";
            $dest .= "informes@saidcorp.pe";

        }else{

            $dest = "amiranda@saidcorp.pe".", ";
            $dest .= "strujillo@saidcorp.pe".", ";
            $dest .= "informes@saidcorp.pe";

        }
         
        // Estas son cabeceras que se usan para evitar que el correo llegue a SPAM:
        $headers = "From: $nombre <$email>\r\n";  
        $headers .= "X-Mailer: PHP5\n";
        $headers .= 'MIME-Version: 1.0' . "\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
         
        // Aqui definimos el asunto y armamos el cuerpo del mensaje
        $asunto = "CONSULTA SAIDCORP-WEB: ".$asuntom;
        $cuerpo = $nombre."<br>";
        $cuerpo .= "Email: ".$email."<br>";
        $cuerpo .= "Telefono: ".$telefono."<br>";
        $cuerpo .= "Mensaje: ".$mensaje;
         
        // Esta es una pequena validación, que solo envie el correo si todas las variables tiene algo de contenido:
        if($nombre != '' && $email != '' && $telefono != '' && $mensaje != ''){
            mail($dest,$asunto,$cuerpo,$headers); //ENVIAR!
        }
    }
/************************************************************************************************************************************************************************/
    public function contacto()
    {
        // Guardar los datos recibidos en variables:
        $nombre = $_POST['nombre'];
        $email = $_POST['email'];
        $telefono = $_POST['telefono'];
        $asuntom = $_POST['asunto'];
        $mensaje = $_POST['mensaje'];
        // Definir el correo de destino:
        $dest = "informes@saidcorp.pe";
         
        // Estas son cabeceras que se usan para evitar que el correo llegue a SPAM:
        $headers = "From: $nombre <$email>\r\n";  
        $headers .= "X-Mailer: PHP5\n";
        $headers .= 'MIME-Version: 1.0' . "\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
         
        // Aqui definimos el asunto y armamos el cuerpo del mensaje
        $asunto = "SAIDCORP - WEB: ".$asuntom;
        $cuerpo = $nombre."<br>";
        $cuerpo .= "Email: ".$email."<br>";
        $cuerpo .= "Telefono: ".$telefono."<br>";
        $cuerpo .= "Mensaje: ".$mensaje;
         
        // Esta es una pequena validación, que solo envie el correo si todas las variables tiene algo de contenido:
        if($nombre != '' && $email != '' && $telefono != '' && $mensaje != ''){
            mail($dest,$asunto,$cuerpo,$headers); //ENVIAR!
        }
    }
/************************************************************************************************************************************************************************/
    public function view_ciiu()
    {   
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $view_ciiu=$this->web_model->view_ciiu($data);
        echo json_encode($view_ciiu);
    }
/************************************************************************************************************************************************************************/
}