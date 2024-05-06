import axios, { AxiosResponse } from "axios";
import { GetServerUrl } from "../../global/variables";
import { DBConfiaCar_Catalogo } from "../../interfaces_db/DBConfiaCar/Catalogo";

export const GetCreditos = (Jwt:string): Promise<DBConfiaCar_Catalogo.IDocumentacion[]>=>
    new Promise((resolver: any, Denegar: any) => {
        axios.post<DBConfiaCar_Catalogo.IDocumentacion>(`${GetServerUrl()}Creditos/GetCreditos`,{},{
            headers: {
              'Authorization': `Bearer ${Jwt}`
            }
          })
            .then((res: AxiosResponse<DBConfiaCar_Catalogo.IDocumentacion>) => {
                resolver(res);

            }).catch(err => {
                Denegar(err);
            })
    })


export const GetClientes = (Jwt:string): Promise<DBConfiaCar_Catalogo.IVehiculos[]>=>
    new Promise((resolver: any, Denegar: any) => {
        axios.post<DBConfiaCar_Catalogo.IVehiculos>(`${GetServerUrl()}Clientes/GetClientes`,{},{
            headers: {
                'Authorization': `Bearer ${Jwt}`
            }
            })
            .then((res: AxiosResponse<DBConfiaCar_Catalogo.IVehiculos>) => {
                resolver(res);

            }).catch(err => {
                Denegar(err);
            })
    })

export const GetVehiculos = (Jwt:string): Promise<DBConfiaCar_Catalogo.IVehiculos[]>=>
    new Promise((resolver: any, Denegar: any) => {
        axios.post<DBConfiaCar_Catalogo.IVehiculos>(`${GetServerUrl()}Vehiculos/GetVehiculos`,{},{
            headers: {
                'Authorization': `Bearer ${Jwt}`
            }
            })
            .then((res: AxiosResponse<DBConfiaCar_Catalogo.IVehiculos>) => {
                resolver(res);

            }).catch(err => {
                Denegar(err);
            })
    })


export const InsertVenta = (userID: number, Jwt: string, Valores: {
    vehiculoID: number,
    clienteID: number,
    precioVenta: null | number,
    plazos: number,
    tipoPago: string,
    periodicidad: string,
    abonos: number,
}): Promise<DBConfiaCar_Catalogo.IDocumentacion[]> =>
    new Promise((resolver: any, Denegar: any) => {
        console.log("estos son los datos: ", Valores, "userID: ", userID);
        axios.post<DBConfiaCar_Catalogo.IDocumentacion>(`${GetServerUrl()}Documentos/InsertDocumentosss`, {
            ...Valores,
            userID: userID
        }, {
            headers: {
                'Authorization': `Bearer ${Jwt}`,
            }
        })
            .then((res: AxiosResponse<DBConfiaCar_Catalogo.IDocumentacion>) => {
                resolver(res);
            }).catch(err => {
                Denegar(err);
            });
});