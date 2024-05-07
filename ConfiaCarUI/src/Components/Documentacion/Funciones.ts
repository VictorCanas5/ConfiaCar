import axios, { AxiosResponse } from "axios";
import { GetServerUrl } from "../../global/variables";
import { DBConfiaCar_Catalogo } from "../../interfaces_db/DBConfiaCar/Catalogo";

export const GetDocumentos = (Jwt:string): Promise<DBConfiaCar_Catalogo.IDocumentacion[]>=>
    new Promise((resolver: any, Denegar: any) => {
        axios.post<DBConfiaCar_Catalogo.IDocumentacion>(`${GetServerUrl()}Documentos/GetDocumentos`,{},{
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


export const GetPlacas = (DocumentoID: number, Jwt:string): Promise<DBConfiaCar_Catalogo.IDocumentacion[]>=>
    new Promise((resolver: any, Denegar: any) => {
        axios.post<DBConfiaCar_Catalogo.IDocumentacion>(`${GetServerUrl()}Documentos/GetPlacas`,{DocumentoID},{
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


    export const InsertDocumento = (userID: number, Jwt: string, Valores: {
      documentoID: number,
      vehiculoID: number,
      nombreDocumento: string,
      rutaDocumento: string,
      observaciones: string,
    }): Promise<DBConfiaCar_Catalogo.IDocumentacion[]> =>
      new Promise((resolver: any, Denegar: any) => {
          console.log("estos son los datos: ", Valores, "token: ", Jwt, "userID: ", userID);
          axios.post<DBConfiaCar_Catalogo.IDocumentacion>(`${GetServerUrl()}Documentos/InsertDocumentos`, {
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
    

    export const InsertPlaca = (DocumentoID: number, Jwt: string, Valores: {
        placaID: number;
        numeroPlaca: string;
        dueño: string;
        fechaVigencia: string;
        fechaRenovacion: string;
        documentoID: number;
    }): Promise<DBConfiaCar_Catalogo.IDocumentacion[]> =>
    new Promise((resolver: any, Denegar: any) => {
        console.log("estos son los datos: ", Valores, "token: ", Jwt, "documentoD: ", DocumentoID);
        axios.post<DBConfiaCar_Catalogo.IDocumentacion>(`${GetServerUrl()}Documentos/InsertPlacas`, {
            ...Valores,
            DocumentoID: DocumentoID
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



  export const UpdateDocumento = (userID: number, Jwt: string, Valores: {
    documentoID: number,
    vehiculoID: number,
    nombreDocumento: string,
    rutaDocumento: string,
    observaciones: string,
  }): Promise<DBConfiaCar_Catalogo.IDocumentacion[]> =>
    new Promise((resolver: any, Denegar: any) => {
        axios.post<DBConfiaCar_Catalogo.IDocumentacion>(`${GetServerUrl()}Documentos/UpdateDocumento`, {
            ...Valores,
            userID: userID
        }, {
            headers: {
                'Authorization': `Bearer ${Jwt}`
            }
        })
            .then((res: AxiosResponse<DBConfiaCar_Catalogo.IDocumentacion>) => {
                resolver(res);
            }).catch(err => {
                console.log(err);
                Denegar(err);
            });
    });
      



