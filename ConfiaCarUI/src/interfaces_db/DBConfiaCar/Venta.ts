export namespace DBConfiaCar_Seguridad {
        
    export interface ICotizacion {
              
        CotizacionID: number
      
        FechaOrdenCompra?: string
      
        ClienteID?: number
      
        RentaID?: number
      
        PrestamoID?: number
      
        VentaID?: number
      
        Descuento?: number
      
        Subtotal?: number
      
        Total?: number
      
        NoPagos?: number
      
        PersonaAutoriza?: string
      
        EstatusCotizacion?: string
      
        MetodoPagoID?: number
      
        FechaCreacion?: string
      
        UsuarioCreacionID?: number
      
        Observaciones?: string
      
        FechaModificacion?: string

    }
}