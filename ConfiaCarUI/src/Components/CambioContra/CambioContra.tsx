import Logo from '../Login/confia.png'
import './CambioContra.css';
import SelectComponent from "../../global/Componentes/Select/SelectComponent";
import { useNavigate } from "react-router-dom";

import { Paper, TableContainer, IconButton, Fab, CircularProgress } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useLayoutEffect, useState, useEffect } from "react";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AddIcon from '@mui/icons-material/Add';
import { EditFilled } from "@ant-design/icons";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import '../../global/styles/GlobalStyles.css'
import EditIcon from '@mui/icons-material/Edit';
import * as Funciones from "./Funciones";
import { Form, Formik } from "formik";
import {  DBConfiaCar_Seguridad } from '../../interfaces_db/DBConfiaCar/Seguridad';
import TextComponent from "../../global/Componentes/TextComponent.tsx/TextComponent";
import Swal from 'sweetalert2';




type TypeSucursales = {
    jwt: string
}
  
const Cambiocontrasenia = (props: TypeSucursales) => {

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [stateMessageError, stateSetMesageError] = useState(false)
    const history = useNavigate();
    const [mesageError, setMessageError] = useState('')

    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');



    const fnCambioContra = (userID: number, contraseña: string, confirmarContraseña: string) => {
        setLoading(true);
        stateSetMesageError(false)
        Funciones.cambioContra(props.jwt, userID, contraseña, confirmarContraseña)
        .then((res: any) => {
            Swal.fire({
                position: "center",       
                icon: "success",
                title: "La contraseña a sido cambiada con exito",
                showConfirmButton: false,
                timer: 1000
            });
            history('/main');
        })

            .catch((err: any) => {

                setLoading(false);
                Swal.fire({
                    position: "center",       
                    icon: "error",
                    title: "Algo salio mal",
                    showConfirmButton: false,
                    timer: 1000
                });
                stateSetMesageError(true);
            })
    }


    useEffect(() => {
        
    }, []);

    return (
        <Formik
            initialValues={{ contraseña: "" }}
            enableReinitialize
            onSubmit={(values: any) => {
                const user = JSON.parse(sessionStorage.getItem('user') || '{}');
                fnCambioContra(user.userID, values.contraseña,values.confirmarContraseña)
            }}
        >
            {() => {
                return (
                  <>
                    {showModal && (
                      <Form className="animate__animated animate__fadeInRight" style={{ width: '100%', height: '90%' }}>
                          <center>
                              <TableContainer style={{ width: '60%', height: '100%' }}>
                                  {!loading &&
                                      <div style={{ boxShadow: '10px 5px 5px #828486', backgroundColor: 'rgb(241 241 241)', paddingBottom: '1rem', paddingTop: '1rem', margin: '1.5rem', borderRadius: '80px' }}>
                                          <div className='contenedor_elementos_seleccionar_sucursal' style={{ textAlign: 'center', fontSize: '2rem', margin: '1rem', fontFamily: 'sans-serif' }}>
                                              <img style={{ width: '6rem', height: '6rem' }} src={Logo} alt="" />
                                              <strong style={{ fontSize: '25px', margin: '0rem', fontFamily: 'sans-serif' }}>Cambio de contraseña:</strong>

                                              <div>
                                                    <TextComponent id={"Contraseña"} name={"contraseña"} DefaultValue={undefined} type={"password"}/>
                                                    <TextComponent id={"Confirmar contraseña"} name={"confirmarContraseña"} DefaultValue={undefined} type={"password"}/>
                                              </div>
                                              
                                              <Fab type="submit" variant="extended" style={{ marginBottom: '4rem', marginTop: '3rem', backgroundColor: '#0168C7', color: '#FFFFFF' }}>
                                                  Continuar
                                              </Fab>
                                          </div>
                                      </div>
                                  }
                              </TableContainer>
                          </center>
                      </Form>
                    )}
                  </>
                )
            }}
        </Formik>
    )
}

export default Cambiocontrasenia;