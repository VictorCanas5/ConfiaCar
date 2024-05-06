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
  
  
    const formik = useFormik({
      initialValues: {
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
        Funciones.InsertUsuario(props.Jwt,values)
        console.log("Submit:", values); 
        alert(JSON.stringify(values, null, 2));
        onClose();
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
                  Nuevo Seguro
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  style={styles.primaryColor}
                  variant="subtitle1"
                  align="right"
                >
                  Ingresa los datos:
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
                  type="number"
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
