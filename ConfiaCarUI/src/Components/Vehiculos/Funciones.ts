import axios, { AxiosResponse } from "axios";
import { GetServerUrl } from "../../global/variables";

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
