export namespace DBConfiaCar_Empeños {
        
    export interface IEmpeños {
              
        EmpeñoID: number
      
        VehiculoID?: number
      
        Monto?: number
      
        FechaInicio?: string
      
        FechaVencimiento?: string
      
        Observaciones?: string

    }
}