import axios, { AxiosResponse } from "axios";
import { GetServerUrl } from "../../global/variables";
import { DBConfiaCar_Seguridad } from "../../interfaces_db/DBConfiaCar/Seguridad";
import Swal from 'sweetalert2';



export const cambioContra = (jwt:string, userID: number, contraseña: string, confirmarContraseña: string): Promise<DBConfiaCar_Seguridad.IUsuarios[]> =>  
    new Promise((resolver: any, Denegar: any) => {
        axios.post<DBConfiaCar_Seguridad.IUsuarios>(`${GetServerUrl()}Users/cambioContra`,{userID, contraseña, confirmarContraseña},{
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
            })
            // .then(res => {
            .then((res: AxiosResponse<DBConfiaCar_Seguridad.IUsuarios>) => { 
                resolver(res.data);
            }).catch(err => {
                Swal.fire({
                    position: "center",       
                    icon: "error",
                    title: "Las credenciales no coinciden, favor de corregirlas",
                    showConfirmButton: false,
                    timer: 1000
                });
                Denegar(err);
            })
})



