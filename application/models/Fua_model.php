<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class fua_model extends CI_Model {
/************************************************************************************************************************************************************************/
public function crear_fua($data)
{
    $v_nomrazonsocial   = $data['txt_namerz'];
    $v_dniruc           = $data['txt_dniruc'];
    $v_reprelegal       = $data['txt_reprelegal'];
    $v_dni              = $data['txt_dni'];
    $v_contacto         = $data['txt_contacto'];
    $v_domicilio        = $data['txt_domicilio'];
    $v_telefono         = $data['txt_telefono'];
    $v_correo           = $data['txt_correo'];

    $query=$this->db->query("CALL sp_insert_fua('$v_nomrazonsocial', '$v_dniruc', '$v_reprelegal', '$v_dni', '$v_contacto', '$v_domicilio','$v_telefono','$v_correo')");
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
public function update_fua($data)
{
    $ID_fua             = $data['IDfua'];
    $v_nomrazonsocial   = $data['txt_namerz'];
    $v_dniruc           = $data['txt_dniruc'];
    $v_reprelegal       = $data['txt_reprelegal'];
    $v_dni              = $data['txt_dni'];
    $v_contacto         = $data['txt_contacto'];
    $v_domicilio        = $data['txt_domicilio'];
    $v_telefono         = $data['txt_telefono'];
    $v_correo           = $data['txt_correo'];   

    $query=$this->db->query("CALL sp_update_fua('$ID_fua', '$v_nomrazonsocial', '$v_dniruc', '$v_reprelegal', '$v_dni', '$v_contacto', '$v_domicilio','$v_telefono','$v_correo')");   
}
/************************************************************************************************************************************************************************/
public function update_fuacbcr($data)
{
    $ID_fua             = $data['IDfua'];
    $v_monto            = $data['txt_monto'];
    $v_bono             = $data['txt_bono'];
    $v_observaciones    = $data['txt_observaciones'];  

    $query=$this->db->query("CALL sp_update_fuacbcr('$ID_fua', '$v_monto', '$v_bono', '$v_observaciones')");   
}
/************************************************************************************************************************************************************************/
public function insert_fuads($data)
{
    $idfua              = $data['IDfua'];
    $v_accion           = $data['txt_accion'];
    $v_descripcion      = $data['txt_descripcion'];

    $query=$this->db->query("CALL sp_insert_fuadetalles('$idfua','$v_accion','$v_descripcion')");
}
/************************************************************************************************************************************************************************/
public function get_fuadetalles($data)
    {
        $idfua  = $data['IDfua'];

        $query=$this->db->query("CALL sp_get_fuadetalles($idfua)");
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
public function update_fuadetalles($data)
{
    $ID_fuadetalle      = $data['IDfuadetalle'];
    $v_accion           = $data['txt_accion'];
    $v_descripcion      = $data['txt_descripcion']; 

    $query=$this->db->query("CALL sp_update_fuadetalles('$ID_fuadetalle', '$v_accion', '$v_descripcion')");   
}
/************************************************************************************************************************************************************************/
public function eliminar_fuadetalles($data)
    {
    $id_fuadetalle    = $data['IDfuadetalle'];       
    
    $query=$this->db->query("CALL sp_delete_fuadetalles($id_fuadetalle)");   
    }
/************************************************************************************************************************************************************************/
public function insert_fuar($data)
    {
        $idfua              = $data['IDfua'];
        $v_fechao           = $data['txt_fechar'];
        $v_monto            = $data['txt_montor'];
        $v_consideraciones  = $data['txt_consideraciones'];

        $query=$this->db->query("CALL sp_insert_fuaretribucion('$idfua','$v_fechao','$v_monto','$v_consideraciones')");
    }
/************************************************************************************************************************************************************************/
public function get_fuar($data)
    {
        $idfua  = $data['IDfua'];

        $query=$this->db->query("CALL sp_get_fuaretribucion($idfua)");
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
public function eliminar_fuar($data)
    {
    $id_fuaretribucion    = $data['IDFuaretribucion'];       
    
    $query=$this->db->query("CALL sp_delete_fuaretribucion($id_fuaretribucion)");   
    }
/************************************************************************************************************************************************************************/ 
}