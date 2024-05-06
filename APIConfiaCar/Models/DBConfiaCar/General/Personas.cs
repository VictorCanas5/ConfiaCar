using System;
using NPoco;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace DBContext.DBConfiaCar.General
{
    [TableName("General.Personas")]
    [ExplicitColumns]
    [PrimaryKey("PersonaID")]
    public class Personas
    {
              
        
        [Column("PersonaID")]
        public Int64 PersonaID { get; set; }
      
        
        [Column("Nombre")]
        public string Nombre { get; set; }
      
        
        [Column("ApellidoPaterno")]
        public string ApellidoPaterno { get; set; }
      
        
        [Column("ApellidoMaterno")]
        public string ApellidoMaterno { get; set; }
      
        
        [Column("FechaNacimiento")]
        public DateTime FechaNacimiento { get; set; }
      
        
        [Column("LugarNacimiento")]
        public string LugarNacimiento { get; set; }
      
        
        [Column("CURP")]
        public string CURP { get; set; }
      
        
        [Column("RFC")]
        public string RFC { get; set; }
      
        
        [Column("SexoID")]
        public string SexoID { get; set; }
      
        
        [Column("EstadoCivilID")]
        public string EstadoCivilID { get; set; }
      
        
        [Column("EscolaridadID")]
        public int? EscolaridadID { get; set; }
      
        
        [Column("IngresosMensuales")]
        public decimal IngresosMensuales { get; set; }
      
        
        [Column("DependientesEconomicos")]
        public int? DependientesEconomicos { get; set; }
      
        
        [Column("TelefonoDomicilio")]
        public string TelefonoDomicilio { get; set; }
      
        
        [Column("TelefonoMovil")]
        public string TelefonoMovil { get; set; }
      
        
        [Column("CorreoElectronico")]
        public string CorreoElectronico { get; set; }
      
        
        [Column("NombreConyuge")]
        public string NombreConyuge { get; set; }
      
        
        [Column("BuroInternoEstatusID")]
        public int? BuroInternoEstatusID { get; set; }
      
        
        [Column("Observaciones")]
        public string Observaciones { get; set; }
      
        
        [Column("identificacionTipoId")]
        public int? identificacionTipoId { get; set; }
      
        
        [Column("identificacionNumero")]
        public string identificacionNumero { get; set; }
      
        
        [Column("canjeValeSolicitudId")]
        public Int64? canjeValeSolicitudId { get; set; }
      
        
        [Column("GrupoID")]
        public int? GrupoID { get; set; }
      
        [ComputedColumn(ComputedColumnType.Always)]
        [Column("NombreCompleto")]
        public string NombreCompleto { get; set; }
      
        
        [Column("CreacionFecha")]
        public DateTime CreacionFecha { get; set; }
      
        
        [Column("CreacionPersonaID")]
        public Int64? CreacionPersonaID { get; set; }
      
        
        [Column("CreacionUsuarioID")]
        public int? CreacionUsuarioID { get; set; }
      
        [ComputedColumn(ComputedColumnType.Always)]
        [Column("SoundexNombre")]
        public string SoundexNombre { get; set; }
      
        [ComputedColumn(ComputedColumnType.Always)]
        [Column("SoundexAPaterno")]
        public string SoundexAPaterno { get; set; }
      
        [ComputedColumn(ComputedColumnType.Always)]
        [Column("SoundexAMaterno")]
        public string SoundexAMaterno { get; set; }
      
        
        [Column("SACId")]
        public Int64? SACId { get; set; }
      
        
        [Column("ModificacionFecha")]
        public DateTime? ModificacionFecha { get; set; }
      
        
        [Column("ModificacionPersonaID")]
        public Int64? ModificacionPersonaID { get; set; }
      
        
        [Column("ModificacionUsuarioID")]
        public int? ModificacionUsuarioID { get; set; }
      
        
        [Column("movCli")]
        public int? movCli { get; set; }
      
        
        [Column("CveCli")]
        public string CveCli { get; set; }
      
        
        [Column("PersonaIdExt")]
        public Int64? PersonaIdExt { get; set; }
      
        
        [Column("ArchivoEstatusID")]
        public int? ArchivoEstatusID { get; set; }
      
        
        [Column("FechaPrimerCanje")]
        public DateTime? FechaPrimerCanje { get; set; }
      
        
        [Column("BloqueadoCliente")]
        public bool? BloqueadoCliente { get; set; }
      
        
        [Column("ImagenCliente")]
        public string ImagenCliente { get; set; }
      
        
        [Column("IDExterno")]
        public string IDExterno { get; set; }
      
        
        [Column("IDSisFecha")]
        public string IDSisFecha { get; set; }
      
        
        [Column("TipoExt")]
        public string TipoExt { get; set; }


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
