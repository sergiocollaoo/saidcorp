<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Video_controller extends CI_Controller {

public function __construct(){
        parent::__construct();
        $this->load->model('video_model');
    }
/************************************************************************************************************************************************************************/
// public function blog()
//     {
//         $this->load->view('webmaster/sis-header.html');
//         $this->load->view('webmaster/sis-menu.html');
//         $this->load->view('sis/blog.html');
//         $this->load->view('webmaster/sis-footer.html');
//     }
/************************************************************************************************************************************************************************/
// public function get_catblog()
//     {
//         $get_catblog=$this->blog_model->get_catblog();
//         echo json_encode($get_catblog);
//     }
/************************************************************************************************************************************************************************/
/*public function list_blog()
    {    
        $list_blog=$this->blog_model->list_blog();
        echo json_encode($list_blog);
    }*/
/***********************************************************************************************************************************************************************/
// public function insert_blog()
//     {
//         $json = file_get_contents('php://input');
//         $data = json_decode($json,TRUE);
//         $insert_blog=$this->blog_model->insert_blog($data);
//         echo json_encode($insert_blog);
//     }
/************************************************************************************************************************************************************************/
// public function subir_imagen()
//     {
//        if(isset($_FILES['imagen']['tmp_name']))
//         {   
//             $archivo=$_FILES['imagen']['tmp_name'];        
//             $nomarchivo=$_FILES['imagen']['name'];
//             $ext=pathinfo($nomarchivo);
//             $exte = strtolower($ext['extension']); 

//             $hoy = date("Ymd_His");  
//             $caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"; 
//             $numerodeletras=10;
//             $cadena = "";

//             for($i=0;$i<$numerodeletras;$i++)
//             {
//                 $cadena .= substr($caracteres,rand(0,strlen($caracteres)),1); 
//             }
//             $nvonomarch=$hoy."_".$cadena.".".$exte;
//             echo $destino="assets/images/blog/".$nvonomarch;
//             copy($archivo,$destino);
//         } 
//     }
/************************************************************************************************************************************************************************/
public function view_video()
    {   
        $view_video=$this->video_model->view_video();
        echo json_encode($view_video);
    }
/***********************************************************************************************************************************************************************/
public function view_video2()
    {   
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $view_video2=$this->video_model->view_video2($data['idvideo']);
        echo json_encode($view_video2);
    }
/***********************************************************************************************************************************************************************/
}