<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Rrhh_controller extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model('rrhh_model');
    }
/************************************************************************************************************************************************************************/
    public function asistencia()
    {
        $this->load->view('webmaster/sis-header.html');
        $this->load->view('webmaster/sis-menu.html');
        $this->load->view('sis/asistencia.html');
        $this->load->view('webmaster/sis-footer.html');
    }
/************************************************************************************************************************************************************************/
    public function control_asistencia()
    {
        $this->load->view('webmaster/sis-header.html');
        $this->load->view('webmaster/sis-menu.html');
        $this->load->view('sis/control-asistencia.html');
        $this->load->view('webmaster/sis-footer.html');
    }
/************************************************************************************************************************************************************************/
    public function control_horario()
    {
        $this->load->view('webmaster/sis-header.html');
        $this->load->view('webmaster/sis-menu.html');
        $this->load->view('sis/control-horario.html');
        $this->load->view('webmaster/sis-footer.html');
    }
/************************************************************************************************************************************************************************/
    public function insert_asistencia()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $insert_asistencia=$this->rrhh_model->insert_asistencia($data);
        echo json_encode($insert_asistencia);
    }
/************************************************************************************************************************************************************************/
    public function get_asistencia()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $get_asistencia=$this->rrhh_model->get_asistencia($data);
        echo json_encode($get_asistencia);
    }

/************************************************************************************************************************************************************************/
    public function get_datos_attendance()
    {
        $get_datos_attendance=$this->rrhh_model->get_datos_attendance();
        echo json_encode($get_datos_attendance);
    }
/************************************************************************************************************************************************************************/
    public function insert_ajustar_attendance()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $insert_ajustar_attendance=$this->rrhh_model->insert_ajustar_attendance($data);
        echo json_encode($insert_ajustar_attendance);
    }
/************************************************************************************************************************************************************************/
    public function eliminar_asistencia()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $eliminar_asistencia=$this->rrhh_model->eliminar_asistencia($data);
        echo json_encode($eliminar_asistencia);
    }
/************************************************************************************************************************************************************************/
    public function vista_editar_asistencia()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $vista_editar_asistencia=$this->rrhh_model->vista_editar_asistencia($data['IDAttendancecontrol']);
        echo json_encode($vista_editar_asistencia);
    }
/************************************************************************************************************************************************************************/
    public function update_asistencia()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $update_asistencia=$this->rrhh_model->update_asistencia($data);
        echo json_encode($update_asistencia);
    }
/************************************************************************************************************************************************************************/
    public function get_timecontrol()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $get_timecontrol=$this->rrhh_model->get_timecontrol($data);
        echo json_encode($get_timecontrol);
    }
/************************************************************************************************************************************************************************/
    public function insert_timecontrol()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $insert_timecontrol=$this->rrhh_model->insert_timecontrol($data);
        echo json_encode($insert_timecontrol);
    }
/************************************************************************************************************************************************************************/
    public function personal()
    {
        $this->load->view('webmaster/sis-header.html');
        $this->load->view('webmaster/sis-menu.html');
        $this->load->view('sis/personal.html');
        $this->load->view('webmaster/sis-footer.html');
    }
/************************************************************************************************************************************************************************/
    public function insert_employee()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json,TRUE);
        $insert_employee=$this->rrhh_model->insert_employee($data);
        echo json_encode($insert_employee);
    }
/************************************************************************************************************************************************************************/
    public function get_employee()
    {
        $get_employee=$this->rrhh_model->get_employee();
        echo json_encode($get_employee);
    }
/***********************************************************************************************************************************************************************/
}