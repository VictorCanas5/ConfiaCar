using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.Catalogo
{
    [TableName("Catalogo.mantenimiento_VW")]
    [ExplicitColumns]
    // View, no primary key needed
    public class mantenimiento_VW
    {
              
        
        [Column("MantenimientoID")]
        public int MantenimientoID { get; set; }
      
        
        [Column("TallerID")]
        public int TallerID { get; set; }
      
        
        [Column("NumeroSerie")]
        public string NumeroSerie { get; set; }
      
        
        [Column("Procedencia")]
        public string Procedencia { get; set; }
      
        
        [Column("TipoServicio")]
        public string TipoServicio { get; set; }
      
        
        [Column("Kilometraje")]
        public int? Kilometraje { get; set; }
      
        
        [Column("Precio")]
        public string Precio { get; set; }
      
        
        [Column("FechaSiguienteMantenimiento")]
        public string FechaSiguienteMantenimiento { get; set; }
      
        
        [Column("Observaciones")]
        public string Observaciones { get; set; }
      
        
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
