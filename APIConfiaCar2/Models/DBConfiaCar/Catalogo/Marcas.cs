using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.Catalogo
{
    [TableName("Catalogo.Marcas")]
    [ExplicitColumns]
    [PrimaryKey("MarcaID")]
    public class Marcas
    {
              
        
        [Column("MarcaID")]
        public int MarcaID { get; set; }
      
        
        [Column("Marca")]
        public string Marca { get; set; }
      
        
        [Column("MarcaLogo")]
        public byte[] MarcaLogo { get; set; }
      
        
        [Column("FechaCreacion")]
        public DateTime? FechaCreacion { get; set; }
      
        
        [Column("UsuarioCreacionID")]
        public int? UsuarioCreacionID { get; set; }


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
