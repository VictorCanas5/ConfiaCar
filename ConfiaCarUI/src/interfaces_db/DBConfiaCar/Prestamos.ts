export namespace DBConfiaCar_General {
        
    export interface IPrestamos {
              
        PrestamoID: number
      
        ClienteID?: number
      
        VehiculoID?: number
      
        FechaPrestamo?: string
      
        FechaDevolucion?: string
      
        FechaCreacion?: string
      
        UsuarioCreacionID?: number
      
        Observaciones?: string
      
        FechaModificacion?: string

    }
}