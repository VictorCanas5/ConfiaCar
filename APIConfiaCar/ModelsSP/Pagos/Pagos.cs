using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NPoco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace APIConfiaCar.ModelsSP
{
    public class Pagos
    {
  
        public int CreditoID { get; set; }
        public int GestorID { get; set; }
        public bool Consolidado { get; set; }
        public decimal Monto { get; set; }  // Cambiado a decimal para reflejar mejor el tipo de datos
        public int SociaID { get; set; }
        public DateTime? FechaPago { get; set; }
        public int EstatusID { get; set; }
    }

    
}
