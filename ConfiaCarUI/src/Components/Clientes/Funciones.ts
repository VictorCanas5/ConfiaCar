import axios, { AxiosResponse } from "axios";
import { GetServerUrl } from "../../global/variables";
import { DBConfiaCar_General } from "../../interfaces_db/DBConfiaCar/General";


export const GetClientes = (Jwt:string): Promise<DBConfiaCar_General.IClientes_VW[]>=>
    new Promise((resolver: any, Denegar: any) => {
        axios.post<DBConfiaCar_General.IClientes_VW>(`${GetServerUrl()}Clientes/GetClientes`,{},{
            headers: {
              'Authorization': `Bearer ${Jwt}`
            }
          })
            .then((res: AxiosResponse<DBConfiaCar_General.IClientes_VW>) => {
                resolver(res);

            }).catch(err => {
                Denegar(err);
            })
    })


export const InsertCliente = (Jwt:string, Valores: {   
                                
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  fechaNacimiento: string,
  lugarNacimiento: string
  curp: string,
  rfc: string,
  sexoID: string,
  estadoCivilID: string,
  escolaridadID: number,
  ingresosMensuales: number,
  telefonoDomicilio: string,
  Correo: string,
  telefonoMovil: string,
  identificacionNumero: string,
  observaciones: string,
  buroInternoEstatusID: number,
  bloqueadoCliente: boolean

  }): Promise<DBConfiaCar_General.IClientes_VW[]>=>
  new Promise((resolver: any, Denegar: any) => {
      axios.post<DBConfiaCar_General.IClientes_VW>(`${GetServerUrl()}Clientes/InsertCliente`, Valores,{
          headers: {
            'Authorization': `Bearer ${Jwt}`
          }
        })
      .then((res: AxiosResponse<DBConfiaCar_General.IClientes_VW>) => {
              resolver(res);

          }).catch(err => {
              Denegar(err);
          })
})


export const UpdateCliente = (Jwt:string, Valores: {  
  idCliente:number,
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  fechaNacimiento: string,
  lugarNacimiento: string
  curp: string,
  rfc: string,
  sexoID: string,
  estadoCivilID: string,
  escolaridadID: number,
  ingresosMensuales: number,
  telefonoDomicilio: string,
  Correo: string,
  telefonoMovil: string,
  identificacionNumero: string,
  observaciones: string,
  buroInternoEstatusID: number,
  bloqueadoCliente: boolean

}): Promise<DBConfiaCar_General.IClientes_VW[]>=>
new Promise((resolver: any, Denegar: any) => {
  axios.post<DBConfiaCar_General.IClientes_VW>(`${GetServerUrl()}Clientes/UpdateCliente`, Valores,{
      headers: {
        'Authorization': `Bearer ${Jwt}`
      }
    })
  .then((res: AxiosResponse<DBConfiaCar_General.IClientes_VW>) => {
  resolver(res);

  }).catch(err => {
  console.log(err);
  Denegar(err);
})
})

