using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.Catalogo
{
    [TableName("Catalogo.Mantenimiento")]
    [ExplicitColumns]
    [PrimaryKey("MantenimientoID")]
    public class Mantenimiento
    {
              
        
        [Column("MantenimientoID")]
        public int MantenimientoID { get; set; }
      
        
        [Column("OrdenID")]
        public int? OrdenID { get; set; }
      
        
        [Column("VehiculoID")]
        public int? VehiculoID { get; set; }
      
        
        [Column("TallerID")]
        public int? TallerID { get; set; }
      
        
        [Column("TipoServicio")]
        public string TipoServicio { get; set; }
      
        
        [Column("Precio")]
        public decimal? Precio { get; set; }
      
        
        [Column("Kilometraje")]
        public int? Kilometraje { get; set; }
      
        
        [Column("FechaUltimoMantenimiento")]
        public DateTime? FechaUltimoMantenimiento { get; set; }
      
        
        [Column("FechaSiguienteMantenimiento")]
        public DateTime? FechaSiguienteMantenimiento { get; set; }
      
        
        [Column("FechaCreacion")]
        public DateTime? FechaCreacion { get; set; }
      
        
        [Column("UsuarioCreacionID")]
        public int? UsuarioCreacionID { get; set; }
      
        
        [Column("Observaciones")]
        public string Observaciones { get; set; }
      
        
        [Column("FechaModificacion")]
        public DateTime? FechaModificacion { get; set; }


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
