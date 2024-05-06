export namespace DBConfiaCar_Catalogo {
        
    export interface IDocumentacion {
              
        DocumentoID: number
      
        VehiculoID?: number
      
        NombreDocumento?: string
      
        Observaciones?: string
      
        RutaDocumento?: string
      
        TipoDocID?: number
      
        UsuarioCreacionID?: number
      
        UsuarioModificacionID?: number
      
        FechaCreacion?: string
      
        FechaModificacion?: string

    }
    export interface IFotos {
              
        FotoID: number
      
        VehiculoID?: number
      
        RutaFoto?: string
      
        FechaCreacion?: string
      
        UsuarioCreacionID?: number
      
        FechaModificacion?: string
      
        TipoFoto?: number

    }
    export interface IMantenimiento {
              
        MantenimientoID: number
      
        OrdenID?: number
      
        VehiculoID?: number
      
        TallerID?: number
      
        TipoServicio?: string
      
        Precio?: number
      
        Kilometraje?: number
      
        FechaUltimoMantenimiento?: string
      
        FechaSiguienteMantenimiento?: string
      
        FechaCreacion?: string
      
        UsuarioCreacionID?: number
      
        Observaciones?: string
      
        FechaModificacion?: string

    }
    export interface Imantenimiento_VW {
              
        MantenimientoID: number
      
        TallerID: number
      
        NumeroSerie?: string
      
        Procedencia?: string
      
        TipoServicio?: string
      
        Kilometraje?: number
      
        Precio?: string
      
        FechaSiguienteMantenimiento?: string
      
        Observaciones?: string
      
        Sector?: string

    }
    export interface ImantenimientoID_VW {
              
        MantenimientoID: number
      
        VehiculoID: number
      
        TallerID?: number
      
        Marca?: string
      
        Modelo?: string
      
        NumeroSerie?: string
      
        Color?: string
      
        Placas?: string
      
        Transmision?: string
      
        NoPuertas?: number
      
        Procedencia?: string
      
        TipoServicio?: string
      
        Kilometraje?: number
      
        Precio?: number
      
        FechaSiguienteMantenimiento?: string
      
        Observaciones?: string
      
        NombreTaller?: string
      
        Direccion?: string
      
        Telefono?: string
      
        Contacto?: string
      
        Sector?: string

    }
    export interface IMarcas {
              
        MarcaID: number
      
        Marca?: string
      
        MarcaLogo?: any
      
        FechaCreacion?: string
      
        UsuarioCreacionID?: number

    }
    export interface IMetodoPago {
              
        MetodoPagoID: number
      
        FormaPago?: string

    }
    export interface IModelos {
              
        ModeloID: number
      
        Modelo?: string
      
        Anio?: number
      
        FechaCreacion?: string
      
        MarcaID?: number

    }
    export interface IPolizas {
              
        PolizaID: number
      
        SeguroID?: number
      
        Poliza?: string
      
        Cobertura?: string
      
        FechaVencimiento?: string
      
        FechaCreacion?: string
      
        UsuarioCreacionID?: number
      
        Observaciones?: string
      
        FechaModificacion?: string

    }
    export interface ISeguros {
              
        SeguroID: number
      
        Aseguradora?: string
      
        Direccion?: string
      
        FechaCreacion?: string
      
        UsuarioCreacionID?: number
      
        UsuarioModificacionID?: number
      
        Observaciones?: string
      
        FechaModificacion?: string

    }
    export interface ISeguros_VW {
              
        SeguroID: number
      
        Aseguradora?: string
      
        Direccion?: string
      
        FechaCreacion?: string
      
        Observaciones?: string
      
        FechaModificacion?: string
      
        UsuarioID: number
      
        Nombre?: string
      
        UsuarioModificacion?: string

    }
    export interface ITaller_VW {
              
        TallerID: number
      
        NombreTaller?: string
      
        Direccion?: string
      
        Telefono?: string
      
        Contacto?: string
      
        HorarioApertura?: string
      
        HorarioCierre?: string
      
        FechaCreacion?: string
      
        UsuarioCreacionID?: number
      
        Observaciones?: string
      
        FechaModificacion?: string
      
        Sector?: string

    }
    export interface ITalleres {
              
        TallerID: number
      
        NombreTaller?: string
      
        Direccion?: string
      
        Telefono?: string
      
        Contacto?: string
      
        HorarioApertura?: string
      
        HorarioCierre?: string
      
        FechaCreacion?: string
      
        UsuarioCreacionID?: number
      
        Observaciones?: string
      
        FechaModificacion?: string
      
        Sector?: string

    }
    export interface ITipoFoto {
              
        TipofotoID: number
      
        Nombre?: string
      
        Activo?: boolean
      
        Opcional?: boolean
      
        Documento?: boolean

    }
    export interface ITipoVehiculo {
              
        TipoVehiculoID: number
      
        FechaCreacion?: string
      
        Vehiculo?: string

    }
    export interface IVehiculo_VW {
              
        VehiculoID: number
      
        PolizaID?: number
      
        TipoVehiculoID?: number
      
        EstadoVehiculoID?: number
      
        ModeloID?: number
      
        PrecioCompra?: number
      
        PrecioVenta?: number
      
        Kilometraje?: number
      
        Color?: string
      
        Transmision?: string
      
        NoPuertas?: number
      
        Disponibilidad?: boolean
      
        Estado?: string
      
        Procedencia?: string
      
        FechaCreacion?: string
      
        UsuarioCreacionID?: number
      
        Observaciones?: string
      
        FechaModificacion?: string
      
        NumeroSerie?: string
      
        Placas?: string
      
        PlacasAnteriores?: string
      
        Modelo?: string
      
        Anio?: number
      
        MarcaLogo?: any
      
        Marca?: string

    }
    export interface IVehiculos {
              
        VehiculoID: number
      
        PolizaID?: number
      
        TipoVehiculoID?: number
      
        EstadoVehiculoID?: number
      
        ModeloID?: number
      
        PrecioCompra?: number
      
        PrecioVenta?: number
      
        Kilometraje?: number
      
        Color?: string
      
        Transmision?: string
      
        NoPuertas?: number
      
        Disponibilidad?: boolean
      
        Estado?: string
      
        Procedencia?: string
      
        FechaCreacion?: string
      
        UsuarioCreacionID?: number
      
        Observaciones?: string
      
        FechaModificacion?: string
      
        NumeroSerie?: string
      
        Placas?: string
      
        PlacasAnteriores?: string
      
        Anio?: number

    }
}