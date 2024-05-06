using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.Renta
{
    [TableName("Renta.FotoSiniestro")]
    [ExplicitColumns]
    [PrimaryKey("FotoSiniestroID")]
    public class FotoSiniestro
    {
              
        
        [Column("FotoSiniestroID")]
        public int FotoSiniestroID { get; set; }
      
        
        [Column("SiniestroID")]
        public int? SiniestroID { get; set; }
      
        
        [Column("Foto")]
        public byte[] Foto { get; set; }
      
        
        [Column("RutaFoto")]
        public string RutaFoto { get; set; }
      
        
        [Column("FechaCreacion")]
        public DateTime? FechaCreacion { get; set; }
      
        
        [Column("UsuarioCreacionID")]
        public int? UsuarioCreacionID { get; set; }
      
        
        [Column("Observaciones")]
        public string Observaciones { get; set; }
      
        
        [Column("FechaModificacion")]
        public DateTime? FechaModificacion { get; set; }
      
        
        [Column("TipoFoto")]
        public int? TipoFoto { get; set; }


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
