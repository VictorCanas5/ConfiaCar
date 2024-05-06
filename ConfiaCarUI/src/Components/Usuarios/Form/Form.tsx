import React, { useEffect } from "react";
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
import Swal from "sweetalert2";

function Form(props: any) {
    
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
  const {  onClose } = props;

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Campo obligatorio"),
    apaterno: Yup.string().required("Campo obligatorio"),
    amaterno: Yup.string().required("Campo obligatorio"),
    email: Yup.string().required("Campo obligatorio"),
    celular: Yup.number().typeError('Debe ser un número').required('Campo obligatorio').positive('Debe ser un número positivo').integer('Debe ser un número entero'),
    rolID: Yup.string().required("Campo obligatorio"),
  })
  useEffect(() => {
      if(props.Update){
          console.log(props.data);
         const user = props.data.find((a: any)=> a.usuarioID == props.UsuarioID)
         console.log(user);
         formik.values.nombre = user.nombre
         formik.values.apaterno= user.apellidoPaterno
         formik.values.amaterno= user.apellidoMaterno
         formik.values.email = user.correoElectronico
         formik.values.celular = user.telefono
         formik.values.rolID = user.rolID
         formik.values.Estado = user.masterUser
         console.log(formik.values.email);
         props.setUpdate((prev: any)=>({
          ...prev,
          update: false
      }))
      }
  }, [])
  
  
    const formik = useFormik({
      initialValues: {
        id: props.UsuarioID,
        nombre: '',
        apaterno: '',
        amaterno: '',
        email: '',
        celular: 0,
        rolID: 0,
        Estado: false,
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        
        console.log("Submit:", values); 
       
        
        if(props.UsuarioID == 0){
        
          console.log("estos son los valores:", values)
          Funciones.InsertUsuario(props.Jwt,values)
          .then((res:any) => {
              props.Usuarios();
              
              Swal.fire({
                position: "center",       
                icon: "success",
                title: "El usuario a sido insertado con exito",
                showConfirmButton: false,
                timer: 1000
              });
              onClose();

          })
          .catch((err:any) => {
            console.log(err);
            onClose();
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Ya existe un usuario registrado con este correo",
                showConfirmButton: false,
                timer: 1000
            });
          })
          console.log("se esta creando un usuario")
      }
      else{


        const newDataUsuarios = props.data.map((item: any) => {
          if (item.usuarioID === props.UsuarioID) {
              const nuevoNombre = `${values.nombre} ${values.apaterno} ${values.amaterno}`;

              return {
                  ...item, 
                  masterUser: values.Estado,
                  correoElectronico: values.email,
                  telefono: values.celular,
                  nombreCompleto: nuevoNombre, 
                  rolID: values.rolID
              };
          }
          return item;
        });

      props.setData(newDataUsuarios);

      
      

        Funciones.UpdateUsuario(props.Jwt,values)
        .then((res:any) => {
             props.Usuarios();
            
            Swal.fire({
              position: "center",       
              icon: "success",
              title: "el usuario a sido actualizado con exito",
              showConfirmButton: false,
              timer: 1000
            });
            onClose();
            
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
            onClose();
        })
        
       }
      },
    });

 
  return (
   <Dialog
      style={styles.root}
      fullWidth
      maxWidth="sm"
      open={props.Mostrar}
      onClose={() => onClose("wireModal")}
    >
      <DialogContent style={styles.padding}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container direction="row" style={styles.mainHeader}>
              <Grid item xs={8}>
                <Typography style={styles.primaryColor} variant="h5">
                  Alta de Usuario
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  style={styles.primaryColor}
                  variant="subtitle1"
                  align="right"
                >
                  Datos Personales
                </Typography>
              </Grid>
            </Grid>
             <Grid
              container
              direction="column"
              style={styles.mainContent}
              spacing={1}
            >
           {/*   <Grid item xs={10}>
                <TextField
                  style={{ marginBottom: 20 }}
                  fullWidth
                  select
                  margin="dense"
                  variant="outlined"
                  label="Shipping Presets"
                  defaultValue="None"
                  id="shipping-presets"
                >
                  <MenuItem>None Present</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid> 
              <Grid item xs={10}>
                <TextField
                  style={{ marginTop: 20 }}
                  label="Country"
                  fullWidth
                  select
                  variant="outlined"
                  value={values.country}
                  id="country"
                  margin="dense"
                  helperText="Please select your country"
                >
                  {countries.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>*/}
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  type="text"
                  label="Nombre(s)"
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
                  id="apaterno"
                  name="apaterno"
                  value={formik.values.apaterno}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.apaterno && Boolean(formik.errors.apaterno)}
                  helperText={formik.touched.apaterno && formik.errors.apaterno}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  type="text"
                  label="Apellido Materno"
                  id="amaterno"
                  name="amaterno"
                  value={formik.values.amaterno}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.amaterno && Boolean(formik.errors.amaterno)}
                  helperText={formik.touched.amaterno && formik.errors.amaterno}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  type={"email"}
                  label="Correo Electronico"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  type="text"
                  label="Numero De Celular"
                  id="celular"
                  name="celular"
                  value={formik.values.celular}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.celular && Boolean(formik.errors.celular)}
                  helperText={formik.touched.celular && formik.errors.celular}
                />
              </Grid>
              <Grid item xs={10}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Rol de Usuario</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="rolId"
                        name="rolID"
                        value={formik.values.rolID}
                        label="Seleccione un rol"
                        onChange={formik.handleChange}
                        >
                        <MenuItem value={1}>COMPRADOR</MenuItem>
                        <MenuItem value={2}>VENDEDOR</MenuItem>
                    
                        </Select>
                        <FormControlLabel name="Estado" value={formik.values.Estado} onChange={formik.handleChange} control={<Switch />} label="Usuario Master" />
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
                  <Button onClick={onClose}  style={{color:'red'}}>Cancelar</Button>
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
{/* <Grid item xs={4} style={styles.secondaryContainer}>
            <Grid container>
              <Grid item xs={12}  align="right"  style={styles.padding} >
                <IconButton
                   edge={"start"}
                  align={"right"}
                 
                  aria-label={"Close"}
                  style={{ padding: 8 }} 
                  style={styles.padding}
                  color={"primary"}
                  onClick={onClose}
                >
                  <Close />
                </IconButton>
              </Grid>
              <Grid item xs={12}  align="center" >
                <Typography style={styles.primaryColor} variant="h5">
                  Alta de Usuario
                </Typography>
              </Grid>
              <Grid container style={{ paddingTop: 20 }}>
                <Grid item xs={2}>
                  <Icon style={styles.primaryColor}>location_on</Icon>
                </Grid>
                <Grid item xs={10}>
                  <Typography style={styles.secondaryColor}>
                    36 BAOSHAN JIUCUN BAOSHAN DISTRICT{" "}
                    <strong>201900 Shanghai China</strong>
                  </Typography>
                </Grid>
              </Grid>
              <Grid container style={{ paddingTop: 10, alignItems: "center" }}>
                <Grid item xs={2}>
                  <Icon style={styles.primaryColor}>person</Icon>
                </Grid>
                <Grid item  align="left"  xs={3}>
                  <Typography
                    variant="caption"
                    style={styles.secondaryColor}
                  >
                    Seller
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography align="right" style={styles.secondaryColor}>
                    <strong>Seller Company</strong>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container className="mt-auto">
              <Grid item container>
                <Grid item xs={12}>
                  <Button>Cancel</Button>
                </Grid>
                <Grid item xs={12}>
                  <Button>SAVE</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid> */}
