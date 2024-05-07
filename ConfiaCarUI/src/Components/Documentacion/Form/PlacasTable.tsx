import React from "react";
import { Dialog,
         DialogContent,
         Grid,
         Divider,
         Button,
         Typography,
         TextField,
         FormControlLabel,
         Switch,
         MenuItem,
         Select,
         FormControl,
         InputLabel,
         Skeleton, Stack
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { grey } from "@mui/material/colors";
import { useFormik } from "formik";
import * as Yup from 'yup'
import * as Funciones from '../Funciones'
import Swal from 'sweetalert2';
import { useEffect, useState, useRef } from "react";
import TextComponent from "../../../global/Componentes/TextComponent.tsx/TextComponent";
import { ColumnTypeI, optionsI, optionsTypeI, ColumnTypeI2 } from "../../../global/Interfaces/Interfaces";
import { Create } from "@mui/icons-material";
import PlacasForm from "../Form/PlacasForm";


type FormType = {
  Jwt:string,
  DocumentoID:any,
  Mostrar2: boolean,
  fnCerrar(item: any): any,
}

interface stateInterface {
  Form:
      {
          placaID: number;
          numeroPlaca: string;
          dueño: string;
          fechaVigencia: string;
          fechaRenovacion: string;
          documentoID: number;
      }
}

interface Placa {
  placaID: number;
  numeroPlaca: string;
  dueño: string;
  fechaVigencia: string;
  fechaRenovacion: string;
  documentoID: number;
}

function PlacasTable(props: FormType) {

  const [mostrar, setMostrar] = useState(false)
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user') || '{}'));
  const [loading, setLoading] = useState<boolean>(false);
  const [Data, setData] = useState<Placa[]>([]); 
  const [state, setState] = useState<stateInterface>({
    Form:
    {
      placaID: 0,
      numeroPlaca: "",
      dueño: "",
      fechaVigencia: "",
      fechaRenovacion: "",
      documentoID: 0,
    }
})

  const GetPlacas = () => {
    setLoading(true)
    Funciones.GetPlacas(props.DocumentoID, props.Jwt)
      .then((res: any) => {
        console.log("estas son las placas:", res.data)
        const placasWithFormattedDates = res.data.map((placa: any) => ({
          ...placa,
          fechaVigencia: new Date(placa.fechaVigencia).toLocaleDateString(),
          fechaRenovacion: new Date(placa.fechaRenovacion).toLocaleDateString()
        }));
        setLoading(false)
        setData(placasWithFormattedDates);
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
        placaID: 0,
        numeroPlaca: "",
        dueño: "",
        fechaVigencia: "",
        fechaRenovacion: "",
        documentoID: 0,
      }
  }))
  }


const styles = {
    root: {
      flexGrow: 1
    },
    primaryColor: {
      color: 'white'
    },
    secondaryColor: {
      color: grey[700]
    },

    padding: {
      padding: 0
    },
    mainHeader: {
      backgroundColor: '#002a4c',
      padding: 20,
      alignItems: "center"
    },
    mainContent: {
      padding: 40
    },
    secondaryContainer: {
      padding: "20px 25px",
      backgroundColor: 'black'
    }
  }


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
        name: 'placaID',
        label: 'Placa ID'
    },
    {
        name: 'numeroPlaca',
        label: 'Numero Placa'
    },
    {
        name: 'dueño',
        label: 'Dueño'
    },
    {
        name: 'fechaVigencia',
        label: 'Vigencia'
    },
    {
        name: 'fechaRenovacion',
        label: 'Renovacion'
    },
    {
      name: 'documentoID',
      label: 'Documento ID'
    },
  ]

  const fnCerrar = () => {
    setMostrar(false)
  }

  useEffect(() => {
    GetPlacas();
    console.log("este es mi documentoID: ", props.DocumentoID)
  }, []);


  return (
   <Dialog
      style={styles.root}
      fullWidth
      maxWidth="md"
      open={props.Mostrar2}
      onClose={props.fnCerrar}
    >
      <DialogContent style={styles.padding}>
      <form>
        <Grid container>
          <Grid item xs={12}>

            <Grid container direction="row" style={styles.mainHeader}>
              <Grid item xs={8}>
                <Typography style={styles.primaryColor} variant="h5">
                  Placas
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  style={styles.primaryColor}
                  variant="subtitle1"
                  align="right"
                >
                  Datos Placas
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              direction="column"
              style={styles.mainContent}
              spacing={1}
            >

                <div style={{ margin: '0.4rem', paddingLeft:'1.5rem', marginBottom:'2rem' ,display: 'flex', justifyContent: 'space-between' }}> 
                    <Button onClick={() => fnAgregar()} style={{backgroundColor:'#03294a'}} variant="contained" startIcon={<Create />}>Añadir Placa</Button>
                </div>


                {!loading &&
                    <div style={{ marginLeft: '2rem',marginRight: '2rem', height: '80%', paddingLeft: 0, paddingRight: 0 }}>
                    <MUIDataTable columns={Columns}
                            data={Data}
                            title={"Documentos"}
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
                    
                    <PlacasForm
                        Jwt={props.Jwt}
                        DocumentoID={props.DocumentoID}
                        fnCerrar={fnCerrar}
                        Mostrar={mostrar}
                        Placas={GetPlacas}
                    />

                }

            </Grid>


          </Grid>

        </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PlacasTable