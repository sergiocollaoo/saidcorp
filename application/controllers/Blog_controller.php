<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Blog_controller extends CI_Controller {

public function __construct(){
        parent::__construct();
        $this->load->model('blog_model');
    }
/************************************************************************************************************************************************************************/
public function blog()
    {
        $this->load->view('webmaster/sis-header.html');
        $this->load->view('webmaster/sis-menu.html');
        $this->load->view('sis/blog.html');
        $this->load->view('webmaster/sis-footer.html');
    }
/************************************************************************************************************************************************************************/
public function get_catblog()
    {
        $get_catblog=$this->blog_model->get_catblog();
        echo json_encode($get_catblog);
    }
/************************************************************************************************************************************************************************/
public function list_blog()
    {    
        $list_blog=$this->blog_model->list_blog();
        echo json_encode($list_blog);
    }
/***********************************************************************************************************************************************************************/
public function insert_blog()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $insert_blog=$this->blog_model->insert_blog($data);
        echo json_encode($insert_blog);
    }
/************************************************************************************************************************************************************************/
public function subir_imagen()
    {
       if(isset($_FILES['imagen']['tmp_name']))
        {   
            $archivo=$_FILES['imagen']['tmp_name'];        
            $nomarchivo=$_FILES['imagen']['name'];
            $ext=pathinfo($nomarchivo);
            $exte = strtolower($ext['extension']); 

            $hoy = date("Ymd_His");  
            $caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"; 
            $numerodeletras=10;
            $cadena = "";

            for($i=0;$i<$numerodeletras;$i++)
            {
                $cadena .= substr($caracteres,rand(0,strlen($caracteres)),1); 
            }
            $nvonomarch=$hoy."_".$cadena.".".$exte;
            echo $destino="assets/images/blog/".$nvonomarch;
            copy($archivo,$destino);
        } 
    }
/************************************************************************************************************************************************************************/
public function view_blog()
    {   
        //valor a Buscar
        $buscar = $this->input->post("buscar");
        $numeropagina = $this->input->post("nropagina");
        $cantidad = 3/*$this->input->post("cantidad")*/;
        
        $inicio = ($numeropagina -1)*$cantidad;
        $data = array(
            "ver_blog" => $this->blog_model->view_blog($buscar,$inicio,$cantidad),
            "totalregistros" => count($this->blog_model->view_blog($buscar)),
            "cantidad" =>$cantidad
            
        );
        echo json_encode($data);
    }
/***********************************************************************************************************************************************************************/
public function view_blog2()
    {   
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $view_blog2=$this->blog_model->view_blog2($data['idblog']);
        echo json_encode($view_blog2);
    }
/***********************************************************************************************************************************************************************/
}