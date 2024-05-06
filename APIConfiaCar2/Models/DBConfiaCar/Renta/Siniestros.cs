using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.Renta
{
    [TableName("Renta.Siniestros")]
    [ExplicitColumns]
    [PrimaryKey("SiniestroID")]
    public class Siniestros
    {
              
        
        [Column("SiniestroID")]
        public int SiniestroID { get; set; }
      
        
        [Column("TipoSiniestroID")]
        public int? TipoSiniestroID { get; set; }
      
        
        [Column("Descripcion")]
        public string Descripcion { get; set; }
      
        
        [Column("RentaID")]
        public int? RentaID { get; set; }
      
        
        [Column("PrestamoID")]
        public int? PrestamoID { get; set; }
      
        
        [Column("Estatus")]
        public string Estatus { get; set; }
      
        
        [Column("FechaSiniestro")]
        public DateTime? FechaSiniestro { get; set; }
      
        
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
