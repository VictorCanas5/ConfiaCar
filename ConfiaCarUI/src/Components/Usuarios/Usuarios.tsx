import { Paper, TableContainer, IconButton, Fab, Skeleton, Stack, Typography, Breadcrumbs, Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import * as Funciones from "./Funciones";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import UpdateForm from "./Form/UpdateForm";
import AddIcon from '@mui/icons-material/Add';
import { Create } from "@mui/icons-material";
import CameraIcon from '@mui/icons-material/Camera';
import UploadImageComponent from "../../global/Componentes/UploadImagenComponent/UploadImageComponent";
import Swal from 'sweetalert2';
import { ColumnTypeI, optionsI, optionsTypeI, ColumnTypeI2 } from "../../global/Interfaces/Interfaces";
import { DBConfiaCar_Seguridad } from "../../interfaces_db/DBConfiaCar/Seguridad";
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


const Usuarios = (props: UsuariosType) => {

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
    const [Data, setData] = useState<Usuario[]>([]); 
    const [loading, setLoading] = useState<boolean>(false);


    const GetUsuarios = () => {
        setLoading(true)
        Funciones.GetUsers(props.jwt)
            .then((res: any) => {
                console.log("estos son los usuarios:", res)
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
    };
    

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
            name: 'usuarioID',
            label: 'Id'
        },
        {
            name: 'nombreCompleto',
            label: 'Nombre'
        },
        {
            name: 'correoElectronico',
            label: 'Correo/Usuario'
        },
        {
            name: 'telefono',
            label: 'Telefono'
        },
        {
            name: 'rolID',
            label: 'Rol de Usuario',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex: number) => {
                    const state = Data[dataIndex].rolID;
                    let column: JSX.Element = <></>;
                    switch (state) {
                        case 1:
                           column = <span>COMPRADOR</span> 
                            break;
                        case 2:
                            column = <span>VENDEDOR</span>  
                            break;
                    
                        default:
                            break;
                    }
                    return column
                }
            }
        },
        {
            name: 'bloqueado',
            label: 'Bloqueado',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex: number) => {
                    const state = Data[dataIndex].bloqueado;
                    if (state == true) {
                        return (    
                            <div className="operating">
                                <strong style={{ color: 'red' }}>Bloqueado</strong>
                            </div>
                        );
                    } else {
                        return (
                            <div className="maintenance">
                                <strong style={{ color: 'green' }}>Activo</strong>
                            </div>
                        );
                    }
                }
            }

        },
        {
            name: 'masterUser',
            label: 'Master',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex: number) => {
                    const state = Data[dataIndex].masterUser;
                    if (state == true) {
                        return (
                            <div className="operating">
                                <strong style={{ color: 'green' }}>SI</strong>
                            </div>
                        );
                    } else {
                        return (
                            <div className="maintenance">
                                <strong style={{ color: 'red' }}>NO</strong>
                            </div>
                        );
                    }
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
                            <IconButton onClick={() => { setMostrar(true)
                                fnSetDatosUsuario(_value, tableMeta) }} aria-label="delete" color="primary">
                            <AutoFixHighIcon />
                        </IconButton>
                    );
                }
            }
        },
        {
            name: "Foto de perfil",
            label: 'foto',
            options: {
                filter: true,
                customBodyRender: (_value: any, tableMeta: { rowIndex: number, rowData: any[] }) => (
                    <label htmlFor={`file-input-${tableMeta.rowIndex}`} style={{ position: 'relative' }}>
                        <IconButton component="span" aria-label="upload" color="primary">
                            <CameraIcon />
                        </IconButton>
                        <input
                            type="file"
                            accept="image/*"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '0%',
                                height: '0%',
                                opacity: 0,
                                cursor: 'pointer',
                            }}
                            id={`file-input-${tableMeta.rowIndex}`}
                            onChange={(e) => handleImageChange(e, tableMeta.rowIndex, tableMeta.rowData[0])}
                        />
                    </label>
                ),
            },
        },


    ]
    const fnCerrar = () => {
        setMostrar(false)
        setUsuarioID(0)
    }
    useEffect(() => {
        GetUsuarios();
        console.log("este es el token que recibo: ", props.jwt);
    }, [])


    return (
        <Paper className="animate__animated animate__fadeInRight" style={{ width: '100%', height: '95%' }}>
        <TableContainer style={{ width: '100%', height: '90%' }}>
                  {!loading &&
                <div style={{ backgroundColor: 'white', paddingBottom: '1rem', paddingTop: '1rem', margin: '1.5rem', borderRadius: '1rem' }}>
                    <Typography style={{fontSize: '2rem', margin: '1rem', fontFamily: 'sans-serif', display:'inline-block'}} variant="h1" gutterBottom>Usuarios 
                        <Breadcrumbs style={{float: 'right', display:'flex', padding:'10pt', marginTop: '-3pt' ,marginLeft: '10pt', borderRadius: '10pt' ,backgroundColor: 'rgb(241 241 241)'}} aria-label="breadcrumb">
                            <Typography>Usuarios</Typography> 
                            <Typography>Consultar</Typography> 
                        </Breadcrumbs>
                    </Typography>
                        <div style={{ margin: '0.4rem', paddingLeft:'12pt' ,display: 'flex', justifyContent: 'space-between' }}> 
                            
                               {/*  <Fab onClick={() => fnAgregar()} color="primary" aria-label="add">
                                    <AddIcon />
                                </Fab> */}
                                <Button onClick={() => fnAgregar()} style={{backgroundColor:'#03294a'}} variant="contained" startIcon={<Create />}>Crear Usuario</Button>
                            
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

export default Usuarios;   
