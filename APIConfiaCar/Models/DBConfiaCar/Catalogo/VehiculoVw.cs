using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.Catalogo
{
    [TableName("Catalogo.Vehiculo_VW")]
    [ExplicitColumns]
    // View, no primary key needed
    public class Vehiculo_VW
    {
              
        
        [Column("VehiculoID")]
        public int VehiculoID { get; set; }
      
        
        [Column("PolizaID")]
        public int? PolizaID { get; set; }
      
        
        [Column("TipoVehiculoID")]
        public int? TipoVehiculoID { get; set; }
      
        
        [Column("EstadoVehiculoID")]
        public int? EstadoVehiculoID { get; set; }
      
        
        [Column("ModeloID")]
        public int? ModeloID { get; set; }
      
        
        [Column("PrecioCompra")]
        public decimal? PrecioCompra { get; set; }
      
        
        [Column("PrecioVenta")]
        public decimal? PrecioVenta { get; set; }
      
        
        [Column("Kilometraje")]
        public Int64? Kilometraje { get; set; }
      
        
        [Column("Color")]
        public string Color { get; set; }
      
        
        [Column("Transmision")]
        public string Transmision { get; set; }
      
        
        [Column("NoPuertas")]
        public int? NoPuertas { get; set; }
      
        
        [Column("Disponibilidad")]
        public bool? Disponibilidad { get; set; }
      
        
        [Column("Estado")]
        public string Estado { get; set; }
      
        
        [Column("Procedencia")]
        public string Procedencia { get; set; }
      
        
        [Column("FechaCreacion")]
        public DateTime? FechaCreacion { get; set; }
      
        
        [Column("UsuarioCreacionID")]
        public int? UsuarioCreacionID { get; set; }
      
        
        [Column("Observaciones")]
        public string Observaciones { get; set; }
      
        
        [Column("FechaModificacion")]
        public DateTime? FechaModificacion { get; set; }
      
        
        [Column("NumeroSerie")]
        public string NumeroSerie { get; set; }
      
        
        [Column("Placas")]
        public string Placas { get; set; }
      
        
        [Column("PlacasAnteriores")]
        public string PlacasAnteriores { get; set; }
      
        
        [Column("Modelo")]
        public string Modelo { get; set; }
      
        
        [Column("Anio")]
        public int? Anio { get; set; }
      
        
        [Column("MarcaLogo")]
        public byte[] MarcaLogo { get; set; }
      
        
        [Column("Marca")]
        public string Marca { get; set; }


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
