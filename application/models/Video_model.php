<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class video_model extends CI_Model {
/************************************************************************************************************************************************************************/
// public function get_catblog()
//     {
//         $query=$this->db->query("CALL sp_get_catvideo()");
//         if ($query->num_rows()>0)
//         {
//             return $query->result();
//         }
//         else
//         {
//             return false;
//         } 
//     }
/************************************************************************************************************************************************************************/
// public function list_blog()
//   {
//     $query=$this->db->query("CALL sp_get_blog();");
//     if ($query->num_rows()>0)
//     {
//       return $query->result();
//     }
//     else
//     {
//       return false;
//     } 
//   }
/************************************************************************************************************************************************************************/
/*public function insert_blog($data)
    {
        $id_categoria       = $data['id_categoria'];
        $v_titulo           = $data['txt_titulo'];
        $v_cuerpo    	    = $data['txt_cuerpo'];
        $v_imagen           = $data['txt_upimagen'];

        $query=$this->db->query("CALL sp_insert_blog($id_categoria ,'$v_titulo','$v_cuerpo','$v_imagen')");   
    }*/
/************************************************************************************************************************************************************************/
public function view_video()
    {
        $this->db->query('SET lc_time_names = es_ES');
        $this->db->select('b.IDVideo,  DATE_FORMAT(b.Fecha, "%d de %M del %Y") AS Fecha, c.IDCategoria, c.Descripcion, b.Titulo, b.Cuerpo, b.Imagen');
        $this->db->from('dba_video b');
        $this->db->join('dba_categoria c','c.IDCategoria = b.IDCategoria');
        $this->db->order_by('b.IDVideo', 'DESC');

        $consulta = $this->db->get();
        return $consulta->result();
    }
/************************************************************************************************************************************************************************/
public function view_video2($idvideo)
    {
        $this->db->query('SET lc_time_names = es_ES');
        $this->db->select('b.IDVideo,  DATE_FORMAT(b.Fecha, "%d de %M del %Y") AS Fecha, c.IDCategoria, c.Descripcion, b.Titulo, b.Cuerpo, b.Imagen, b.Link');
        $this->db->from('dba_video b');
        $this->db->join('dba_categoria c','c.IDCategoria = b.IDCategoria');
        $this->db->where('b.IDVideo',$idvideo);
        $consulta = $this->db->get();
        return $consulta->result();
    }
/************************************************************************************************************************************************************************/
}