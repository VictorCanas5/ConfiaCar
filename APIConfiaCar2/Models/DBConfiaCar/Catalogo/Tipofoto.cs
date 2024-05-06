using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.Catalogo
{
    [TableName("Catalogo.TipoFoto")]
    [ExplicitColumns]
    [PrimaryKey("TipofotoID")]
    public class TipoFoto
    {
              
        
        [Column("TipofotoID")]
        public int TipofotoID { get; set; }
      
        
        [Column("Nombre")]
        public string Nombre { get; set; }
      
        
        [Column("Activo")]
        public bool? Activo { get; set; }
      
        
        [Column("Opcional")]
        public bool? Opcional { get; set; }
      
        
        [Column("Documento")]
        public bool? Documento { get; set; }


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
