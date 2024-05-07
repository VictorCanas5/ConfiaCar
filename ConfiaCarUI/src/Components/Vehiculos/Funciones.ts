import axios, { AxiosResponse } from "axios";
import { GetServerUrl } from "../../global/variables";
import { DBConfiaCar_Catalogo } from "../../interfaces_db/DBConfiaCar/Catalogo";

export const GetVehiculos = (jwt: string) =>
  new Promise((resolver: any, Denegar: any) => {
    axios
      .get(`${GetServerUrl()}Orden/Vehiculos/getVehiculos`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        resolver(res);
      })
      .catch((err) => {
        Denegar(err);
      });
  });

  export const GetMarcas = (jwt: string) =>
  new Promise((resolver: any, Denegar: any) => {
    axios
      .get(`${GetServerUrl()}Marcas/GetMarcas`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        resolver(res);
      })
      .catch((err) => {
        Denegar(err);
      });
  });

  export const GetModelos = (jwt: string, MarcaID: any): Promise<DBConfiaCar_Catalogo.IModelos> =>
  new Promise((resolver: any, Denegar: any) => {
    axios
      .post(`${GetServerUrl()}Modelos/GetModelos`,  {MarcaID : MarcaID},{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        resolver(res);
      })
      .catch((err) => {
        Denegar(err);
      });
  });

  export const GetDocumentosID = (jwt: string, VehiculoID: any) =>
  new Promise((resolver: any, Denegar: any) => {
    axios
      .post(`${GetServerUrl()}Documentos/GetDocumentos`,  {VehiculoID : VehiculoID},{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        resolver(res);
      })
      .catch((err) => {
        Denegar(err);
      });
  });

  export const GetTipos = (jwt: string) =>
  new Promise((resolver: any, Denegar: any) => {
    axios
      .get(`${GetServerUrl()}Documentos/GetTipos`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        resolver(res);
      })
      .catch((err) => {
        Denegar(err);
      });
  });

  export const InsertVehiculo = (jwt: string, Valores: {
    id: number,
    tipoV: number,
    marca: number,
    modelo: number,
    color: string,
    anio: number,
    precioCompra: number,
    precioVenta: number,
    sinprecioV: boolean,
    numeroSerie: number, 
    estatus: string, 
    placas: string, 
    kilometraje: number, 
    transmision: string, 
    noPuertas: number, 
    procedencia: string, 
    observaciones: string
  }) =>
  new Promise((resolver: any, Denegar: any) => {
    axios
      .post(`${GetServerUrl()}Orden/Vehiculos/AddVehiculo`,  Valores,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        resolver(res);
      })
      .catch((err) => {
        Denegar(err);
      });
  });

  export const InsertDocument = (jwt: string, Datos: FormData) =>
  new Promise((Resolver: any, Denegar: any) => {
      axios.post(`${GetServerUrl()}Documentos/subirEvidencia`, Datos, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
          }
      })
          .then(respuesta => {
              Resolver(respuesta.data)
          })
          .catch(error => {
              Denegar(error)
          })
  })
  export const GetDocument = (jwt: string, Valores: {VehiculoID: number, DocumentoID: number}) =>
  new Promise((Resolver: any, Denegar: any) => {
    console.log(Valores);
    
      axios.post(`${GetServerUrl()}Documentos/getEvidencia`, Valores, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          }
      })
          .then(respuesta => {
              Resolver(respuesta.data)
          })
          .catch(error => {
              Denegar(error)
          })
  })
