<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class rrhh_model extends CI_Model {
/************************************************************************************************************************************************************************/
    public function insert_employee($data)
    {
        $v_name       = $data['txt_name'];
        $v_lastname   = $data['txt_lastname'];
        $v_dni    	  = $data['txt_dni'];
        $v_day        = $data['txt_day'];

        $query=$this->db->query("CALL sp_insert_employee('$v_name','$v_lastname','$v_dni','$v_day')");   
    }
/************************************************************************************************************************************************************************/
    public function get_employee()
    {
        $query=$this->db->query("CALL sp_get_employee()");
        if ($query->num_rows()>0)
        {
            return $query->result();
        }
        else
        {
            return false;
        } 
    }
/************************************************************************************************************************************************************************/
    public function get_asistencia($data)
    {
        $v_name  = $data['txt_cname'];
        $v_fechai  = $data['txt_fechai'];
        $v_fechaf  = $data['txt_fechaf'];

        $query=$this->db->query("CALL sp_get_attendancecontrol('$v_name', '$v_fechai', '$v_fechaf')");
        if ($query->num_rows()>0)
        {
            return $query->result();
        }
        else
        {
            return false;
        } 
    }
/************************************************************************************************************************************************************************/
    public function insert_asistencia($data)
    {
        $v_dni 	= $data['in_dni'];

        $query=$this->db->query("CALL sp_insert_attendancecontrol($v_dni)");
        if ($query->num_rows()>0)
        {
            return $query->row();
        }
        else
        {
            return false;
        }  
    }
/************************************************************************************************************************************************************************/
    public function get_datos_attendance()
    {
        $query=$this->db->query("CALL sp_get_datos_attendance()");
        if ($query->num_rows()>0)
        {
            return $query->result();
        }
        else
        {
            return false;
        } 
    }
/************************************************************************************************************************************************************************/
    public function insert_ajustar_attendance($data)
    {
        $ID_Employee    = $data['IDEmployee'];
        $v_fechaj       = $data['txt_fechaj'];
        $v_horaj        = $data['txt_horaj'];
        $ID_Motive      = $data['IDMotive'];
        $v_descripcion  = $data['txt_descripcion'];

        $query=$this->db->query("CALL sp_insert_ajustar_attendance('$ID_Employee','$v_fechaj','$v_horaj','$ID_Motive', '$v_descripcion')");   
    }
/************************************************************************************************************************************************************************/
    public function eliminar_asistencia($data)
    {
    $id_attendancecontrol    = $data['IDattendancecontrol'];       
    
    $query=$this->db->query("CALL sp_delete_attendancecontrol($id_attendancecontrol)");   
    }
/************************************************************************************************************************************************************************/
    public function vista_editar_asistencia($IDAttendancecontrol)
    {
        $query=$this->db->query("CALL sp_get_ver_attendancecontrol($IDAttendancecontrol);");
        if ($query->num_rows()>0)
        {
          return $query->result();
        }
        else
        {
          return false;
        } 
    }
/************************************************************************************************************************************************************************/
    public function update_asistencia($data)
    {
        $id_attendancecontrol   = $data['IDAttendancecontrol'];
        $id_motivo              = $data['IDMotivo'];
        $v_descripcion          = $data['txt_descripcion']; 
        $v_hourj                = $data['txt_hourj'];
        $v_file                 = $data['file_data'];   

        $query=$this->db->query("CALL sp_update_attendancecontrol('$id_attendancecontrol','$id_motivo','$v_descripcion','$v_hourj','$v_file')");   
    }
/************************************************************************************************************************************************************************/
    public function get_timecontrol($data)
    {
        $v_name  = $data['txt_tcname'];

        $query=$this->db->query("CALL sp_get_timecontrol('$v_name')");
        if ($query->num_rows()>0)
        {
            return $query->result();
        }
        else
        {
            return false;
        } 
    }
/************************************************************************************************************************************************************************/
    public function insert_timecontrol($data)
    {
        $ID_Employee   = $data['IDEmployee'];
        $v_ifecha      = $data['txt_ifecha'];
        $v_ffecha      = $data['txt_ffecha'];
        $v_me          = $data['txt_me'];
        $v_ms          = $data['txt_ms'];
        $v_te          = $data['txt_te'];
        $v_ts          = $data['txt_ts'];

        $query=$this->db->query("CALL sp_insert_timecontrol('$ID_Employee', '$v_ifecha', '$v_ffecha', '$v_me', '$v_ms', '$v_te', '$v_ts')");   
    }
}