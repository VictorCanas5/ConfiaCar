import { Box, Button, Grow, Dialog, DialogContent, Grid, Typography, TextField, Select, MenuItem, FormControl, Divider, InputLabel, FormControlLabel, Switch } from "@mui/material";
import { Modal, UploadProps } from "antd";
import { useEffect, useState, useRef } from "react";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from 'yup'
import * as Funciones from "../Funciones";
import StepperComponent from "../../../global/Componentes/ScriptsStepper/Steper";
import TextComponent from "../../../global/Componentes/TextComponent.tsx/TextComponent";
import CheckComponent from "../../../global/Componentes/CheckComponent.tsx/CheckComponent";
import CheckComponent2 from "../../../global/Componentes/CheckComponent.tsx/CheckComponent2";
import Swal from 'sweetalert2';
import { useFormik } from "formik";
import { grey } from "@mui/material/colors";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { SelectChangeEvent } from '@mui/material';

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

type FormType = {
  Jwt:string,
  Usuarios:any,
  ClienteID:number,
  idSocia?: number,
  Mostrar: boolean,
  fnCerrar(item: any): any,
  GetLocal: any,
  Form:any,
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  data: any[];
}

const UpdateForm = (props: FormType) => {
  
  const [fechaNacimiento, setFechaNacimiento] = useState(dayjs('')); 
  const [mostrar, setMostrar] = useState(false)
  const [step, setStep] = useState(0);
  const formikRef = useRef<FormikProps<any> | null>(null);

  const handleFechaNacimientoChange = (newValue: Dayjs | null) => {
    if (newValue !== null) {
      setFechaNacimiento(newValue); 
      formik.setFieldValue('fechaNacimiento', newValue.format('YYYY-MM-DD')); 
    }
  };
  
  const formik = useFormik({
    initialValues: {
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
    },
    onSubmit: (values) => {
      if(props.ClienteID == 0){
          console.log("estos son los values del cliente:", values)
          Funciones.InsertCliente(props.Jwt,values)
          .then((res:any) => {
              props.Usuarios();
              setMostrar(true)
              Swal.fire({
                position: "center",       
                icon: "success",
                title: "El usuario a sido insertado con exito",
                showConfirmButton: false,
                timer: 1000
              });
              props.fnCerrar(true)

          })
          .catch((err:any) => {
            console.log(err);
            props.fnCerrar(true)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Ya existe un usuario registrado con este correo",
                showConfirmButton: false,
                timer: 1000
            });
          })
          console.log("se esta creando un cliente")
      }
      else{

        const newDataClientes = props.data.map((item: any) => {
          if (item.clienteID === props.ClienteID) {
              const nuevoNombre = `${values.nombre} ${values.apellidoPaterno} ${values.apellidoMaterno}`;

              return {
                  ...item,
                  nombreCompleto: nuevoNombre, 
                  fechaNacimiento: values.fechaNacimiento,
                  telefonoMovil: values.telefonoMovil,
                  telefonoDomicilio: values.telefonoDomicilio,
                  lugarNacimiento: values.lugarNacimiento,                 
                  curp: values.curp,
                  rfc: values.rfc,
                  sexoID: values.sexoID,
                  estadoCivilID: values.estadoCivilID,
                  ingresosMensuales: values.ingresosMensuales,
                  correoElectronico: values.correoElectronico,
                  bloqueadoCliente: values.bloqueadoCliente
              };
          }
          return item;
        });
      
        props.setData(newDataClientes);

        console.log("estos son los valores en el update: ", values)

        Funciones.UpdateCliente(props.Jwt,values)
        .then((res:any) => {
            console.log("estos son los valores: ", values)
            // props.Usuarios();
            setMostrar(true)
            Swal.fire({
              position: "center",       
              icon: "success",
              title: "el cliente a sido actualizado con exito",
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
    console.log("Este es el clienteID", props.ClienteID)
    console.log("esta es mi data:", props.data)

    if (props.Form) {
      formik.setValues({
        idCliente: props.Form.idCliente,
        nombre: props.Form.nombre,
        apellidoPaterno: props.Form.apellidoPaterno,
        apellidoMaterno: props.Form.apellidoMaterno,
        fechaNacimiento: props.Form.fechaNacimiento,
        lugarNacimiento: props.Form.lugarNacimiento,
        curp: props.Form.curp,
        rfc: props.Form.rfc,
        sexoID: props.Form.sexoID,
        estadoCivilID: props.Form.estadoCivilID,
        ingresosMensuales: props.Form.ingresosMensuales,
        telefonoDomicilio: props.Form.telefonoDomicilio,
        correoElectronico: props.Form.correoElectronico,
        telefonoMovil: props.Form.telefonoMovil,
        buroInternoEstatusID: props.Form.buroInternoEstatusID,
        bloqueadoCliente: props.Form.bloqueadoCliente,
      });
    } else {
      formik.setValues({
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
      });
    }
  }, [props.Form]);


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
                  Datos Cliente
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  style={styles.primaryColor}
                  variant="subtitle1"
                  align="right"
                >
                  Clientes
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
                  label="Nombre"
                  id="nombre"
                  name="nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                  helperText={formik.touched.nombre && formik.errors.nombre}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  type="text"
                  label="Apellido Paterno"
                  id="apellidoPaterno"
                  name="apellidoPaterno"
                  value={formik.values.apellidoPaterno}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.apellidoPaterno && Boolean(formik.errors.apellidoPaterno)}
                  helperText={formik.touched.apellidoPaterno && formik.errors.apellidoPaterno}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  type="text"
                  label="Apellido Materno"
                  id="apellidoMaterno"
                  name="apellidoMaterno"
                  value={formik.values.apellidoMaterno}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.apellidoMaterno && Boolean(formik.errors.apellidoMaterno)}
                  helperText={formik.touched.apellidoMaterno && formik.errors.apellidoMaterno}
                />
              </Grid>

              <div style={{display:'flex', justifyContent:'center'}}>
                <div style={{marginLeft:'0.5rem'}}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                          label="Fecha Nacimiento"
                          value={fechaNacimiento} 
                          onChange={handleFechaNacimientoChange} 
                        />
                      </DemoContainer>
                  </LocalizationProvider>  
                </div>

                <div style={{width:'15rem', marginTop:'0.5rem', marginLeft:'1rem'}}>
                  <Grid item xs={10}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="sexoID"
                          name="sexoID"
                          value={formik.values.sexoID}
                          label="Sexo"
                          onChange={formik.handleChange}
                          >
                          <MenuItem value={"H"}>Hombre</MenuItem>
                          <MenuItem value={"M"}>Mujer</MenuItem>
                        </Select>
                    </FormControl>
                  </Grid>
                </div>
              </div>  

              <Grid item xs={3}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  type="text"
                  label="Lugar Nacimiento"
                  id="lugarNacimiento"
                  name="lugarNacimiento"
                  value={formik.values.lugarNacimiento}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lugarNacimiento && Boolean(formik.errors.lugarNacimiento)}
                  helperText={formik.touched.lugarNacimiento && formik.errors.lugarNacimiento}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  type="text"
                  label="CURP"
                  id="curp"
                  name="curp"
                  value={formik.values.curp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.curp && Boolean(formik.errors.curp)}
                  helperText={formik.touched.curp && formik.errors.curp}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  type="text"
                  label="RFC"
                  id="rfc"
                  name="rfc"
                  value={formik.values.rfc}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.rfc && Boolean(formik.errors.rfc)}
                  helperText={formik.touched.rfc && formik.errors.rfc}
                />
              </Grid>

                <Grid item xs={10}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Estado civil</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="estadoCivilID"
                        name="estadoCivilID"
                        value={formik.values.estadoCivilID}
                        label="Estado civil"
                        onChange={formik.handleChange}
                        >
                        <MenuItem value={"S"}>Soltero</MenuItem>
                        <MenuItem value={"C"}>Casado</MenuItem>
                      </Select>
                  </FormControl>
                </Grid>         

                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    type="number"
                    label="Ingresos Mensuales"
                    id="ingresosMensuales"
                    name="ingresosMensuales"
                    value={formik.values.ingresosMensuales}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.ingresosMensuales && Boolean(formik.errors.ingresosMensuales)}
                    helperText={formik.touched.ingresosMensuales && formik.errors.ingresosMensuales}
                  />
                </Grid> 

                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    type="text"
                    label="Correo Electronico"
                    id="correoElectronico"
                    name="correoElectronico"
                    value={formik.values.correoElectronico}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.correoElectronico && Boolean(formik.errors.correoElectronico)}
                    helperText={formik.touched.correoElectronico && formik.errors.correoElectronico}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    type="text"
                    label="Telefono Domicilio"
                    id="telefonoDomicilio"
                    name="telefonoDomicilio"
                    value={formik.values.telefonoDomicilio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.telefonoDomicilio && Boolean(formik.errors.telefonoDomicilio)}
                    helperText={formik.touched.telefonoDomicilio && formik.errors.telefonoDomicilio}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    type="text"
                    label="Telefono Movil"
                    id="telefonoMovil"
                    name="telefonoMovil"
                    value={formik.values.telefonoMovil}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.telefonoMovil && Boolean(formik.errors.telefonoMovil)}
                    helperText={formik.touched.telefonoMovil && formik.errors.telefonoMovil}
                  />
                </Grid>

                <Grid item xs={10}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Buro Interno</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="buroInternoEstatusID"
                        name="buroInternoEstatusID"
                        value={formik.values.buroInternoEstatusID}
                        label="Buro Interno"
                        onChange={formik.handleChange}
                        >
                        <MenuItem value={0}>Estado 1</MenuItem>
                        <MenuItem value={1}>Estado 2</MenuItem>
                        <MenuItem value={2}>Estado 3</MenuItem>
                      </Select>
                  </FormControl>
                </Grid>   

                <Grid item xs={10}>
                  <FormControl fullWidth>
                    <FormControlLabel
                      control={
                        <Switch
                          id="bloqueadoCliente"
                          name="bloqueadoCliente"
                          checked={formik.values.bloqueadoCliente}
                          onChange={formik.handleChange}
                          color="primary"
                        />
                      }
                      label={formik.values.bloqueadoCliente ? "Bloqueado" : "Activo"}
                      labelPlacement="start"
                    />
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

export default UpdateForm;