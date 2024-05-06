using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;



namespace APIConfiaCar.PeticionesRest.Usuarios
{
    public class Usuarios
    {
        public int? id {get; set;}
        public string? nombre {get; set;}
        public string? apellidoPaterno {get; set;}
        public string? apellidoMaterno {get; set;}
        public string Correo {get; set;}
        public string? celular { get; set; } 
        public Boolean Master {get; set;}
    }


        public class UsuariosFotos
    {
        public int? id {get; set;}
        public string? foto { get; set; } 
    }


    public class CambioContra
    {
        public string? contraseña {get; set;}
        public string? confirmarContraseña {get; set;}

        public int? userID{get; set;}

    }


}