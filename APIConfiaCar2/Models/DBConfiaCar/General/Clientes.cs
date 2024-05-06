using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.General
{
    [TableName("General.Clientes")]
    [ExplicitColumns]
    [PrimaryKey("ClienteID")]
    public class Clientes
    {
              
        
        [Column("ClienteID")]
        public int ClienteID { get; set; }
      
        
        [Column("PersonaID")]
        public Int64? PersonaID { get; set; }
      
        
        [Column("IdentificacionNumero")]
        public string IdentificacionNumero { get; set; }
      
        
        [Column("BloqueadoCliente")]
        public bool? BloqueadoCliente { get; set; }
      
        
        [Column("FechaCreacion")]
        public DateTime? FechaCreacion { get; set; }
      
        
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
