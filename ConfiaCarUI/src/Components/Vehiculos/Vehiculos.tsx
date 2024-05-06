import {
  Paper,
  TableContainer,
  IconButton,
  Fab,
  Skeleton,
  Stack,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import * as Funciones from "./Funciones";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FileUploadIcon from "@mui/icons-material/FileUpload";
//import UpdateForm from "./Form/UpdateForm";
import AddIcon from "@mui/icons-material/Add";
import CameraIcon from "@mui/icons-material/Camera";
import UploadImageComponent from "../../global/Componentes/UploadImagenComponent/UploadImageComponent";
import Swal from "sweetalert2";
import {
  ColumnTypeI,
  optionsI,
  optionsTypeI,
  ColumnTypeI2,
} from "../../global/Interfaces/Interfaces";
import ArticleIcon from "@mui/icons-material/Article";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Tooltip from "@mui/material/Tooltip";

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
      label: "Id",
    },
    {
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
    },
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
      name: "FechaUltimoMantenimiento",
      label: "Mantenimiento",
      options: {
        filter: true,
        customBodyRender: (_value: any, tableMeta: { rowData: any }) => {
          return (
            <>
              {_value == undefined ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span>00/00/00</span>
                  <Tooltip title="Nuevo Mantenimiento" placement="top">
                    <AddCircleOutlineIcon
                      color="success"
                      style={{
                        width: "15px",
                        cursor: "pointer",
                        marginLeft: "5px",
                      }}
                    ></AddCircleOutlineIcon>
                  </Tooltip>
                </div>
              ) : (
                <CarRepairIcon
                  onClick={() => {
                    setMostrar(false);
                    fnSetDatosUsuario(_value, tableMeta);
                  }}
                  aria-label="delete"
                  color="primary"
                >
                  <AutoFixHighIcon />
                </CarRepairIcon>
              )}
            </>
          );
        },
      },
    },
    {
      name: "polizaID",
      label: "Poliza",
      options: {
        filter: true,
        customBodyRender: (_value: any, tableMeta: { rowData: any }) => {
          return (
            <>
              {_value == undefined ? (
                <>
                  <span>Sin poliza</span>
                  <AddCircleOutlineIcon
                    color="success"
                    style={{
                      width: "15px",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                  ></AddCircleOutlineIcon>
                </>
              ) : (
                <Tooltip title="Poliza de seguro" placement="top">
                  <CarCrashIcon
                    onClick={() => {
                      setMostrar(false);
                      fnSetDatosUsuario(_value, tableMeta);
                    }}
                    style={{ cursor: "pointer" }}
                    aria-label="delete"
                    color="primary"
                  ></CarCrashIcon>
                </Tooltip>
              )}
            </>
          );
        },
      },
    },
    {
      name: "vehiculoID",
      label: "Fotos Vehiculo",
      options: {
        filter: true,
        customBodyRender: (_value: any, tableMeta: { rowData: any }) => {
          return (
            <>
              {_value > 0 ? (
                <span>Sin Fotos</span>
              ) : (
                <DirectionsCarIcon
                  onClick={() => {
                    setMostrar(false);
                    fnSetDatosUsuario(_value, tableMeta);
                  }}
                  aria-label="delete"
                  color="primary"
                ></DirectionsCarIcon>
              )}
            </>
          );
        },
      },
    },
    {
      name: "kilometraje",
      label: "Kilometraje",
    },
    {
      name: "precioCompra",
      label: "Precio Compra",
    },
    {
      name: "precioVenta",
      label: "Precio Venta",
    },
    // {
    //   name: "disponibilidad",
    //   label: "Disponibilidad",
    //   options: {
    //     filter: true,
    //     customBodyRenderLite: (dataIndex: number) => {
    //       const state = DataVehiculos[dataIndex].disponibilidad;
    //       if (state == true) {
    //         return (
    //           <div className="operating">
    //             <strong style={{ color: "green" }}>DISPONIBLE</strong>
    //           </div>
    //         );
    //       } else {
    //         return (
    //           <div className="maintenance">
    //             <strong style={{ color: "red" }}>NO DISPONIBLE</strong>
    //           </div>
    //         );
    //       }
    //     },
    //   },
    // },
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
        {!loading && (
          <div
            style={{
              backgroundColor: "rgb(241 241 241)",
              paddingBottom: "1rem",
              paddingTop: "1rem",
              margin: "1.5rem",
              borderRadius: "1rem",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                margin: "1rem",
                fontFamily: "sans-serif",
              }}
            >
              <strong
                style={{
                  fontSize: "2rem",
                  margin: "1rem",
                  fontFamily: "sans-serif",
                }}
              >
                Vehiculos
              </strong>
            </div>
            <button>Nuevo Vehiculo</button>
          </div>
        )}

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

        {/* {mostrar && (
          <UpdateForm
            UsuarioID={UsuarioID}
            fnCerrar={fnCerrar}
            Mostrar={mostrar}
            // Usuarios={GetUsuarios}
            Form={state.Form}
            GetLocal={undefined}
            setData={setDataVehiculos}
            data={DataVehiculos}
          />
        )} */}
      </TableContainer>
    </Paper>
  );
};

export default Vehiculos;
