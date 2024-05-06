import { Routes, Route, Navigate, useNavigate, NavigateFunction } from 'react-router-dom'
import Main from "./Main";
import MainSideBar from "./MainSideBar";
import Vendedores from '../Vendedores/Vendedores';
import Usuarios from '../Usuarios/Usuarios';
import Clientes from '../Clientes/Clientes';
import { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios, { AxiosResponse } from 'axios';
import { GetServerUrl } from '../../global/variables';
import Vehiculos from '../Vehiculos/Vehiculos';
import Talleres from '../Talleres/Talleres';
import Documentacion from '../Documentacion/Documentacion';
import Ventas from '../Ventas/Ventas';



const RoutesApp = () => {
    const navigate: NavigateFunction = useNavigate();
    // var { Jwt, updateJwt } = useContext(AuthContext);
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState<{ id: string | null; nombre: string | null }>({ id: null, nombre: null });
    // const [shownRenewTokenDialog, setShownRenewTokenDialog] = useState(false);
    const storedJwt = sessionStorage.getItem("Jwt");
    const [Jwt, setJwt] = useState<string | null>(storedJwt ? JSON.parse(storedJwt) : null);
    let timerId: NodeJS.Timeout;


    const GetTokenRegenerado = async (): Promise<string> => {
        try {
            const res = await axios.get<string>(`${GetServerUrl()}Usuarios/regenerarToken`, {});
            const newToken = res.data;
            setJwt(newToken);
            sessionStorage.setItem("Jwt", JSON.stringify(newToken));
            return newToken;
        } catch (error) {
            console.error('Error al regenerar el token:', error);
            throw error;
        }
    };

    const renewToken = async () => {
        try {
            const newToken = await GetTokenRegenerado();
            setJwt(newToken);
    
            const decodedToken: any = jwtDecode(newToken);
            const expirationTime = decodedToken.exp * 1000;
            const now = Date.now();
            const timeUntilExpiration = expirationTime - now;

    
    
            checkTokenExpiration();

            // window.location.reload();
    
            return newToken;
        } catch (error) {
            console.error('Error al renovar el token:', error);
            Swal.fire({
                title: "Algo salió mal",
                text: "El token no ha sido renovado",
                icon: "error"
            });
            throw error;
        }
    };
    
    

    const checkTokenExpiration = async (): Promise<void> => {
        if (!Jwt) {
            navigate('/login');
            return;
        }

        const token: string = Jwt;
        const decodedToken: any = jwtDecode(token);
        const tokenHasExpired = decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : true;

        // Limpia el temporizador antes de configurar uno nuevo
        clearTimeout(timerId);

        if (tokenHasExpired) {
            try {
            } catch (error) {
                console.error('Error al regenerar el token:', error);
                navigate('/login');
            }
        } else {
            const expirationTime = decodedToken.exp * 1000;
            const now = Date.now();
            const timeUntilExpiration = expirationTime - now;


            // Muestra el mensaje siempre que el temporizador llegue a cero
            timerId = setTimeout(async () => {

                const result = await Swal.fire({
                    title: "El tiempo de sesión ha expirado: ¿Deseas renovarlo?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, renovar",
                    cancelButtonText: "No, gracias",
                    timer: 30000,
                });

                if (result.isConfirmed) {
                    try {
                        await renewToken();
                    } catch (error) {
                        console.error('Error al renovar el token:', error);
                        navigate('/login');
                    }
                } else {
                    setJwt("");
                    sessionStorage.removeItem("user");
                    sessionStorage.removeItem("Jwt");
                    sessionStorage.removeItem("sucursalSeleccionada");
                }
            }, timeUntilExpiration);
        }
    };
    


    /************************************************************************************************************** */
    useEffect(() => {
        checkTokenExpiration();

        // Limpia el temporizador al cambiar de módulo
        return () => {
            clearTimeout(timerId);
        };
    }, [Jwt, navigate]);




    
    
    return (
        <>
            <Main />
                <div style={{ display: 'flex'}} className="Info">
                    <MainSideBar />
                    <div className='ContenTable' >
                            <Routes>

                                <Route path="vendedores" element={<Vendedores jwt={Jwt ? Jwt : ''}/>} />
                                <Route path="clientes" element={<Clientes jwt={Jwt ? Jwt : ''} />} />
                                <Route path="usuarios" element={<Usuarios jwt={Jwt ? Jwt : ''} />} />
                                <Route path="vehiculos" element={<Vehiculos jwt={Jwt ? Jwt : ''} />} />
                                <Route path="talleres" element={<Talleres jwt={Jwt ? Jwt : ''} />} />
                                <Route path="documentacion" element={<Documentacion jwt={Jwt ? Jwt : ''} />} />

                                <Route path="ventas" element={<Ventas jwt={Jwt ? Jwt : ''} />} />

                                <Route path="/" element={<Navigate to="/login" />} /> 
                            </Routes>
                    </div>
                </div>
        </>
    );
}

export default RoutesApp;