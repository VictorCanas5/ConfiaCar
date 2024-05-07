import axios, { AxiosResponse } from "axios";
import { GetServerUrl } from "../../global/variables";
import { DBConfiaCar_Seguridad } from "../../interfaces_db/DBConfiaCar/Seguridad";

export const GetUsers = (Jwt:string): Promise<DBConfiaCar_Seguridad.IUsuarios[]>=>
    new Promise((resolver: any, Denegar: any) => {
        axios.post<DBConfiaCar_Seguridad.IUsuarios>(`${GetServerUrl()}Users/GetUsers`,{},{
            headers: {
              'Authorization': `Bearer ${Jwt}`
            }
          })
            .then((res: AxiosResponse<DBConfiaCar_Seguridad.IUsuarios>) => {
                resolver(res);

            }).catch(err => {
                Denegar(err);
            })
    })


export const InsertUsuario = (Jwt:string, Valores: {   
                                    
    nombre: string,
    apaterno: string,
    amaterno: string,
    email: string,
    celular: number,
    rolID: number,
    Estado: boolean

    }): Promise<DBConfiaCar_Seguridad.IUsuarios[]>=>
    new Promise((resolver: any, Denegar: any) => {
        axios.post<DBConfiaCar_Seguridad.IUsuarios>(`${GetServerUrl()}Users/InsertUsers`, Valores,{
            headers: {
              'Authorization': `Bearer ${Jwt}`
            }
          })
        .then((res: AxiosResponse<DBConfiaCar_Seguridad.IUsuarios>) => {
                resolver(res);

            }).catch(err => {
                Denegar(err);
            })
})


export const UpdateUsuario = (Jwt:string, Valores: {  
    id:number,
    nombre: string,
    apellidoPaterno: string,
    apelidoMaterno: string,
    Correo: string,
    celular: number,
    Estado: boolean

}): Promise<DBConfiaCar_Seguridad.IUsuarios[]>=>
new Promise((resolver: any, Denegar: any) => {
    axios.post<DBConfiaCar_Seguridad.IUsuarios>(`${GetServerUrl()}Users/UpdateUsuario`, Valores,{
        headers: {
          'Authorization': `Bearer ${Jwt}`
        }
      })
    .then((res: AxiosResponse<DBConfiaCar_Seguridad.IUsuarios>) => {
    resolver(res);

    }).catch(err => {
    console.log(err);
    Denegar(err);
})
})


export const UpdateFotoUsuario = (data: { id: number; foto: string }) =>
  new Promise((resolver: any, Denegar: any) => {
    axios
      .post(`${GetServerUrl()}Users/UpdateFotoUsuario`, data)
      .then((res) => {
        resolver(res);
      })
      .catch((err) => {
        console.log(err);
        Denegar(err);
      });
  });
