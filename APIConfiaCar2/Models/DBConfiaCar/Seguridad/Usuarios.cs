using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.Seguridad
{
    [TableName("Seguridad.Usuarios")]
    [ExplicitColumns]
    [PrimaryKey("UsuarioID")]
    public class Usuarios
    {
              
        
        [Column("UsuarioID")]
        public int UsuarioID { get; set; }
      
        
        [Column("Nombre")]
        public string Nombre { get; set; }
      
        
        [Column("PersonaID")]
        public int? PersonaID { get; set; }
      
        
        [Column("RolID")]
        public int? RolID { get; set; }
      
        
        [Column("Contraseña")]
        public string Contraseña { get; set; }
      
        
        [Column("NuevaContra")]
        public bool? NuevaContra { get; set; }
      
        
        [Column("ContraseñaCifrada")]
        public byte[] ContraseñaCifrada { get; set; }
      
        
        [Column("MasterUser")]
        public bool? MasterUser { get; set; }
      
        
        [Column("FotoPerfil")]
        public string FotoPerfil { get; set; }
      
        
        [Column("Bloqueado")]
        public bool? Bloqueado { get; set; }
      
        
        [Column("FechaCreacion")]
        public DateTime? FechaCreacion { get; set; }
      
        
        [Column("UsuarioCreacionID")]
        public int? UsuarioCreacionID { get; set; }
      
        
        [Column("FechaModificacion")]
        public DateTime? FechaModificacion { get; set; }
      
        
        [Column("ApellidoPaterno")]
        public string ApellidoPaterno { get; set; }
      
        
        [Column("ApellidoMaterno")]
        public string ApellidoMaterno { get; set; }
      
        
        [Column("Telefono")]
        public string Telefono { get; set; }
      
        
        [Column("CorreoElectronico")]
        public string CorreoElectronico { get; set; }
      
        
        [Column("AccesoAppConfiaCar")]
        public bool? AccesoAppConfiaCar { get; set; }


        // ###############################################
        // Parent foreing keys
        // >>
        // ###############################################
        
        // ###############################################
        // <<
        // Parent foreing keys
        // ###############################################

        // ###############################################
        // Child foreing keys
        // >>
        // ###############################################
        
        // ###############################################
        // <<
        // Child foreing keys
        // ###############################################
        
    }
}
