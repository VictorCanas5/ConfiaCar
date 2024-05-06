using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.Catalogo
{
    [TableName("Catalogo.Modelos")]
    [ExplicitColumns]
    [PrimaryKey("ModeloID")]
    public class Modelos
    {
              
        
        [Column("ModeloID")]
        public int ModeloID { get; set; }
      
        
        [Column("Modelo")]
        public string Modelo { get; set; }
      
        
        [Column("Anio")]
        public int? Anio { get; set; }
      
        
        [Column("FechaCreacion")]
        public DateTime? FechaCreacion { get; set; }
      
        
        [Column("MarcaID")]
        public int? MarcaID { get; set; }


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
