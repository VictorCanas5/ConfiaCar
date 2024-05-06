import {
  Paper,
  TableContainer,
  Skeleton,
  Stack,
  Typography,
  Breadcrumbs,
  Button
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import * as Funciones from "./Funciones";
import { Create } from "@mui/icons-material";
import UpdateForm from "./Form/UpdateForm";

import {
  optionsTypeI,
  ColumnTypeI2,
} from "../../global/Interfaces/Interfaces";
import DocsForm from "./Form/DocsForm";

type ValuadoresType = {
  jwt: string;
};

interface stateInterface {
  Form: {
    id: number;
    nombre: string;
    apellidoPaterno: string;
    apelidoMaterno: string;
    Correo: string;
    celular: number;
    Master: boolean;
  };
}

const Vehiculos = (props: ValuadoresType) => {
  const [DataVehiculos, setDataVehiculos] = useState([]);

  const [UsuarioID, setUsuarioID] = useState<number>(0);
  const [state, setState] = useState<stateInterface>({
    Form: {
      id: 0,
      nombre: "",
      apellidoPaterno: "",
      apelidoMaterno: "",
      Correo: "",
      celular: 0,
      Master: false,
    },
  });
  const [mostrar, setMostrar] = useState<boolean>(false);
  const [mostrar2, setMostrar2] = useState<boolean>(false);
  const [vehiculoID, setVehiculoID] = useState<any>()
  // const [Data, setData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false);

  const GetVehiculosTabla = () => {
    setLoading(true);
    Funciones.GetVehiculos(props.jwt)
      .then((res: any) => {
        setLoading(false);
        setDataVehiculos(res.data);
      })
      .catch((err: string) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    GetVehiculosTabla();
  }, []);

  const LoadTimer = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const fnAgregar = () => {
    setMostrar(true);
    setState((s) => ({
      ...s,
      Form: {
        id: 0,
        nombre: "",
        apellidoPaterno: "",
        apelidoMaterno: "",
        Correo: "",
        celular: 0,
        Master: false,
      },
    }));
    setUsuarioID(0);
  };

  const fnSetDatosVh = (data: any) =>{
      const VehiculoID : any = DataVehiculos.find((vehiculo: any)=> vehiculo.vehiculoID === data.rowData[0])

      setVehiculoID(VehiculoID.vehiculoID)
      
  }

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    userID: number
  ) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader: FileReader = new FileReader();

      reader.onloadend = () => {
        const base64Image: string = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  };

  const fnSetDatosUsuario = (value: any, tableMeta: any) => {
    console.log("mostrar info de usuarios");

    // Funciones.GetUsuario(props.jwt, tableMeta.rowData[0])
    // .then((res: any) => {

    //     setState((s) => ({
    //         ...s, Form:
    //         {
    //             id: tableMeta.rowData[0],
    //             nombre: res.data.nombre,-
    //             apellidoPaterno: res.data.apellidoPaterno,
    //             apelidoMaterno: res.data.apellidoMaterno,
    //             celular: res.data.telefono,
    //             Correo: res.data.correoElectronico,
    //             Master: res.data.masterUser

    //         }
    //     }));

    // })
    // .catch((err: string) => {
    // })

    // setState((s) => ({
    //     ...s, Form:
    //     {
    //         id: tableMeta.rowData[0],
    //         nombre: tableMeta.rowData[1],
    //         apellidoPaterno: tableMeta.rowData[1],
    //         apelidoMaterno: tableMeta.rowData[1],
    //         celular: tableMeta.rowData[4],
    //         Correo: tableMeta.rowData[3],
    //         Master: tableMeta.rowData[6]

    //     }
    // }))
    // setUsuarioID(tableMeta.rowData[0])
    // setMostrar(true)
  };

  const options: optionsTypeI = {
    filterType: "dropdown",
    responsive: "simple",
    rowsPerPage: 4,
    rowsPerPageOptions: [10, 20, 50, 100],
    scrollX: true,
    selectableRows: "none",
  };

  const Columns: ColumnTypeI2[] = [
    {
      name: "vehiculoID",
      label: "ID",
    },
    /* {
      name: "documentoID",
      label: "Doc",
      options: {
        filter: true,
        customBodyRender: (_value: any, tableMeta: { rowData: any }) => {
          return (
            <Tooltip title="Documento del vehiculo" placement="top">
              <ArticleIcon
                onClick={() => {
                  setMostrar(false);
                  fnSetDatosUsuario(_value, tableMeta);
                }}
                style={{ cursor: "pointer" }}
                aria-label="delete"
                color="primary"
              >
                <AutoFixHighIcon />
              </ArticleIcon>
            </Tooltip>
          );
        },
      },
    }, */
    {
      name: "marca",
      label: "Marca",
    },
    {
      name: "modelo",
      label: "Modelo",
    },
    {
      name: "anio",
      label: "Año",
    },
    {
      name: "precioCompra",
      label: "Precio de Compra",
    },
    {
      name: "precioVenta",
      label: "Precio de Venta",
    },
    {
      name: "numeroSerie",
      label: "Numero de Serie",
    },
    {
      name: "placas",
      label: "Placas",
    },
    {
      name: "color",  
      label: "Color",
    },
    {
      name: "kilometraje",
      label: "Kilometraje",
    },
    {
      name: "transmision",
      label: "Transmisión",
    },
    {
      name: "noPuertas",
      label: "No. de puertas",
    },
    {
      name: "estado",
      label: "Estado",
    },
    {
      name: "procedencia",
      label: "Procedencia",
    },
    {
      name: "observaciones",
      label: "Observaciones",
    },
  
    {
      name: "datosVehiculo",
      label: "Documentos",
      options: {
        filter: true,
        customBodyRender: (_value: any, tableMeta: { rowData: any }) => {
         
          
          
          
          return (
            <>
              <Button variant="contained" color="primary" onClick={()=>{
                setMostrar2(!mostrar2); fnSetDatosVh(tableMeta)
                }} >Abrir</Button>
            </>
          );
        },
      },
    },
  ];

  const fnCerrar = () => {
    setMostrar(false);
    setUsuarioID(0);
  };
  useEffect(() => {
    // GetUsuarios();
    // LoadTimer();
  }, []);

  return (
    <Paper
      className="animate__animated animate__fadeInRight"
      style={{ width: "100%", height: "95%" }}
    >
      <TableContainer style={{ width: "100%", height: "90%" }}>
        {!loading &&
                <div style={{ backgroundColor: 'white', paddingBottom: '1rem', paddingTop: '1rem', margin: '1.5rem', borderRadius: '1rem' }}>
                    <Typography style={{fontSize: '2rem', margin: '1rem', fontFamily: 'sans-serif', display:'inline-block'}} variant="h1" gutterBottom>Catalogo de Vehiculos 
                        <Breadcrumbs style={{float: 'right', display:'flex', padding:'10pt', marginTop: '-3pt' ,marginLeft: '10pt', borderRadius: '10pt' ,backgroundColor: 'rgb(241 241 241)'}} aria-label="breadcrumb">
                            <Typography>Inicio</Typography> 
                            <Typography>Consultar</Typography> 
                        </Breadcrumbs>
                    </Typography>
                        <div style={{ margin: '0.4rem', paddingLeft:'12pt' ,display: 'flex', justifyContent: 'space-between' }}> 
                            
                               {/*  <Fab onClick={() => fnAgregar()} color="primary" aria-label="add">
                                    <AddIcon />
                                </Fab> */}
                                <Button onClick={() => fnAgregar()} style={{backgroundColor:'#03294a'}} variant="contained" startIcon={<Create />}>Vehiculo Nuevo</Button>
                            
                        </div>
                </div>
                }

        {!loading && (
          <div
            style={{
              marginLeft: "2rem",
              marginRight: "2rem",
              height: "80%",
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            <MUIDataTable
              columns={Columns}
              data={DataVehiculos}
              title={"Vehiculos"}
              options={options}
            />
          </div>
        )}
        {loading && (
          <Stack>
            <Skeleton
              className="skeleton1"
              variant="rounded"
              animation="wave"
              height={210}
            />

            <Skeleton
              className="skeleton2"
              variant="rounded"
              animation="wave"
              height={550}
            />
          </Stack>
        )}

        {mostrar && (
          <UpdateForm
            UsuarioID={UsuarioID}
            fnCerrar={fnCerrar}
            Mostrar={mostrar}
            onClose={()=>setMostrar(!mostrar)}
            Jwt={props.jwt}
            // Usuarios={GetUsuarios}
            Form={state.Form}
            GetLocal={undefined}
            setData={setDataVehiculos}
            data={DataVehiculos}
          />
        )}
        {mostrar2 && (
            <DocsForm
               
                Mostrar={mostrar2}
                onClose={()=>setMostrar2(!mostrar2)}
                Jwt={props.jwt}
                VehiculoID={vehiculoID}
                
            />
         )}
      </TableContainer>
    </Paper>
  );
};

export default Vehiculos;
