using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.Empeños
{
    [TableName("Empeños.Cotizacion")]
    [ExplicitColumns]
    [PrimaryKey("EmpeñoCotizacionID")]
    public class Cotizacion
    {
              
        
        [Column("EmpeñoCotizacionID")]
        public int EmpeñoCotizacionID { get; set; }
      
        
        [Column("FechaOrdenCompra")]
        public DateTime? FechaOrdenCompra { get; set; }
      
        
        [Column("EmpeñoID")]
        public int? EmpeñoID { get; set; }
      
        
        [Column("ClienteID")]
        public int? ClienteID { get; set; }
      
        
        [Column("Descuento")]
        public decimal? Descuento { get; set; }
      
        
        [Column("Subtotal")]
        public decimal? Subtotal { get; set; }
      
        
        [Column("Total")]
        public decimal? Total { get; set; }
      
        
        [Column("NoPagos")]
        public int? NoPagos { get; set; }
      
        
        [Column("PersonaAutoriza")]
        public string PersonaAutoriza { get; set; }
      
        
        [Column("EstatusCotizacion")]
        public string EstatusCotizacion { get; set; }
      
        
        [Column("MetodoPagoID")]
        public int? MetodoPagoID { get; set; }
      
        
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
