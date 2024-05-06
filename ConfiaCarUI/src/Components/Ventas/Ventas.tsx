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
import { DBConfiaCar_Seguridad } from "../../interfaces_db/DBConfiaCar/Seguridad";
import Form from "./Form/Form";
import CarCrashIcon from '@mui/icons-material/CarCrash';



type DocumentosType = {
    jwt:string,
}

interface stateInterface {
    Form:
        {
            documentoID: number;
            vehiculoID: number;
            nombreDocumento: string;
            rutaDocumento: string;
            observaciones: string;
        }
  }


  interface Usuario {
    documentoID: number;
    vehiculoID: number;
    nombreDocumento: string;
    rutaDocumento: string;
    observaciones: string;
}


const Ventas = (props: DocumentosType) => {

    const [DocumentoID, setDocumentoID] = useState<number>(0);
    const [state, setState] = useState<stateInterface>({
        Form:
        {
            documentoID: 0,
            vehiculoID: 0,
            nombreDocumento: "",
            rutaDocumento: "",
            observaciones: "",
        }
    })
    const [mostrar, setMostrar] = useState<boolean>(false)
    const [Data, setData] = useState<Usuario[]>([]); 
    const [loading, setLoading] = useState<boolean>(false);


    const GetCreditos = () => {
        setLoading(true)
        Funciones.GetCreditos(props.jwt)
            .then((res: any) => {
                console.log("estos son los clientes:", res.data)
                setLoading(false)
                setData(res.data);
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
                documentoID: 0,
                vehiculoID: 0,
                nombreDocumento: "",
                rutaDocumento: "",
                observaciones: "",
            }
        }))
        setDocumentoID(0)

    }

    const fnSetDatosDocumento = (value: any, tableMeta: any) => {
        const documento = Data.find((documento: any) => documento.documentoID === tableMeta.rowData[0]);
    
        if (documento) {
            setState((prevState) => ({
                ...prevState,
                Form: {
                    ...prevState.Form,
                    documentoID: tableMeta.rowData[0],
                    vehiculoID: documento.vehiculoID,
                    nombreDocumento: documento.nombreDocumento,
                    rutaDocumento: documento.rutaDocumento,
                    observaciones: documento.observaciones,
                }
            }));
    
            setDocumentoID(tableMeta.rowData[0]);
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
            name: 'creditoID',
            label: 'Credito ID'
        },
        {
            name: 'vehiculoID',
            label: 'Vehiculo ID'
        },
        {
            name: 'clienteID',
            label: 'Cliente ID'
        },
        {
            name: 'usuarioID',
            label: 'Usuario ID'
        },
        {
            name: 'estatusCredito',
            label: 'Estatus Credito'
        },
        {
            name: 'abonos',
            label: 'Abonos'
        },
        {
            name: 'total',
            label: 'Total'
        },
        {
            name: 'plazos',
            label: 'Plazos'
        },
        {
            name: 'plazoActual',
            label: 'Plazo Actual'
        },
        {
            name: 'plazoActual',
            label: 'Plazo Actual'
        },
        {
            name: 'plazoActual',
            label: 'Plazo Actual'
        },
        {
            name: 'plazoActual',
            label: 'Plazo Actual'
        },
        {
            name: 'plazoActual',
            label: 'Plazo Actual'
        },
        {
            name: 'plazoActual',
            label: 'Plazo Actual'
        },
        {
            name: "Modificar",
            label: 'Modificar',
            options: {
                filter: true,
                customBodyRender: (_value: any, tableMeta: { rowData: any; }) => {
                    return (
                            <IconButton onClick={() => { setMostrar(true)
                                fnSetDatosDocumento(_value, tableMeta) }} aria-label="delete" color="primary">
                            <AutoFixHighIcon />
                        </IconButton>
                    );
                }
            }
        },

    ]

    
    const fnCerrar = () => {
        setMostrar(false)
        setDocumentoID(0)
    }


    useEffect(() => {
        GetCreditos();
    }, [])


    return (
        <Paper className="animate__animated animate__fadeInRight" style={{ width: '100%', height: '95%' }}>
        <TableContainer style={{ width: '100%', height: '90%' }}>
            
                {!loading &&
                    <div style={{ backgroundColor: 'white', paddingBottom: '1rem', paddingTop: '1rem', margin: '1.5rem', borderRadius: '1rem' }}>

                        <Typography style={{fontSize: '2rem', margin: '1rem', fontFamily: 'sans-serif', display:'inline-block'}} variant="h1" gutterBottom>Ventas 
                            <Breadcrumbs style={{float: 'right', display:'flex', padding:'10pt', marginTop: '-3pt' ,marginLeft: '10pt', borderRadius: '10pt' ,backgroundColor: 'rgb(241 241 241)'}} aria-label="breadcrumb">
                                <Typography>Ventas</Typography> 
                                <Typography>Consultar</Typography> 
                            </Breadcrumbs>
                        </Typography>

                        <div style={{ margin: '0.4rem', paddingLeft:'12pt' ,display: 'flex', justifyContent: 'space-between' }}> 
                            <Button onClick={() => fnAgregar()} style={{backgroundColor:'#1B794C'}} variant="contained" startIcon={<Create />}>Realizar venta</Button>
                        </div>

                    </div>
                }
                
                {!loading &&
                    <div style={{ marginLeft: '2rem',marginRight: '2rem', height: '80%', paddingLeft: 0, paddingRight: 0 }}>
                    <MUIDataTable columns={Columns}
                            data={Data}
                            title={"Creditos"}
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
                        Jwt={props.jwt}
                        DocumentoID={DocumentoID}
                        fnCerrar={fnCerrar}
                        Mostrar={mostrar}
                        Documentos={GetCreditos}
                        Form={state.Form} GetLocal={undefined} 
                        setData={setData}
                        data={Data}
                    />

                }

            </TableContainer>
        </Paper>



    )
}

export default Ventas;   
