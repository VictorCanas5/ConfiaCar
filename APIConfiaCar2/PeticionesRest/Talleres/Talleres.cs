using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;



namespace APIConfiaCar.PeticionesRest.Talleres
{
    public class TalleresInsert
    {
        public string? nombre {get; set;}
        public string? direccion {get; set;}
        public int? telefono {get; set;}
        public string contacto {get; set;}
        public string? horarioApertura { get; set; } 
        public string? horarioCierre {get; set;}
    }



}