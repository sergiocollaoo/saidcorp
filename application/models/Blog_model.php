<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class blog_model extends CI_Model {
/************************************************************************************************************************************************************************/
public function get_catblog()
    {
        $query=$this->db->query("CALL sp_get_categoria()");
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
public function list_blog()
  {
    $query=$this->db->query("CALL sp_get_blog();");
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
public function insert_blog($data)
    {
        $id_categoria       = $data['id_categoria'];
        $v_titulo           = $data['txt_titulo'];
        $v_cuerpo    	    = $data['txt_cuerpo'];
        $v_imagen           = $data['txt_upimagen'];

        $query=$this->db->query("CALL sp_insert_blog($id_categoria ,'$v_titulo','$v_cuerpo','$v_imagen')");   
    }
/************************************************************************************************************************************************************************/
public function view_blog($buscar,$inicio = FALSE, $cantidadregistro = FALSE)
    {
        $this->db->query('SET lc_time_names = es_ES');
        $this->db->select('b.IDBlog,  DATE_FORMAT(b.Fecha, "%d de %M del %Y") AS Fecha, c.IDCategoria, c.Descripcion, b.Titulo, b.Cuerpo, b.Imagen');
        $this->db->from('dba_blog b');
        $this->db->join('dba_categoria c','c.IDCategoria = b.IDCategoria');
        $this->db->order_by('b.IDBlog', 'DESC');
        $this->db->like("Titulo",$buscar);
        $this->db->or_like("Descripcion",$buscar);
        if ($inicio !== FALSE && $cantidadregistro !== FALSE) {
            $this->db->limit($cantidadregistro,$inicio);
        }
        $consulta = $this->db->get();
        return $consulta->result();
    }
/************************************************************************************************************************************************************************/
public function view_blog2($idblog)
    {
        $this->db->query('SET lc_time_names = es_ES');
        $this->db->select('b.IDBlog,  DATE_FORMAT(b.Fecha, "%d de %M del %Y") AS Fecha, c.IDCategoria, c.Descripcion, b.Titulo, b.Cuerpo, b.Imagen');
        $this->db->from('dba_blog b');
        $this->db->join('dba_categoria c','c.IDCategoria = b.IDCategoria');
        $this->db->where('b.IDBlog',$idblog);
        $consulta = $this->db->get();
        return $consulta->result();
    }
/************************************************************************************************************************************************************************/
}