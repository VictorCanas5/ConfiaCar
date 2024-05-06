using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;



namespace APIConfiaCar.PeticionesRest.Documentos
{
    public class DocumentosInsertUpdate
    {
        public int? documentoID {get; set;}
        public int? vehiculoID {get; set;}
        public string? nombreDocumento {get; set;}
        public string? rutaDocumento {get; set;}
        public string? observaciones {get; set;}
        public int? userID{get; set;}

    }
    public class Documentos
    {
        public int? vehiculoID {get; set;}
       
    }

    public class Placas
    {
        public int? documentoID {get; set;}

    }
     public class getEvidencia
    {
        public int? DocumentoID {get; set;}
         public int? VehiculoID {get; set;}

    }

    public class PlacasInsert
    {
        public int? placaID {get; set;}
        public int? documentoID {get; set;}
        public string? numeroPlaca {get; set;}
        public string? dueño {get; set;}
        public string? fechaVigencia {get; set;}
        public string? fechaRenovacion {get; set;}



    }



}