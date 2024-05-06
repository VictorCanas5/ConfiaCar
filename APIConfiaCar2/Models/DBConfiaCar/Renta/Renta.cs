using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.Renta
{
    [TableName("Renta.Renta")]
    [ExplicitColumns]
    [PrimaryKey("RentaID")]
    public class Renta
    {
              
        
        [Column("RentaID")]
        public int RentaID { get; set; }
      
        
        [Column("VehiculoID")]
        public int? VehiculoID { get; set; }
      
        
        [Column("MontoRenta")]
        public decimal? MontoRenta { get; set; }
      
        
        [Column("ClienteID")]
        public int? ClienteID { get; set; }
      
        
        [Column("TipoUso")]
        public string TipoUso { get; set; }
      
        
        [Column("FechaInicioRenta")]
        public DateTime? FechaInicioRenta { get; set; }
      
        
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
      
        
        [Column("UsuarioModificacion")]
        public int? UsuarioModificacion { get; set; }


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
