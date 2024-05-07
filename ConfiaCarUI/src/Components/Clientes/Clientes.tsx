import { Paper, TableContainer, IconButton, Fab, Skeleton, Stack, Typography, Breadcrumbs, Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import * as Funciones from "./Funciones";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import UpdateForm from "./Form/UpdateForm";
import AddIcon from '@mui/icons-material/Add';
import CameraIcon from '@mui/icons-material/Camera';
import UploadImageComponent from "../../global/Componentes/UploadImagenComponent/UploadImageComponent";
import Swal from 'sweetalert2';
import { ColumnTypeI, optionsI, optionsTypeI, ColumnTypeI2 } from "../../global/Interfaces/Interfaces";
import { DBConfiaCar_General } from "../../interfaces_db/DBConfiaCar/General";
import { Create } from "@mui/icons-material";




type ClientesType = {
    jwt:string,
}

interface stateInterface {
    Form:
        {
            idCliente:number,
            nombre: string,
            apellidoPaterno: string,
            apellidoMaterno: string,
            fechaNacimiento: string,
            lugarNacimiento: string
            curp: string,
            rfc: string,
            sexoID: string,
            estadoCivilID: string,
            ingresosMensuales: number,
            telefonoDomicilio: string,
            correoElectronico: string,
            telefonoMovil: string,
            buroInternoEstatusID: number,
            bloqueadoCliente: boolean
        }
  }


const Clientes = (props: ClientesType) => {


    const [clienteID, setClienteID] = useState<number>(0);
    const [state, setState] = useState<stateInterface>({
        Form:
        {
                idCliente: 0,
                nombre: "",
                apellidoPaterno: "",
                apellidoMaterno: "",
                fechaNacimiento: "",
                lugarNacimiento: "",
                curp: "",
                rfc: "",
                sexoID: "",
                estadoCivilID: "",
                ingresosMensuales: 0,
                telefonoDomicilio: "",
                correoElectronico: "",
                telefonoMovil: "",
                buroInternoEstatusID: 0,
                bloqueadoCliente: false
        }
    })
    const [mostrar, setMostrar] = useState<boolean>(false)
    const [Data, setData] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false);


    const GetClientes = () => {
        setLoading(true);
        Funciones.GetClientes(props.jwt)
            .then((res: any) => {
                console.log("estos son los clientes:", res.data);
                setLoading(false);
    
                const formattedData = res.data.map((cliente: any) => ({
                    ...cliente,
                    fechaNacimiento: new Date(cliente.fechaNacimiento).toLocaleDateString("es-MX")
                }));
    
                setData(formattedData);
            })
            .catch((err: string) => {
                setLoading(false);
            });
    };


    const fnAgregar = () => {
        setMostrar(true);
        setState((s) => ({
            ...s, Form:
            {
                idCliente: 0,
                nombre: "",
                apellidoPaterno: "",
                apellidoMaterno: "",
                fechaNacimiento: "",
                lugarNacimiento: "",
                curp: "",
                rfc: "",
                sexoID: "",
                estadoCivilID: "",
                ingresosMensuales: 0,
                telefonoDomicilio: "",
                correoElectronico: "",
                telefonoMovil: "",
                buroInternoEstatusID: 0,
                bloqueadoCliente: false

            }
        }))
        setClienteID(0)

    }


    const fnSetDatosCliente = (value: any, tableMeta: any) => {
        const cliente = Data.find((cliente: any) => cliente.clienteID === tableMeta.rowData[0]);
    
        if (cliente) {
            setState((prevState) => ({
                ...prevState,
                Form: {
                    ...prevState.Form,
                    idCliente: tableMeta.rowData[0],
                    nombre: cliente.nombre,
                    apellidoPaterno: cliente.apellidoPaterno,
                    apellidoMaterno: cliente.apellidoMaterno,
                    fechaNacimiento: cliente.fechaNacimiento,
                    lugarNacimiento: cliente.lugarNacimiento,
                    curp: cliente.curp,
                    rfc: cliente.rfc,
                    sexoID: cliente.sexoID,
                    estadoCivilID: cliente.estadoCivilID,
                    ingresosMensuales: cliente.ingresosMensuales,
                    telefonoDomicilio: cliente.telefonoDomicilio,
                    telefonoMovil: cliente.telefonoMovil,
                    correoElectronico: cliente.correoElectronico,
                    buroInternoEstatusID: cliente.buroInternoEstatusID,
                    bloqueadoCliente: cliente.bloqueadoCliente
                }
            }));
    
            setClienteID(tableMeta.rowData[0]);
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
            name: 'clienteID',
            label: 'ClienteID'
        },
        {
            name: "Modificar",
            label: 'Modificar',
            options: {
                filter: true,
                customBodyRender: (_value: any, tableMeta: { rowData: any; }) => {
                    return (
                            <IconButton onClick={() => { setMostrar(true)
                                fnSetDatosCliente(_value, tableMeta) }} aria-label="delete" color="primary">
                            <AutoFixHighIcon />
                        </IconButton>
                    );
                }
            }
        },
        {
            name: 'nombreCompleto',
            label: 'Nombre Cliente'
        },
        {
            name: 'bloqueadoCliente',
            label: 'Bloqueado',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex: number) => {
                    const state = Data[dataIndex].bloqueadoCliente;
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
        // {
        //     name: 'vendedorID',
        //     label: 'VendedorID'
        // },
        // {
        //     name: 'nombreVendedor',
        //     label: 'Nombre Vendedor'
        // },
        {
            name: 'fechaNacimiento',
            label: 'Fecha Nacimiento'
        },
        {
            name: 'telefonoMovil',
            label: 'Telefono Movil'
        },
        {
            name: 'telefonoDomicilio',
            label: 'Telefono Domicilio'
        },
        {
            name: 'lugarNacimiento',
            label: 'Lugar Nacimiento'
        },
        {
            name: 'curp',
            label: 'CURP'
        },
        {
            name: 'rfc',
            label: 'RFC'
        },
        {
            name: 'sexoID',
            label: 'Sexo'
        },
        {
            name: 'estadoCivilID',
            label: 'Estado Civil'
        },
        {
            name: 'ingresosMensuales',
            label: 'Ingresos Mensuales'
        },
        {
            name: 'correoElectronico',
            label: 'Correo'
        },
        



    ]
    const fnCerrar = () => {
        setMostrar(false)
        setClienteID(0)
    }
    useEffect(() => {
        GetClientes();
        // LoadTimer();
    }, [])


    return (
        <Paper className="animate__animated animate__fadeInRight" style={{ width: '100%', height: '95%' }}>
        <TableContainer style={{ width: '100%', height: '90%' }}>
                  
                {!loading &&

                    <div style={{ backgroundColor: 'white', paddingBottom: '1rem', paddingTop: '1rem', margin: '1.5rem', borderRadius: '1rem' }}>

                        <Typography style={{fontSize: '2rem', margin: '1rem', fontFamily: 'sans-serif', display:'inline-block'}} variant="h1" gutterBottom>Clientes 
                            <Breadcrumbs style={{float: 'right', display:'flex', padding:'10pt', marginTop: '-3pt' ,marginLeft: '10pt', borderRadius: '10pt' ,backgroundColor: 'rgb(241 241 241)'}} aria-label="breadcrumb">
                                <Typography>Clientes</Typography> 
                                <Typography>Consultar</Typography> 
                            </Breadcrumbs>
                        </Typography>

                        <div style={{ margin: '0.4rem', paddingLeft:'12pt' ,display: 'flex', justifyContent: 'space-between' }}> 
                            <Button onClick={() => fnAgregar()} style={{backgroundColor:'#03294a'}} variant="contained" startIcon={<Create />}>Crear Cliente</Button>
                        </div>

                    </div>
                }

                {!loading &&
                    <div style={{ marginLeft: '2rem',marginRight: '2rem', height: '80%', paddingLeft: 0, paddingRight: 0 }}>
                        <MUIDataTable 
                            columns={Columns}
                            data={Data}
                            title={"Usuarios"}
                            options={options} 
                        />
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
                    <UpdateForm
                        Jwt={props.jwt}
                        ClienteID={clienteID}
                        fnCerrar={fnCerrar}
                        Mostrar={mostrar}
                        Usuarios={GetClientes}
                        Form={state.Form} GetLocal={undefined} 
                        setData={setData}
                        data={Data}
                    />
                }
                
            </TableContainer>
        </Paper>



    )
}

export default Clientes;   