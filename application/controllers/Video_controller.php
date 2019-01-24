<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Video_controller extends CI_Controller {

public function __construct(){
        parent::__construct();
        $this->load->model('video_model');
    }
/************************************************************************************************************************************************************************/
public function video_blog()
    {
        $this->load->view('webmaster/sis-header.html');
        $this->load->view('webmaster/sis-menu.html');
        $this->load->view('sis/video_blog.html');
        $this->load->view('webmaster/sis-footer.html');
    }
/************************************************************************************************************************************************************************/
public function get_catvideo()
    {
        $get_catvideo=$this->video_model->get_catvideo();
        echo json_encode($get_catvideo);
    }
/************************************************************************************************************************************************************************/
    public function get_catvideoblog()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $get_catvideoblog=$this->video_model->get_catvideoblog($data);
        echo json_encode($get_catvideoblog);
    }
/************************************************************************************************************************************************************************/
public function list_videoblog()
    {    
        $list_videoblog=$this->video_model->list_videoblog();
        echo json_encode($list_videoblog);
    }
/***********************************************************************************************************************************************************************/
public function insert_videoblog()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $insert_videoblog=$this->video_model->insert_videoblog($data);
        echo json_encode($insert_videoblog);
    }
/************************************************************************************************************************************************************************/
public function delete_videoblog()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $delete_videoblog=$this->video_model->delete_videoblog($data);
        echo json_encode($delete_videoblog);
    }
/************************************************************************************************************************************************************************/
public function subir_videoimagen()
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
            echo $destino="assets/images/videos/".$nvonomarch;
            copy($archivo,$destino);
        } 
    }
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