using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.Catalogo
{
    [TableName("Catalogo.Talleres")]
    [ExplicitColumns]
    [PrimaryKey("TallerID")]
    public class Talleres
    {
              
        
        [Column("TallerID")]
        public int TallerID { get; set; }
      
        
        [Column("NombreTaller")]
        public string NombreTaller { get; set; }
      
        
        [Column("Direccion")]
        public string Direccion { get; set; }
      
        
        [Column("Telefono")]
        public string Telefono { get; set; }
      
        
        [Column("Contacto")]
        public string Contacto { get; set; }
      
        
        [Column("HorarioApertura")]
        public DateTime? HorarioApertura { get; set; }
      
        
        [Column("HorarioCierre")]
        public DateTime? HorarioCierre { get; set; }
      
        
        [Column("FechaCreacion")]
        public DateTime? FechaCreacion { get; set; }
      
        
        [Column("UsuarioCreacionID")]
        public int? UsuarioCreacionID { get; set; }
      
        
        [Column("Observaciones")]
        public string Observaciones { get; set; }
      
        
        [Column("FechaModificacion")]
        public DateTime? FechaModificacion { get; set; }
      
        
        [Column("Sector")]
        public string Sector { get; set; }


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
