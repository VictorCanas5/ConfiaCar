using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;



namespace APIConfiaCar.PeticionesRest.Clientes
{
        public class ClientesInsert
    {
        public string? nombre {get; set;}
        public string? apellidoPaterno {get; set;}
        public string? apellidoMaterno {get; set;}
        public string? fechaNacimiento {get; set;}
        public string? lugarNacimiento {get; set;}
        public string? curp {get; set;}
        public string? rfc {get; set;}
        public string? sexoID {get; set;}
        public string? estadoCivilID {get; set;}
        public decimal ingresosMensuales {get; set;}
        public string? telefonoDomicilio {get; set;}
        public string? CorreoElectronico {get; set;}
        public string? telefonoMovil {get; set;}
        public string? identificacionNumero {get; set;}
        public int buroInternoEstatusID {get; set;}
        public Boolean bloqueadoCliente {get; set;}

    }


    public class ClientesUpdate
    {
        public int? idCliente {get; set;}
        public string? nombre {get; set;}
        public string? apellidoPaterno {get; set;}
        public string? apellidoMaterno {get; set;}
        public string? fechaNacimiento {get; set;}
        public string? lugarNacimiento {get; set;}
        public string? curp {get; set;}
        public string? rfc {get; set;}
        public string? sexoID {get; set;}
        public string? estadoCivilID {get; set;}
        public decimal ingresosMensuales {get; set;}
        public string? telefonoDomicilio {get; set;}
        public string? CorreoElectronico {get; set;}
        public string? telefonoMovil {get; set;}
        public string? identificacionNumero {get; set;}
        public int buroInternoEstatusID {get; set;}
        public Boolean bloqueadoCliente {get; set;}

    }



}