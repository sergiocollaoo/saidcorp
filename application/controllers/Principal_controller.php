<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Principal_controller extends CI_Controller {

    public function __construct(){
        parent::__construct();
        /*$this->load->model('Principal_model');*/
    }
/************************************************************************************************************************************************************************/
    public function principal()
    {
        $this->load->view('webmaster/sis-header.html');
        $this->load->view('webmaster/sis-menu.html');
        $this->load->view('sis/principal.html');
        $this->load->view('webmaster/sis-footer.html');
    }
/************************************************************************************************************************************************************************/
}