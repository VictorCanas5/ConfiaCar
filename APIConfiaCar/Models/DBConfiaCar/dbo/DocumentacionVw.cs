using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.dbo
{
    [TableName("dbo.Documentacion_VW")]
    [ExplicitColumns]
    // View, no primary key needed
    public class Documentacion_VW
    {
              
        
        [Column("DocumentoID")]
        public int DocumentoID { get; set; }
      
        
        [Column("VehiculoID")]
        public int? VehiculoID { get; set; }
      
        
        [Column("NombreDocumento")]
        public string NombreDocumento { get; set; }
      
        
        [Column("Observaciones")]
        public string Observaciones { get; set; }
      
        
        [Column("RutaDocumento")]
        public string RutaDocumento { get; set; }
      
        
        [Column("TipoDocID")]
        public int? TipoDocID { get; set; }
      
        
        [Column("UsuarioCreacionID")]
        public int? UsuarioCreacionID { get; set; }
      
        
        [Column("UsuarioModificacionID")]
        public int? UsuarioModificacionID { get; set; }
      
        
        [Column("FechaCreacion")]
        public DateTime? FechaCreacion { get; set; }
      
        
        [Column("FechaModificacion")]
        public DateTime? FechaModificacion { get; set; }
      
        
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
