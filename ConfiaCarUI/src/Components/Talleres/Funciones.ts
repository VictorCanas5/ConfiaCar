import axios, { AxiosResponse } from "axios";
import { GetServerUrl } from "../../global/variables";
import { DBConfiaCar_Catalogo } from "../../interfaces_db/DBConfiaCar/Catalogo";

export const GetTalleres = (Jwt:string): Promise<DBConfiaCar_Catalogo.ITalleres[]>=>
    new Promise((resolver: any, Denegar: any) => {
        axios.post<DBConfiaCar_Catalogo.ITalleres>(`${GetServerUrl()}Talleres/GetTalleres`,{},{
            headers: {
              'Authorization': `Bearer ${Jwt}`
            }
          })
            .then((res: AxiosResponse<DBConfiaCar_Catalogo.ITalleres>) => {
                resolver(res);

            }).catch(err => {
                Denegar(err);
            })
    })


export const InsertTaller = (Jwt:string, Valores: {   
                                    
    nombre: string;
    direccion: string;
    telefono: number;
    contacto: string;
    horarioApertura: string;
    horarioCierre: string;

    }): Promise<DBConfiaCar_Catalogo.ITalleres[]>=>
    new Promise((resolver: any, Denegar: any) => {
        axios.post<DBConfiaCar_Catalogo.ITalleres>(`${GetServerUrl()}Talleres/InsertTalleres`, Valores,{
            headers: {
              'Authorization': `Bearer ${Jwt}`
            }
          })
        .then((res: AxiosResponse<DBConfiaCar_Catalogo.ITalleres>) => {
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

}): Promise<DBConfiaCar_Catalogo.ITalleres[]>=>
new Promise((resolver: any, Denegar: any) => {
    axios.post<DBConfiaCar_Catalogo.ITalleres>(`${GetServerUrl()}Users/UpdateUsuario`, Valores,{
        headers: {
          'Authorization': `Bearer ${Jwt}`
        }
      })
    .then((res: AxiosResponse<DBConfiaCar_Catalogo.ITalleres>) => {
    resolver(res);

    }).catch(err => {
    console.log(err);
    Denegar(err);
})
})


export const UpdateFotoUsuario = (data: { id: number; foto: string }) =>
    new Promise((resolver: any, Denegar: any) => {
        axios.post(`${GetServerUrl()}Users/UpdateFotoUsuario`, data)
            .then(res => {
                resolver(res);
            })
            .catch(err => {
                console.log(err);
                Denegar(err);
            });
    });


