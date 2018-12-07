<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Fua_controller extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model('fua_model');
    }
/************************************************************************************************************************************************************************/
    public function fua()
    {
        $this->load->view('webmaster/sis-header.html');
        $this->load->view('webmaster/sis-menu.html');
        $this->load->view('sis/fua.html');
        $this->load->view('webmaster/sis-footer.html');
    }
/************************************************************************************************************************************************************************/
    public function crear_fua()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $crear_fua=$this->fua_model->crear_fua($data);
        echo json_encode($crear_fua);
    }
/************************************************************************************************************************************************************************/
    public function update_fua()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $update_fua=$this->fua_model->update_fua($data);
        echo json_encode($update_fua);
    }
/************************************************************************************************************************************************************************/
    public function update_fuacbcr()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $update_fuacbcr=$this->fua_model->update_fuacbcr($data);
        echo json_encode($update_fuacbcr);
    }
/************************************************************************************************************************************************************************/
    public function insert_fuads()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $insert_fuads=$this->fua_model->insert_fuads($data);
        echo json_encode($insert_fuads);
    }
/************************************************************************************************************************************************************************/
    public function get_fuadetalles()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $get_fuadetalles=$this->fua_model->get_fuadetalles($data);
        echo json_encode($get_fuadetalles);
    }
/************************************************************************************************************************************************************************/
    public function update_fuadetalles()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $update_fuadetalles=$this->fua_model->update_fuadetalles($data);
        echo json_encode($update_fuadetalles);
    }
/************************************************************************************************************************************************************************/
    public function eliminar_fuadetalles()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $eliminar_fuadetalles=$this->fua_model->eliminar_fuadetalles($data);
        echo json_encode($eliminar_fuadetalles);
    }
/************************************************************************************************************************************************************************/
    public function insert_fuar()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $insert_fuar=$this->fua_model->insert_fuar($data);
        echo json_encode($insert_fuar);
    }
/************************************************************************************************************************************************************************/
    public function get_fuar()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $get_fuar=$this->fua_model->get_fuar($data);
        echo json_encode($get_fuar);
    }
/************************************************************************************************************************************************************************/
    public function eliminar_fuar()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $eliminar_fuar=$this->fua_model->eliminar_fuar($data);
        echo json_encode($eliminar_fuar);
    }
/************************************************************************************************************************************************************************/
}