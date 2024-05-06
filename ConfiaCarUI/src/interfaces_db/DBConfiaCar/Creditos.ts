export namespace DBConfiaCar_Catalogo {
        
    export interface ICreditos {
              
        CreditoID: number
      
        EstatusCredito?: string
      
        Subtotal?: number
      
        IVA?: number
      
        Abonos?: number
      
        Comision?: number
      
        DiasAtrado?: number
      
        DiasAtrasoMaximo?: number
      
        Descuento?: number
      
        Total?: number
      
        Plazos?: number
      
        PlazoActual?: number
      
        FechaCreacion?: string
      
        FechaAnticipoAnterior?: string
      
        FechaAnticipoActual?: string
      
        FechaModificacion?: string
      
        Periodicidad?: string
      
        Empeño?: boolean
      
        Renta?: boolean
      
        Venta?: boolean
      
        Prestamo?: boolean
      
        VehiculoID?: number
      
        ClienteID?: number
      
        UsuarioID?: number

    }
}