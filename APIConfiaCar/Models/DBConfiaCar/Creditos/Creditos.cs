using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.Creditos
{
    [TableName("Creditos.Creditos")]
    [ExplicitColumns]
    [PrimaryKey("CreditoID")]
    public class Creditos
    {
              
        
        [Column("CreditoID")]
        public int CreditoID { get; set; }
      
        
        [Column("EstatusCredito")]
        public string EstatusCredito { get; set; }
      
        
        [Column("Subtotal")]
        public decimal? Subtotal { get; set; }
      
        
        [Column("IVA")]
        public decimal? IVA { get; set; }
      
        
        [Column("Abonos")]
        public decimal? Abonos { get; set; }
      
        
        [Column("Comision")]
        public decimal? Comision { get; set; }
      
        
        [Column("DiasAtrado")]
        public int? DiasAtrado { get; set; }
      
        
        [Column("DiasAtrasoMaximo")]
        public int? DiasAtrasoMaximo { get; set; }
      
        
        [Column("Descuento")]
        public decimal? Descuento { get; set; }
      
        
        [Column("Total")]
        public decimal? Total { get; set; }
      
        
        [Column("Plazos")]
        public int? Plazos { get; set; }
      
        
        [Column("PlazoActual")]
        public int? PlazoActual { get; set; }
      
        
        [Column("FechaCreacion")]
        public DateTime? FechaCreacion { get; set; }
      
        
        [Column("FechaAnticipoAnterior")]
        public DateTime? FechaAnticipoAnterior { get; set; }
      
        
        [Column("FechaAnticipoActual")]
        public DateTime? FechaAnticipoActual { get; set; }
      
        
        [Column("FechaModificacion")]
        public DateTime? FechaModificacion { get; set; }
      
        
        [Column("Periodicidad")]
        public string Periodicidad { get; set; }
      
        
        [Column("Empeño")]
        public bool? Empeño { get; set; }
      
        
        [Column("Renta")]
        public bool? Renta { get; set; }
      
        
        [Column("Venta")]
        public bool? Venta { get; set; }
      
        
        [Column("Prestamo")]
        public bool? Prestamo { get; set; }
      
        
        [Column("VehiculoID")]
        public int? VehiculoID { get; set; }
      
        
        [Column("ClienteID")]
        public int? ClienteID { get; set; }
      
        
        [Column("UsuarioID")]
        public int? UsuarioID { get; set; }


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
