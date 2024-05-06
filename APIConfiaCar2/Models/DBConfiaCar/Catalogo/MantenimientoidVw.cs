using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.Catalogo
{
    [TableName("Catalogo.mantenimientoID_VW")]
    [ExplicitColumns]
    // View, no primary key needed
    public class mantenimientoID_VW
    {
              
        
        [Column("MantenimientoID")]
        public int MantenimientoID { get; set; }
      
        
        [Column("VehiculoID")]
        public int VehiculoID { get; set; }
      
        
        [Column("TallerID")]
        public int? TallerID { get; set; }
      
        
        [Column("Marca")]
        public string Marca { get; set; }
      
        
        [Column("Modelo")]
        public string Modelo { get; set; }
      
        
        [Column("NumeroSerie")]
        public string NumeroSerie { get; set; }
      
        
        [Column("Color")]
        public string Color { get; set; }
      
        
        [Column("Placas")]
        public string Placas { get; set; }
      
        
        [Column("Transmision")]
        public string Transmision { get; set; }
      
        
        [Column("NoPuertas")]
        public int? NoPuertas { get; set; }
      
        
        [Column("Procedencia")]
        public string Procedencia { get; set; }
      
        
        [Column("TipoServicio")]
        public string TipoServicio { get; set; }
      
        
        [Column("Kilometraje")]
        public int? Kilometraje { get; set; }
      
        
        [Column("Precio")]
        public decimal? Precio { get; set; }
      
        
        [Column("FechaSiguienteMantenimiento")]
        public string FechaSiguienteMantenimiento { get; set; }
      
        
        [Column("Observaciones")]
        public string Observaciones { get; set; }
      
        
        [Column("NombreTaller")]
        public string NombreTaller { get; set; }
      
        
        [Column("Direccion")]
        public string Direccion { get; set; }
      
        
        [Column("Telefono")]
        public string Telefono { get; set; }
      
        
        [Column("Contacto")]
        public string Contacto { get; set; }
      
        
        [Column("Sector")]
        public string Sector { get; set; }


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
