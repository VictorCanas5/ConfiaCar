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
         InputLabel
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useFormik } from "formik";
import * as Yup from 'yup'
import * as Funciones from '../Funciones'
import Swal from 'sweetalert2';
import { useEffect, useState, useRef } from "react";
import TextComponent from "../../../global/Componentes/TextComponent.tsx/TextComponent";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';


type FormType = {
  Jwt: string,
  Placas: any,
  DocumentoID: any,
  Mostrar: boolean,
  fnCerrar(item: any): any,
}

function PlacasForm(props: FormType) {

  const [fechaVigencia, setFechaVigencia] = useState(dayjs('')); 
  const [fechaRenovacion, setFechaRenovacion] = useState(dayjs(''));
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(''));
  const [mostrar, setMostrar] = useState(false);


  const handleFechaVigenciaChange = (newValue: Dayjs | null) => {
    if (newValue !== null) {
      setFechaVigencia(newValue); 
      formik.setFieldValue('fechaVigencia', newValue.format('YYYY-MM-DD')); 
    }
  };
  
  const handleFechaRenovacionChange = (newValue: Dayjs | null) => {
    if (newValue !== null) {
      setFechaRenovacion(newValue); 
      formik.setFieldValue('fechaRenovacion', newValue.format('YYYY-MM-DD'));
    }
  };

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

  const formik = useFormik({
    initialValues: {
      placaID: 0,
      numeroPlaca: "",
      dueño: "",
      fechaVigencia: "",
      fechaRenovacion: "", 
      documentoID: 0,
    },

    onSubmit: (values) => {
      console.log("estos son los valores:", values)
      Funciones.InsertPlaca(props.DocumentoID, props.Jwt, values)
        .then((res: any) => {
          props.Placas();
          setMostrar(true);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Las placas han sido insertadas con éxito",
            showConfirmButton: false,
            timer: 1000
          });
          props.fnCerrar(true);
        })
        .catch((err: any) => {
          props.fnCerrar(true);
          console.log(err);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Algo salió mal",
            showConfirmButton: false,
            timer: 1000
          });
        })
    },
  });

  useEffect(() => {
    console.log("Este es mi documentoID", props.DocumentoID);
  }, []);

  return (
    <Dialog
      style={styles.root}
      fullWidth
      maxWidth="sm"
      open={props.Mostrar}
      onClose={props.fnCerrar}
    >
      <DialogContent style={styles.padding}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container direction="row" style={styles.mainHeader}>
                <Grid item xs={8}>
                  <Typography style={styles.primaryColor} variant="h5">
                    Añadir Placas
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    style={styles.primaryColor}
                    variant="subtitle1"
                    align="right"
                  >
                    Ingrese los datos
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                direction="column"
                style={styles.mainContent}
                spacing={1}
              >
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    type="text"
                    label="Numero Placa"
                    id="numeroPlaca"
                    name="numeroPlaca"
                    value={formik.values.numeroPlaca}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.numeroPlaca && Boolean(formik.errors.numeroPlaca)}
                    helperText={formik.touched.numeroPlaca && formik.errors.numeroPlaca}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    type="text"
                    label="Dueño"
                    id="dueño"
                    name="dueño"
                    value={formik.values.dueño}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.dueño && Boolean(formik.errors.dueño)}
                    helperText={formik.touched.dueño && formik.errors.dueño}
                  />
                </Grid>

                <br />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                      label="Fecha Vigencia"
                      value={fechaVigencia} 
                      onChange={handleFechaVigenciaChange} 
                    />
                    <DatePicker
                      label="Fecha Renovacion"
                      value={fechaRenovacion}
                      onChange={handleFechaRenovacionChange} 
                    />
                  </DemoContainer>
                </LocalizationProvider>


                <br /> 

                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item container>
                  <Grid item xs={2}>
                    <Button type="submit">Guardar</Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button onClick={props.fnCerrar} style={{ color: 'red' }}>Cancelar</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PlacasForm;