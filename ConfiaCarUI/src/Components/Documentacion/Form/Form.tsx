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
import { optionsI } from "../../../global/Interfaces/Interfaces";
import { SelectChangeEvent } from '@mui/material';


type FormType = {
  Jwt:string,
  Documentos:any,
  DocumentoID:any,
  Mostrar: boolean,
  fnCerrar(item: any): any,
  GetLocal: any,
  Form:any,
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  data: any[];
}

function Form(props: FormType) {

  const [mostrar, setMostrar] = useState(false)
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user') || '{}'));
  const [loading, setLoading] = useState<boolean>(false);
  const [vehiculo, setVehiculo] = useState<string>('');
  const [selectVehiculos, setSelectVehiculos] = useState<optionsI[]>([{value:0, label:''}]);


  const GetVehiculos = () => {
    setLoading(true);
    Funciones.GetVehiculos(props.Jwt)
      .then((res: any) => {
        console.log("estos son los vehiculos:", res.data);
        setLoading(false);
        const optionVehiculos: optionsI[] = res.data.map((e: any) => {
          const label = `ID: ${e.vehiculoID} - ${e.numeroSerie}`;
          return { value: e.vehiculoID, label: label };
        });
        const opcionesConDefecto: optionsI[] = [{ value: 0, label: "Seleccione un vehículo" }, ...optionVehiculos];
        setSelectVehiculos(opcionesConDefecto);
      })
      .catch((err: string) => {
        setLoading(false);
      });
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
        documentoID: 0,
        vehiculoID: 0,
        nombreDocumento: "",
        rutaDocumento: "",
        observaciones: "",
      },
      onSubmit: (values) => {
        if(props.DocumentoID == 0){
          console.log("estos son los valores:", values, "userid", user.userID)
          Funciones.InsertDocumento(user.userID,props.Jwt,values)
          .then((res:any) => {
              props.Documentos();
              setMostrar(true)
              Swal.fire({
                position: "center",
                icon: "success",
                title: "El documento a sido insertado con exito",
                showConfirmButton: false,
                timer: 1000
              });
              props.fnCerrar(true)

          })
          .catch((err:any) => {
            props.fnCerrar(true)
            console.log(err);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Algo salio mal",
                showConfirmButton: false,
                timer: 1000
            });
          })
          console.log("se esta creando un documento")
      }
      else{

        console.log("entro al else de documento");

        const newDataDocumentos = props.data.map((item: any) => {
          if (item.documentoID === props.DocumentoID) {
              return {
                  ...item,
                  vehiculoID: values.vehiculoID,
                  nombreDocumento: values.nombreDocumento,
                  rutaDocumento: values.rutaDocumento,
                  observaciones: values.observaciones,
              };
          }
          return item;
        });

        props.setData(newDataDocumentos);


        Funciones.UpdateDocumento(user.userID,props.Jwt,values)
        .then((res:any) => {
            // props.Usuarios();
            setMostrar(true)
            Swal.fire({
              position: "center",
              icon: "success",
              title: "el documento a sido actualizado con exito",
              showConfirmButton: false,
              timer: 1000
            });
            props.fnCerrar(true)

        })
        .catch((err:any) => {
            console.log(err)
            Swal.fire({
              position: "center",
              icon: "error",
              title: "algo salio mal",
              showConfirmButton: false,
              timer: 1000
            });
            props.fnCerrar(true)
        })

       }

      },
    });

    useEffect(() => {
      console.log("Este es mi documentoID", props.DocumentoID);
      console.log("Este es mi data del row data", props.Form);
      GetVehiculos();
    
      if (props.Form) {
        formik.setValues({
          documentoID: props.Form.documentoID,
          vehiculoID: props.Form.vehiculoID,
          nombreDocumento: props.Form.nombreDocumento,
          rutaDocumento: props.Form.rutaDocumento,
          observaciones: props.Form.observaciones
        });
      } else {
        formik.setValues({
          documentoID: 0,
          vehiculoID: 0,
          nombreDocumento: "",
          rutaDocumento: "",
          observaciones: ""
        });
      }
    }, [props.Form]);
    

    const handleChange = (event: SelectChangeEvent<number>) => {
      formik.setFieldValue('vehiculoID', event.target.value);
    };


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
                  {props.DocumentoID == 0 ? "Subir documento" : "Actualizar documento"}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  style={styles.primaryColor}
                  variant="subtitle1"
                  align="right"
                >
                  Datos Documento
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
                  label="Nombre documento"
                  id="nombreDocumento"
                  name="nombreDocumento"
                  value={formik.values.nombreDocumento}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.nombreDocumento && Boolean(formik.errors.nombreDocumento)}
                  helperText={formik.touched.nombreDocumento && formik.errors.nombreDocumento}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  type="text"
                  label="Ruta"
                  id="rutaDocumento"
                  name="rutaDocumento"
                  value={formik.values.rutaDocumento}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.rutaDocumento && Boolean(formik.errors.rutaDocumento)}
                  helperText={formik.touched.rutaDocumento && formik.errors.rutaDocumento}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  type="text"
                  label="Observaciones"
                  id="observaciones"
                  name="observaciones"
                  value={formik.values.observaciones}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.observaciones && Boolean(formik.errors.observaciones)}
                  helperText={formik.touched.observaciones && formik.errors.observaciones}
                />
              </Grid>

              <Grid item xs={10}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Seleccione un</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="vehiculoID"
                    name="vehiculoID"
                    value={formik.values.vehiculoID}
                    onChange={handleChange}
                    label="Seleccione un Vehiculo"
                  >
                    {selectVehiculos.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </Select>
                </FormControl>
              </Grid>

               <br /> <br />

              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item container>
                <Grid item xs={2}>
                  <Button  type="submit">Guardar</Button>
                </Grid>
                <Grid item xs={2}>
                  <Button onClick={props.fnCerrar}  style={{color:'red'}}>Cancelar</Button>
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

export default Form