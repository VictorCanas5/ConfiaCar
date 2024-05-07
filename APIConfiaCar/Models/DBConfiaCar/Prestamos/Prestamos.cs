using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.Prestamos
{
    [TableName("Prestamos.Prestamos")]
    [ExplicitColumns]
    [PrimaryKey("PrestamoID")]
    public class Prestamos
    {
              
        
        [Column("PrestamoID")]
        public int PrestamoID { get; set; }
      
        
        [Column("ClienteID")]
        public int? ClienteID { get; set; }
      
        
        [Column("VehiculoID")]
        public int? VehiculoID { get; set; }
      
        
        [Column("FechaPrestamo")]
        public DateTime? FechaPrestamo { get; set; }
      
        
        [Column("FechaDevolucion")]
        public DateTime? FechaDevolucion { get; set; }
      
        
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
