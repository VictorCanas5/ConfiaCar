export namespace DBConfiaCar_General {
        
    export interface IClientes_VW {
              
        PersonaID: number
      
        ClienteID?: number
      
        Nombre: string
      
        ApellidoPaterno: string
      
        ApellidoMaterno: string
      
        FechaNacimiento: string
      
        LugarNacimiento: string
      
        CURP: string
      
        RFC: string
      
        SexoID: string
      
        EstadoCivilID?: string
      
        EscolaridadID?: number
      
        IngresosMensuales: number
      
        DependientesEconomicos?: number
      
        TelefonoDomicilio?: string
      
        TelefonoMovil: string
      
        CorreoElectronico?: string
      
        NombreConyuge?: string
      
        BuroInternoEstatusID?: number
      
        Observaciones?: string
      
        identificacionTipoId?: number
      
        identificacionNumero?: string
      
        canjeValeSolicitudId?: number
      
        GrupoID?: number
      
        NombreCompleto: string
      
        CreacionFecha: string
      
        CreacionPersonaID?: number
      
        CreacionUsuarioID?: number
      
        SoundexNombre?: string
      
        SoundexAPaterno?: string
      
        SoundexAMaterno?: string
      
        SACId?: number
      
        ModificacionFecha?: string
      
        ModificacionPersonaID?: number
      
        ModificacionUsuarioID?: number
      
        movCli?: number
      
        CveCli?: string
      
        PersonaIdExt?: number
      
        ArchivoEstatusID?: number
      
        FechaPrimerCanje?: string
      
        BloqueadoCliente?: boolean
      
        ImagenCliente?: string
      
        IDExterno?: string
      
        IDSisFecha?: string
      
        TipoExt?: string

    }
    export interface IExpediente {
              
        ExpedienteID: number
      
        FechaCreacion?: string
      
        VehiculoID?: number

    }
    export interface IPersonas {
              
        PersonaID: number
      
        Nombre: string
      
        ApellidoPaterno: string
      
        ApellidoMaterno: string
      
        FechaNacimiento: string
      
        LugarNacimiento: string
      
        CURP: string
      
        RFC: string
      
        SexoID: string
      
        EstadoCivilID?: string
      
        EscolaridadID?: number
      
        IngresosMensuales: number
      
        DependientesEconomicos?: number
      
        TelefonoDomicilio?: string
      
        TelefonoMovil: string
      
        CorreoElectronico?: string
      
        NombreConyuge?: string
      
        BuroInternoEstatusID?: number
      
        Observaciones?: string
      
        identificacionTipoId?: number
      
        identificacionNumero?: string
      
        canjeValeSolicitudId?: number
      
        GrupoID?: number
      
        NombreCompleto: string
      
        CreacionFecha: string
      
        CreacionPersonaID?: number
      
        CreacionUsuarioID?: number
      
        SoundexNombre?: string
      
        SoundexAPaterno?: string
      
        SoundexAMaterno?: string
      
        SACId?: number
      
        ModificacionFecha?: string
      
        ModificacionPersonaID?: number
      
        ModificacionUsuarioID?: number
      
        movCli?: number
      
        CveCli?: string
      
        PersonaIdExt?: number
      
        ArchivoEstatusID?: number
      
        FechaPrimerCanje?: string
      
        BloqueadoCliente?: boolean
      
        ImagenCliente?: string
      
        IDExterno?: string
      
        IDSisFecha?: string
      
        TipoExt?: string

    }
    export interface IVehiculosAdquisicion {
              
        VehiculosAdquisicionID: number
      
        FechaCreacion?: string
      
        UsuarioCreacionID?: number
      
        Observaciones?: string
      
        FechaModificacion?: string
      
        VehiculoID?: number

    }
}