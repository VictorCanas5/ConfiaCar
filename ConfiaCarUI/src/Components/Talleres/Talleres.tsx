import { Paper, TableContainer, IconButton, Fab, CircularProgress, SpeedDial, SpeedDialAction, SpeedDialIcon, Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import * as Funciones from "./Funciones";
import { EditFilled } from "@ant-design/icons";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import '../../global/styles/GlobalStyles.css'
import CarRepairIcon from '@mui/icons-material/CarRepair';
import BuildIcon from '@mui/icons-material/Build';
import { ColumnTypeI, optionsI, optionsTypeI } from "../../global/Interfaces/Interfaces";
import UpdateForm from "./Form/UpdateForm";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Create } from "@mui/icons-material";



type TypeTalleres = {
  jwt: string
};


interface stateInterface {
  Form:
      {
          id: number;
          nombre: string;
          direccion: string;
          telefono: number;
          contacto: string;
          horarioApertura: string;
          horarioCierre: string;
      }
}

interface Taller {
  tallerID: number;
  nombre: string;
  direccion: string;
  telefono: number;
  contacto: string;
  horarioApertura: string;
  horarioCierre: string;
}



const Talleres = (props: TypeTalleres) => {

  const [TallerID, setTallerID] = useState<number>(0);
  const [state, setState] = useState<stateInterface>({
      Form:
      {
        id: 0,
        nombre: "",
        direccion: "",
        telefono: 0,
        contacto: "",
        horarioApertura: "",
        horarioCierre: ""
      }
  })

  const [open, setOpen] = useState<boolean>(false);
  const [Data, setData] = useState<Taller[]>([]); 
  const [loading, setLoading] = useState<boolean>(false);
  const [mostrar, setMostrar] = useState<boolean>(false);

  const [openSpeedDial, setOpenSpeedDial] = useState<boolean>(false);

  const desplegarSpeedDial = (e: any) :void => {
    setOpenSpeedDial(!openSpeedDial);
  };
  const handleOpen = () : void => setOpen(true);
  const handleClose = () : void => setOpen(false);



  const GetTalleres = () => {
    setLoading(true);
    Funciones.GetTalleres(props.jwt)
        .then((res: any) => {
            console.log("estos son los talleres:", res.data);
            setLoading(false);

            const newData = res.data.map((taller: Taller) => ({
                ...taller,
                horarioApertura: taller.horarioApertura.split('T')[1].split(':')[0] + ':' + taller.horarioApertura.split('T')[1].split(':')[1],
                horarioCierre: taller.horarioCierre.split('T')[1].split(':')[0] + ':' + taller.horarioCierre.split('T')[1].split(':')[1]
            }));

            setData(newData);
        })
        .catch((err: string) => {
            setLoading(false);
        });
};


  const fnSetDatosTaller = (value: any, tableMeta: any) => {

    setState((prevState) => ({
        ...prevState,
        Form: {
            ...prevState.Form,
            id: tableMeta.rowData[0],
            nombre: tableMeta.rowData[1],
            direccion: tableMeta.rowData[2],
            telefono: tableMeta.rowData[3],
            contacto: tableMeta.rowData[4],
            horarioApertura: tableMeta.rowData[5],
            horarioCierre: tableMeta.rowData[6]
        }
    }));

    setTallerID(tableMeta.rowData[0]);
    setMostrar(true);
};

  const fnAgregar = () => {
    setMostrar(true);
    setState((s) => ({
        ...s, Form:
        {
          id: 0,
          nombre: "",
          direccion: "",
          telefono: 0,
          contacto: "",
          horarioApertura: "",
          horarioCierre: ""
        }
    }))
    setTallerID(0)

}


  const options: optionsTypeI = {
    filterType: 'dropdown',
    responsive: 'standard', 
    rowsPerPage: 4,
    rowsPerPageOptions: [10, 20, 50, 100],
    scrollX: true,
    selectableRows: 'none',
  };


  // const Data = [
  //   { 
  //     tallerID: 1, 
  //     nombreTaller: 'Taller 1', 
  //     direccion: 'Calle 123', 
  //     telefono: '123-456-7890', 
  //     contacto: 'Juan', 
  //     horarioApertura: '9:00 AM', 
  //     horarioCierre: '6:00 PM' 
  //   },
  //   { 
  //     tallerID: 2, 
  //     nombreTaller: 'Taller 2', 
  //     direccion: 'Avenida 456', 
  //     telefono: '987-654-3210', 
  //     contacto: 'Pedro', 
  //     horarioApertura: '8:00 AM', 
  //     horarioCierre: '5:00 PM' 
  //   },
  // ];


  const Columns: ColumnTypeI[] = [
    {
        name: 'tallerID',
        label: 'ID'
    },
    {
        name: 'nombreTaller',
        label: 'Nombre Taller'
    },
    {
        name: 'direccion',
        label: 'Direccion'
    },
    {
      name: 'telefono',
      label: 'Telefono'
    },
    {
      name: 'contacto',
      label: 'Contacto'
    },
    {
      name: 'horarioApertura',
      label: 'Horario Apertura'
    },
    {
      name: 'horarioCierre',
      label: 'Horario Cierre'
    },
    {
      name: "Modificar",
      label: 'Modificar',
      options: {
          filter: true,
          customBodyRender: (_value: any, tableMeta: { rowData: any; }) => {
              return (
                      <IconButton onClick={() => { setMostrar(true)
                          fnSetDatosTaller(_value, tableMeta) }} aria-label="delete" color="primary">
                      <AutoFixHighIcon />
                  </IconButton>
              );
          }
      }
  },

];


  const ColumnsAvales: ColumnTypeI[] = [
      {
          name: 'avalID',
          label: 'Id'
      },
      {
          name: 'nombreCompleto',
          label: 'Nombre Aval'
      },
      {
          name: 'descripcionaval',
          label: 'Tipo Aval'
      },
      {
        name: 'nombreCompletoSocia',
        label: 'Nombre Socia'
      }

  ];

  const fnCerrar = () => {
    setMostrar(false)
    setTallerID(0)
  }

  useEffect(() => {
    GetTalleres();
    // Funciones();
  }, []);


 
  return (
    <Paper className="animate__animated animate__fadeInRight" style={{ width: '100%', height: '100%' }}>
      <TableContainer style={{ width: '100%', height: '90%' }}>

        {!loading &&
          <div style={{ backgroundColor: 'rgb(241 241 241)', paddingBottom: '1rem', paddingTop: '1rem', margin: '1.5rem', borderRadius: '1rem' }}>
            <div style={{ fontSize: '2rem', margin: '1rem', fontFamily: 'sans-serif' }}>
              <strong style={{ fontSize: '2rem', margin: '1rem', fontFamily: 'sans-serif' }}>Talleres/Servicios</strong>
            </div>

              <div style={{ margin: '2rem', display: 'flex', justifyContent: 'space-between', marginTop: '-4%' }}>
                <div style={{ display: 'flex' }}>
                </div>
                <div>
                

                    <SpeedDial
                        FabProps={{ style: { backgroundColor: '#353b48' } }}
                        title="Talleres"
                        onClick={desplegarSpeedDial}
                        // open={openSpeedDial}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        open={open}
                        direction="left"
                        ariaLabel="Talleres"
                        sx={{ bottom: '16', right: '16' }}
                        icon={<SpeedDialIcon  />}
                    >


                      <SpeedDialAction
                        aria-disabled
                        icon={<CarRepairIcon color="secondary" />}
                        tooltipTitle='Talleres'
                        aria-expanded={false}
                        onClick={() => setMostrar(true)} 
                      />

                      <SpeedDialAction
                        aria-disabled
                        icon={<BuildIcon color="warning" />}
                        tooltipTitle='Servicios'
                        aria-expanded={false}
                        onClick={() => setMostrar(true)} 
                      />

                    </SpeedDial>
                </div>
            </div>

            <div style={{ margin: '0.4rem', paddingLeft:'12pt' ,display: 'flex', justifyContent: 'space-between' }}> 
                            
              <Button onClick={() => fnAgregar()} style={{backgroundColor:'#03294a'}} variant="contained" startIcon={<Create />}>Añadir Taller</Button>
                
            </div>

          </div>
        } 


        {!loading &&
          <div style={{ marginLeft: '2rem',marginRight: '2rem', height: '70%', paddingLeft: 0, paddingRight: 0 }}>
            <MUIDataTable
                columns={Columns}
                data={Data}
                title={"Socias cuentas"}
                options={options} 
            />
          </div>
          
        }

        {/* {infoAvales && !loading &&
                  <div style={{ marginLeft: '2rem',marginRight: '2rem', height: '70%', paddingLeft: 0, paddingRight: 0 }}>
                  <MUIDataTable
                      columns={ColumnsAvales}
                      data={Data}
                      title={"Avales"}
                      options={options} />
                  </div>
        } */}


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
                TallerID={TallerID}
                fnCerrar={fnCerrar}
                Mostrar={mostrar}
                Talleres={GetTalleres}
                Form={state.Form} 
                GetLocal={undefined} 
                setData={setData}
                data={Data}
            />
        }





      </TableContainer>
    </Paper>
  )



}

export default Talleres;   