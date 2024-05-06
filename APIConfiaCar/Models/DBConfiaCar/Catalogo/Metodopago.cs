using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.Catalogo
{
    [TableName("Catalogo.MetodoPago")]
    [ExplicitColumns]
    [PrimaryKey("MetodoPagoID", AutoIncrement=false)]
    public class MetodoPago
    {
              
        
        [Column("MetodoPagoID")]
        public int MetodoPagoID { get; set; }
      
        
        [Column("FormaPago")]
        public string FormaPago { get; set; }


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
