using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NPoco;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace APIConfiaCar.ModelsSP
{
    [ExplicitColumns]
    public class InsertVehiculos
    {
         
            public int id { get; set; }
            public int tipoV { get; set; }
            public int marca { get; set; }
            public int modelo { get; set; }
            public string color { get; set; }
            public int anio { get; set; }
            public decimal precioCompra { get; set; }
            public decimal precioVenta { get; set; }
            public bool sinprecioV { get; set; }
            public int numeroSerie { get; set; }
            public string estatus { get; set; }
            public string placas { get; set; }
            public int kilometraje { get; set; }
            public string transmision { get; set; }
            public int noPuertas { get; set; }
            public string procedencia { get; set; }
            public string observaciones { get; set; }
    }
}
