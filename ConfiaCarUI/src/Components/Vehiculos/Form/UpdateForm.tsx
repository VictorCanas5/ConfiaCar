import React, { useEffect } from "react";
import { Dialog, 
         DialogContent, 
         Grid, 
         Divider, 
         Button, 
         Typography, 
         TextField, 
         FormControlLabel,
         MenuItem,
         Select, 
         FormControl,
         InputLabel,
         Autocomplete,
         Box,
         Checkbox
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useFormik } from "formik";
import * as Yup from 'yup'
import * as Funciones from '../Funciones'
import Swal from "sweetalert2";
import DocsForm from "./DocsForm";

function UpdateForm(props: any) {
  
  const carColors = ['Blanco', 'Negro', 'Gris', 'Plata', 'Azul', 'Rojo', 'Verde', 'Marrón', 'Amarillo', 'Naranja', 'Beige', 'Dorado', 'Bronce', 'Púrpura', 'Rosado', 'Turquesa', 'Cian', 'Violeta', 'Blanco Perla', 'Negro Brillante', 'Gris Espacial', 'Rojo Rubí', 'Verde Esmeralda', 'Azul Zafiro', 'Plateado', 'Champán', 'Cobre', 'Azul Marino', 'Caqui', 'Oro', 'Carmesí', 'Amarillo Limón', 'Gris Grafito', 'Aqua', 'Granate', 'Gris Pardo', 'Rojo Cereza', 'Azul Celeste', 'Índigo', 'Coral', 'Melocotón', 'Amarillo Canario', 'Verde Oliva', 'Turmalina', 'Azul Cobalto', 'Ocre', 'Platino', 'Zafiro', 'Azul Eléctrico', 'Rosa Pastel'];

const styles = {
    root: {
      flexGrow: 1,
      zIndex: 0
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
      padding: 30
    },
    secondaryContainer: {
      padding: "20px 25px",
      backgroundColor: 'black'
    }
  }
  const {  onClose } = props;

  interface marcasInterface{
      fechaCreacion: string;
      marca: string;
      marcaID: number| null;
      marcaLogo: string;
      usuarioCreacion: number;
  }

  interface modelosInterface{
      modeloID: string;
      modelo: string;
      anio: any;
      fechaCreacion: string;
      marcarId : number;

  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const [vehiculoID, setVehiculoID] = React.useState<number>(0);
  const [mostrar2, setMostrar2] = React.useState<boolean>(false);
  const [SelectedColor, setSelectedColor] = React.useState<String | null>(null)
  const [onChangeMarca, setonChangeMarca] = React.useState<boolean>(false)
  const [SelectedMarca, setSelectedMarca] = React.useState<marcasInterface| null>(null)
  const [SelectedModelo, setSelectedModelo] = React.useState<modelosInterface| null>(null)
  const [marcas, setMarcas] = React.useState<marcasInterface[]>([])
  const [modelos, setModelos] = React.useState<modelosInterface[]>([])

  const years: number[] = [];
  const currentYear = new Date().getFullYear();

  for (let year = currentYear; year >= 1990; year--) {
    years.push(year);
  }


  const GetMarcas = () => {
    
    Funciones.GetMarcas(props.Jwt)
      .then((res: any) => {

    
        let array : marcasInterface[] = []
       // let logoblob = new Blob([data.marcaLogo])
       setMarcas((prevMarcas) => {
        // Mapear los datos recibidos y agregarlos al estado previo
        return res.data.map((data: any) => {
          // Convertir el logo a un Blob
          let logoblob = new Blob([data.marcaLogo]);
  
          // Crear una URL para el Blob
          let logoURL = URL.createObjectURL(logoblob);
  
          // Retornar el objeto de marca actualizado con la URL del logo
          return {
            fechaCreacion: data.fechaCreacion,
            marca: data.marca,
            marcaID: data.marcaID,
            marcaLogo: logoURL, // Establecer la URL como valor de marcaLogo
            usuarioCreacion: data.usuarioCreacion
          };
        });
      });
       
        
     
        
        
      })
      .catch((err: string) => {
        onClose()
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Error al obtener marcas <br/> ${err}`,
          showConfirmButton: false,
          timer: 2000
      });
      
      
      });
  };

  const GetModelos = () =>{
  
    Funciones.GetModelos(props.Jwt, SelectedMarca?.marcaID)
    .then((res: any) => {
      
      setModelos(res.data)
    
      
      
    })
    .catch((err: string) => {
      onClose()
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Error al obtener modelos <br/> ${err}`,
        showConfirmButton: false,
        timer: 2000
    });
    
    
    });
  }
 
  
  const validationSchema = Yup.object().shape({
    marca: Yup.string().required("Campo obligatorio"),
    apaterno: Yup.string().required("Campo obligatorio"),
    amaterno: Yup.string().required("Campo obligatorio"),
    email: Yup.string().required("Campo obligatorio"),
    celular: Yup.number().typeError('Debe ser un número').required('Campo obligatorio').positive('Debe ser un número positivo').integer('Debe ser un número entero'),
    rolID: Yup.string().required("Campo obligatorio"),
  })
    const formik = useFormik({
      initialValues: {
        id: props.vehiculoID,
        tipoV: 0,
        marca: 0,
        modelo: 0,
        color: '',
        anio: 0,
        precioCompra: 0,
        precioVenta: 0,
        sinprecioV: false,
        numeroSerie: 0, 
        estatus: '', 
        placas: '', 
        kilometraje: 0, 
        transmision: '', 
        noPuertas: 0, 
        procedencia: '', 
        observaciones: ''
      },
     /*  validationSchema: validationSchema, */
      onSubmit: (values) => {
        
        console.log("Submit:", values); 
       
        
        if(props.UsuarioID == 0){
        
          console.log("estos son los valores:", values)
          Funciones.InsertVehiculo(props.Jwt,values)
          .then((res:any) => {
              
              setVehiculoID(res.data.msg)
              OnDocsOpen();

          })
          .catch((err:any) => {
            console.log(err);
            onClose();
            Swal.fire({
                position: "center",
                icon: "error",
                title: `Ha ocurrido un error ${err}`,
                showConfirmButton: false,
                timer: 1000
            });
          })
          console.log("se esta creando un usuario")
      }
      /* else{


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
        
       } */
      },
    });

    const OnDocsOpen = () =>{

      Swal.fire({
        title: "¿Desea llenar la documentacion ahora?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        denyButtonText: `En otro momento`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setMostrar2(true);
          
          
        } else if (result.isDenied) {
          onClose()
          Swal.fire("Vehiculo guardado correctamente", "", "success");
        }
      });
      
      
    }

    useEffect(() => {
      /* if(props.Update){
          console.log(props.data);
         const user = props.data.find((a: any)=> a.usuarioID == props.UsuarioID)
         console.log(user);
         formik.values.marca = user.marca
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
      } */
      GetMarcas();


  }, [])

  useEffect(() => {
   
      if (SelectedMarca != null || onChangeMarca) {
         GetModelos();
        
      }
    
  }, [onChangeMarca])

 
  return (
   <Dialog
      style={styles.root}
      fullWidth
      maxWidth="md"
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
                  Registrar Nuevo Vehiculo
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  style={styles.primaryColor}
                  variant="subtitle1"
                  align="right"
                >
                  Datos Iniciales
                </Typography>
              </Grid>
            </Grid>
             <Grid
              container
              
              style={styles.mainContent}
              spacing={1}
            >
              <Grid item xs={6}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tipo de Vehiculo</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="tipoID"
                        name="tipoV"
                        value={formik.values.tipoV}
                        label="Seleccione un tipo"
                        onChange={formik.handleChange}
                        >
                        <MenuItem value={1}>AUTOMOVIL</MenuItem>
                        <MenuItem value={2}>MOTOCICLETA</MenuItem>
                        <MenuItem value={3}>CAMION</MenuItem>
                        <MenuItem value={4}>TRAILER</MenuItem>

                    
                        </Select>
                    
                </FormControl>
              </Grid>
              <br />
              <Grid item xs={6}>
              <Autocomplete
                      id="country-select-demo"
                      onChange={(event, value) => {
                        
                        setonChangeMarca(true)
                        setSelectedMarca(value);
                        
                        formik.setFieldValue("marca", value ? value.marcaID : ""); // Establecer el valor del campo del formulario
                      }}
                      value={SelectedMarca}
                      
                      options={marcas}
                      autoHighlight
                      getOptionLabel={(option: any) => option.marca}
                      renderOption={(props, option) => (
                         <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          <img
                            loading="lazy"
                            width="20"
                            srcSet={option.marcaLogo}
                            src={option.marcaLogo}
                            alt=""
                          />
                          {option.marca} 
                        </Box> 
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name='marca'
                          label="Escoge una marca"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                          }}
                        />
                      )}
                      
                    />
              </Grid>
              <br />
              </Grid>
              <Grid
              container
              style={styles.mainContent}
              spacing={1}
              >
                  <Grid item xs={6}>
                  <Autocomplete
                          id="country-select-demo"
                          onChange={(event, value) => {
                            
                            setonChangeMarca(true)
                            setSelectedModelo(value);
                            
                            formik.setFieldValue("modelo", value ? value.modeloID : ""); // Establecer el valor del campo del formulario
                          }}
                          value={SelectedModelo}
                          
                          options={modelos}
                          autoHighlight
                          getOptionLabel={(option: any) => option.modelo}
                          renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                              
                              {option.modelo} 
                            </Box> 
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name='modelo'
                              label="Escoge un modelo"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                              }}
                            />
                          )}
                          
                        />
                  </Grid>


                  <Grid item xs={6}>
                  <FormControl size="medium"  sx={{ minWidth: '100%'}}>
                    <InputLabel id="demo-simple-select-label">Año del Vehiculo</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="anio"
                            name="anio"
                            value={formik.values.anio}
                            label="Seleccione un tipo"
                            onChange={formik.handleChange}
                            
                            >
                            {years.map(option => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}

                        
                            </Select>
                        
                    </FormControl>
                  </Grid>

              </Grid>

              <Grid
              container
              style={styles.mainContent}
              spacing={1}
              >
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="standard"
                  type="text"
                  label="Precio de Compra ($)"
                  id="precioc"
                  name="precioCompra"
                  value={formik.values.precioCompra}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.precioCompra && Boolean(formik.errors.precioCompra)}
                  helperText={formik.touched.precioCompra && formik.errors.precioCompra}
                />
                  
              </Grid>
              <Grid item xs={6}>
              <TextField
                  variant="standard"
                  type="text"
                  label="Precio de Venta ($)"
                  id="celular"
                  name="precioVenta"
                  disabled={formik.values.sinprecioV}
                  value={formik.values.precioVenta}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.precioVenta && Boolean(formik.errors.precioVenta)}
                  helperText={formik.touched.precioVenta && formik.errors.precioVenta}
                />
                 
                 <FormControlLabel name="sinprecioV" value={formik.values.sinprecioV} onChange={formik.handleChange} control={<Checkbox />} label="Sin Precio de Venta" />
              </Grid>
              </Grid>
            <Grid
              container
              style={styles.mainContent}
              spacing={1}
              >
               <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  type="text"
                  label="Numero de Serie"
                  id="celular"
                  name="numeroSerie"
                  value={formik.values.numeroSerie}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.numeroSerie && Boolean(formik.errors.numeroSerie)}
                  helperText={formik.touched.numeroSerie && formik.errors.numeroSerie}
                />
                  
              </Grid>
            
               <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  type="text"
                  label="Placas"
                  id="celular"
                  name="placas"
                  value={formik.values.placas}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.placas && Boolean(formik.errors.placas)}
                  helperText={formik.touched.placas && formik.errors.placas}
                />
              </Grid>
              </Grid>
              <Grid
              container
              style={styles.mainContent}
              spacing={1}
              > 
                  <Grid item xs={6}>
                  <Autocomplete
                          id="country-select-demo"
                          onChange={(event, value) => {
                            setSelectedColor(value)
                            formik.setFieldValue("color", value ? value : ""); // Establecer el valor del campo del formulario
                          }}
                          value={SelectedColor}
                          options={carColors}
                          autoHighlight
                          getOptionLabel={(option: any) => option}
                          renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                              
                              {option} 
                            </Box> 
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name='color'
                              label="Escoge un Color"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                              }}
                            />
                          )}
                          
                        />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      
                      variant="outlined"
                      type="text"
                      label="Kilometraje"
                      id="kilometraje"
                      name="kilometraje"
                      value={formik.values.kilometraje}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.kilometraje && Boolean(formik.errors.kilometraje)}
                      helperText={formik.touched.kilometraje && formik.errors.kilometraje}
                    />
                      
                  </Grid>
              </Grid>
              <Grid
              container
              style={styles.mainContent}
              spacing={1}
              >
                  <Grid item xs={6}>
                  <FormControl size="medium" sx={{ minWidth: '100%'}}>
                    <InputLabel id="demo-simple-select-label">Transmisión</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="rolId"
                            name="transmision"
                            value={formik.values.transmision}
                            label="Seleccione un tipo"
                            onChange={formik.handleChange}
                            >
                            
                              <MenuItem key={1} value={'MANUAL'}>MANUAL</MenuItem>
                              <MenuItem key={2} value={'AUTOMATICA'}>AUTOMATICA</MenuItem>

                        
                            </Select>
                        
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="number"
                      label="Numero de Puertas"
                      id="noPuertas"
                      name="noPuertas"
                      value={formik.values.noPuertas}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.noPuertas && Boolean(formik.errors.noPuertas)}
                      helperText={formik.touched.noPuertas && formik.errors.noPuertas}
                    />
                      
                  </Grid>
              </Grid>
              <Grid
              container
              style={styles.mainContent}
              spacing={1}
              >
                <Grid item xs={6}>
                  <FormControl size="medium" sx={{ minWidth: '100%'}}>
                    <InputLabel id="demo-simple-select-label">Estatus del Vehiculo</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="estatus"
                            name="estatus"
                            value={formik.values.estatus}
                            label="Seleccione un Estatus"
                            onChange={formik.handleChange}
                            >
                            
                              <MenuItem key={1} value={'DISPONIBLE PARA VENTA'}>DISPONIBLE PARA VENTA</MenuItem>
                              <MenuItem key={2} value={'NO DISPONIBLE'}>NO DISPONIBLE</MenuItem>
                              <MenuItem key={3} value={'RENTADO'}>RENTADO</MenuItem>
                              <MenuItem key={4} value={'VENDIDO'}>VENDIDO</MenuItem>
                              <MenuItem key={5} value={'PRESTADO'}>PRESTADO</MenuItem>
                              <MenuItem key={6} value={'EMPEÑO'}>EMPEÑO</MenuItem>

                        
                            </Select>
                        
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                  <FormControl size="medium" sx={{ minWidth: '100%'}}>
                    <InputLabel id="demo-simple-select-label">Procedencia</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="procedencia"
                            name="procedencia"
                            value={formik.values.procedencia}
                            label="Seleccione una procedencia"
                            onChange={formik.handleChange}
                            >
                            
                              <MenuItem key={1} value={'EXTRANJERA'}>EXTRANJERA</MenuItem>
                              <MenuItem key={2} value={'NACIONAL'}>NACIONAL</MenuItem>


                        
                            </Select>
                        
                    </FormControl>
                  </Grid>
              </Grid>
              <Grid
              container
              style={styles.mainContent}
              spacing={1}
              >
                <Grid item xs={12}>
                      <TextField
                        id="outlined-multiline-static"
                        label="OBSERVACIONES"
                        name="observaciones"
                        value={formik.values.observaciones}
                        onChange={formik.handleChange}
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        style={{minWidth: '100%'}}
                      />
                  </Grid>
              </Grid>
              <Grid
              container
              style={styles.mainContent}
              spacing={1}
              >
                  <Grid item xs={12}>
                    <Divider /> <br /> 
                  </Grid> 
                  <Grid item container>
                    <Grid item xs={2}>
                      <Button variant="contained" style={{background: '#002a4c'}} type="submit" /* onClick={OnDocsOpen}  */ >Guardar</Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button variant="contained" color="error" onClick={onClose}  >Cancelar</Button>
                    </Grid>
                  </Grid>
              </Grid> <br /> 
          </Grid>
         {mostrar2 && (
            <DocsForm
               /*  UsuarioID={UsuarioID}
                fnCerrar={fnCerrar} */
                Mostrar={mostrar2}
                onClose={()=>setMostrar2(!mostrar2)}
                Jwt={props.Jwt}
                VehiculoID={vehiculoID}
                /* Form={state.Form}
                GetLocal={undefined}
                setData={setDataVehiculos}
                data={DataVehiculos} */
            />
         )}
        </Grid>
        </form>
      </DialogContent>
    </Dialog> 
  );
}

export default UpdateForm
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
