export namespace DBConfiaCar_Renta {
        
    export interface IFotoSiniestro {
              
        FotoSiniestroID: number
      
        SiniestroID?: number
      
        Foto?: any
      
        RutaFoto?: string
      
        FechaCreacion?: string
      
        UsuarioCreacionID?: number
      
        Observaciones?: string
      
        FechaModificacion?: string
      
        TipoFoto?: number

    }
    export interface IRenta {
              
        RentaID: number
      
        VehiculoID?: number
      
        MontoRenta?: number
      
        ClienteID?: number
      
        TipoUso?: string
      
        FechaInicioRenta?: string
      
        FechaDevolucion?: string
      
        FechaCreacion?: string
      
        UsuarioCreacionID?: number
      
        Observaciones?: string
      
        FechaModificacion?: string
      
        UsuarioModificacion?: number

    }
    export interface ISiniestros {
              
        SiniestroID: number
      
        TipoSiniestroID?: number
      
        Descripcion?: string
      
        RentaID?: number
      
        PrestamoID?: number
      
        Estatus?: string
      
        FechaSiniestro?: string
      
        FechaCreacion?: string
      
        UsuarioCreacionID?: number
      
        Observaciones?: string
      
        FechaModificacion?: string

    }
    export interface ITipoSiniestro {
              
        TipoSiniestroID: number
      
        NombreTipo?: string
      
        FechaCreacion?: string
      
        UsuarioCreacionID?: number
      
        Observaciones?: string
      
        FechaModificacion?: string

    }
}