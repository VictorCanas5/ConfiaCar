using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.General
{
    [TableName("General.VehiculosAdquisicion")]
    [ExplicitColumns]
    [PrimaryKey("VehiculosAdquisicionID")]
    public class VehiculosAdquisicion
    {
              
        
        [Column("VehiculosAdquisicionID")]
        public int VehiculosAdquisicionID { get; set; }
      
        
        [Column("FechaCreacion")]
        public DateTime? FechaCreacion { get; set; }
      
        
        [Column("UsuarioCreacionID")]
        public int? UsuarioCreacionID { get; set; }
      
        
        [Column("Observaciones")]
        public string Observaciones { get; set; }
      
        
        [Column("FechaModificacion")]
        public DateTime? FechaModificacion { get; set; }
      
        
        [Column("VehiculoID")]
        public int? VehiculoID { get; set; }


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
