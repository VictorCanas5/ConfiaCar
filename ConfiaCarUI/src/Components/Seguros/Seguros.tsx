import { Paper, TableContainer, IconButton, Fab, Skeleton, Stack, Typography, Breadcrumbs, Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import * as Funciones from "./Funciones";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AddIcon from '@mui/icons-material/Add';
import { Create } from "@mui/icons-material";
import CameraIcon from '@mui/icons-material/Camera';
import UploadImageComponent from "../../global/Componentes/UploadImagenComponent/UploadImageComponent";
import Swal from 'sweetalert2';
import { ColumnTypeI, optionsI, optionsTypeI, ColumnTypeI2 } from "../../global/Interfaces/Interfaces";

import Form from "./Form/Form";




type UsuariosType = {
    jwt:string,
}

interface stateInterface {
    Form:
        {
            id: number;
            nombre: string;
            apellidoPaterno: string;
            apellidoMaterno: string;
            Correo: string;
            celular: number;
            Master: boolean;
            rolID: number;
        }
  }

  interface Usuario {
    usuarioID: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correoElectronico: string;
    telefono: number;
    bloqueado: boolean;
    masterUser: boolean;
    nombreCompleto: string; 
    rolID: number;
}

  interface Seguro{
    aseguradora : string;
    direccion: string;
    fechaCreacion : Date;
    fechaModificacion : Date;
    observaciones : string,
    seguroID : number;
    usuarioCreacionID : number;
    usuarioModificacion: number;
  }


const Seguros = (props: UsuariosType) => {

    const [UsuarioID, setUsuarioID] = useState<number>(0);
    const [state, setState] = useState<stateInterface>({
        Form:
        {
            id: 0,
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            Correo: '',
            celular: 0,
            Master: false,
            rolID: 0,
        }
    })
    const [mostrar, setMostrar] = useState<boolean>(false)
    const [Data, setData] = useState<Seguro[]>([]); 
    const [loading, setLoading] = useState<boolean>(false);


    const GetUsuarios = () => {
        setLoading(true)
        Funciones.GetSeguros(props.jwt)
            .then((res: any) => {
                console.log("estos son los seguros:", res)
                setLoading(false)
    
                const updatedData = res.data.map((usuario: any) => ({
                    ...usuario,
                    nombreCompleto: `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`
                }));
    
                setData([...updatedData]); 
            })
            .catch((err: string) => {
                setLoading(false)
            })
    }

    const fnAgregar = () => {
        setMostrar(true);
        setState((s) => ({
            ...s, Form:
            {
                id: 0,
                nombre: '',
                apellidoPaterno: '',
                apellidoMaterno: '',
                Correo: '',
                celular: 0,
                Master: false,
                rolID: 0,

            }
        }))
        setUsuarioID(0)

    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, userID: number) => {
        const file = e.target.files && e.target.files[0];
    
        if (file) {
            const reader: FileReader = new FileReader();
    
            reader.onloadend = () => {
                const base64Image: string = reader.result as string;
    
                Funciones.UpdateFotoUsuario({ id: userID, foto: base64Image })
                .then((res: any) => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "La foto de perfil ha sido seleccionada con éxito",
                        showConfirmButton: false,
                        timer: 1000
                    });
                })
                .catch((err: string) => {
                    console.log(err);
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Algo salio mal",
                        showConfirmButton: false,
                        timer: 1000
                    });
                });
            };
    
            reader.readAsDataURL(file);
        }
    };
    
/* 
    const fnSetDatosUsuario = (value: any, tableMeta: any) => {
        const usuario = Data.find((usuario: any) => usuario.usuarioID === tableMeta.rowData[0]);
    
        if (usuario) {
            setState((prevState) => ({
                ...prevState,
                Form: {
                    ...prevState.Form,
                    id: tableMeta.rowData[0],
                    nombre: usuario.nombre,
                    apellidoPaterno: usuario.apellidoPaterno,
                    apellidoMaterno: usuario.apellidoMaterno,
                    celular: usuario.telefono,
                    Correo: usuario.correoElectronico,
                    Master: usuario.masterUser,
                    rolId: usuario.rolID
                }
            }));
    
            setUsuarioID(tableMeta.rowData[0]);
            setMostrar(true);
        }
    }; */
    

    const options: optionsTypeI = {
        filterType: 'dropdown',
        responsive: 'simple', 
        rowsPerPage: 4,
        rowsPerPageOptions: [10, 20, 50, 100],
        scrollX: true,
        selectableRows: 'none',
    };

    const Columns: ColumnTypeI2[] = [
        {
            name: 'aseguradora',
            label: 'Nombre Seguro'
        },
        {
            name: 'direccion',
            label: 'Direccion'
        },
        {
            name: 'fechaCreacion',
            label: 'Fecha de Creación'
        },
        {
            name: 'fechaModificacion',
            label: 'Fecha Modificación',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex: number) => {
                    const state = Data[dataIndex].fechaModificacion;
                    let column: JSX.Element = <></>;
                    switch (state) {
                        case null:
                           column = <span>Sin Modificar</span> 
                            break;
                    
                        default:
                            column = <span>{`${state}`}</span> 
                            break;
                    }
                    return column
                }
            }
        },
        {
            name: 'observaciones',
            label: 'Observaciones',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex: number) => {
                    const state = Data[dataIndex].observaciones;
                    let column: JSX.Element = <></>;
                    switch (state) {
                        case null:
                           column = <span>Sin Observaciones</span> 
                            break;
                    
                        default:
                            column = <span>{`${state}`}</span> 
                            break;
                    }
                    return column
                }
            }
        },
        {
            name: 'nombre',
            label: 'Creado Por'
        },
        {
            name: 'usuarioModificacion',
            label: 'Modificado Por',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex: number) => {
                    const state = Data[dataIndex].usuarioModificacion;
                    let column: JSX.Element = <></>;
                    switch (state) {
                        case null:
                           column = <span>Sin modificaciones</span> 
                            break;
                    
                        default:
                            column = <span>{`${state}`}</span> 
                            break;
                    }
                    return column
                }
            }
        },
        {
            name: "Modificar",
            label: 'Modificar',
            options: {
                filter: true,
                customBodyRender: (_value: any, tableMeta: { rowData: any; }) => {
                    return (
                            <IconButton /* onClick={() => { setMostrar(true)
                                fnSetDatosUsuario(_value, tableMeta) }}  */aria-label="delete" color="primary">
                            <AutoFixHighIcon />
                        </IconButton>
                    );
                }
            }
        },


    ]
    const fnCerrar = () => {
        setMostrar(false)
        setUsuarioID(0)
    }
    useEffect(() => {
        GetUsuarios();
       
    }, [])


    return (
        <Paper className="animate__animated animate__fadeInRight" style={{ width: '100%', height: '95%' }}>
        <TableContainer style={{ width: '100%', height: '90%' }}>
                  {!loading &&
                <div style={{ backgroundColor: 'white', paddingBottom: '1rem', paddingTop: '1rem', margin: '1.5rem', borderRadius: '1rem' }}>
                    <Typography style={{fontSize: '2rem', margin: '1rem', fontFamily: 'sans-serif', display:'inline-block'}} variant="h1" gutterBottom>Seguros 
                        <Breadcrumbs style={{float: 'right', display:'flex', padding:'10pt', marginTop: '-3pt' ,marginLeft: '10pt', borderRadius: '10pt' ,backgroundColor: 'rgb(241 241 241)'}} aria-label="breadcrumb">
                            <Typography>Inicio</Typography> 
                            <Typography>Consultar</Typography> 
                        </Breadcrumbs>
                    </Typography>
                        <div style={{ margin: '0.4rem', paddingLeft:'12pt' ,display: 'flex', justifyContent: 'space-between' }}> 
                            
                               {/*  <Fab onClick={() => fnAgregar()} color="primary" aria-label="add">
                                    <AddIcon />
                                </Fab> */}
                                <Button onClick={() => fnAgregar()} style={{backgroundColor:'#03294a'}} variant="contained" startIcon={<Create />}>Alta de Seguro</Button>
                            
                        </div>
                </div>
                }
                
                {!loading &&
          <div style={{ marginLeft: '2rem',marginRight: '2rem', height: '80%', paddingLeft: 0, paddingRight: 0 }}>
          <MUIDataTable columns={Columns}
                            data={Data}
                            title={"Usuarios"}
                            options={options} />
                    </div>
                }
                {loading &&
                    <Stack >
                        <Skeleton className="skeleton1"
                            variant="rounded"
                            animation="wave"
                            height={210}
                        />

                        <Skeleton className="skeleton2"
                            variant="rounded"
                            animation="wave"
                            height={550}
                        />
                    </Stack>
                }

                {mostrar &&
                    
                    <Form
                    Mostrar={mostrar}
                    onClose={()=>setMostrar(!mostrar)}
                    />
                }
                
            </TableContainer>
        </Paper>



    )
}

export default Seguros;   