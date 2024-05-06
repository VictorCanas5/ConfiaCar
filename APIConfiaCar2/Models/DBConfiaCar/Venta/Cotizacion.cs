using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.Venta
{
    [TableName("Venta.Cotizacion")]
    [ExplicitColumns]
    [PrimaryKey("CotizacionID", AutoIncrement=false)]
    public class Cotizacion
    {
              
        
        [Column("CotizacionID")]
        public int CotizacionID { get; set; }
      
        
        [Column("FechaOrdenCompra")]
        public DateTime? FechaOrdenCompra { get; set; }
      
        
        [Column("ClienteID")]
        public int? ClienteID { get; set; }
      
        
        [Column("RentaID")]
        public int? RentaID { get; set; }
      
        
        [Column("PrestamoID")]
        public int? PrestamoID { get; set; }
      
        
        [Column("VentaID")]
        public int? VentaID { get; set; }
      
        
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
