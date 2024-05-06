import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Grid,
  Divider,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useFormik } from "formik";
import * as Funciones from "../Funciones";
import { optionsI } from "../../../global/Interfaces/Interfaces";
import { SelectChangeEvent } from "@mui/material";
import Swal from 'sweetalert2';


type FormType = {
  Jwt: string;
  Documentos: any;
  DocumentoID: any;
  Mostrar: boolean;
  fnCerrar(item: any): any;
  GetLocal: any;
  Form: any;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  data: any[];
};

function Form(props: FormType) {

  const [loading, setLoading] = useState<boolean>(false);
  const [selectClientes, setSelectClientes] = useState<optionsI[]>([{ value: 0, label: "" }]);
  const [selectVehiculos, setSelectVehiculos] = useState<any[]>([{ value: 0, label: "" }]);
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user') || '{}'));


  const GetClientes = () => {
    setLoading(true);
    Funciones.GetClientes(props.Jwt)
      .then((res: any) => {
        setLoading(false);
        const optionClientes: optionsI[] = res.data.map((e: any) => {
          const label = `ID: ${e.clienteID} - ${e.nombreCompleto}`;
          return { value: e.clienteID, label: label };
        });
        const opcionesConDefecto: optionsI[] = [{ value: 0, label: "Seleccione un cliente" }, ...optionClientes];
        setSelectClientes(opcionesConDefecto);
      })
      .catch((err: string) => {
        setLoading(false);
      });
  };

  const GetVehiculos = () => {
    setLoading(true);
    Funciones.GetVehiculos(props.Jwt)
      .then((res: any) => {
        setLoading(false);
        const optionVehiculos: optionsI[] = res.data.map((e: any) => {
          const label = `ID: ${e.vehiculoID} - ${e.numeroSerie}`;
          return { value: e.vehiculoID, label: label, precioVenta: e.precioVenta };
        });
        const opcionesConDefectoVehiculos: optionsI[] = [{ value: 0, label: "Seleccione un vehículo" }, ...optionVehiculos];
        setSelectVehiculos(opcionesConDefectoVehiculos);
      })
      .catch((err: string) => {
        setLoading(false);
      });
  };

  const obtenerPrecioVenta = (vehiculoID: number): number => {
    const vehiculo = selectVehiculos.find((v) => v.value === vehiculoID);
    return vehiculo ? vehiculo.precioVenta : 0;
  };

  const formik = useFormik({
    initialValues: {
      vehiculoID: 0,
      clienteID: 0,
      precioVenta: null,
      plazos: 0,
      tipoPago: "",
      periodicidad: "",
      abonos: 0,

    },
    onSubmit: (values) => {
        console.log("estos son los values de la venta:", values)
        console.log("este es el user id del vendedor:", user.userID.usuarioid)
        Funciones.InsertVenta(user.userID,props.Jwt,values)
        .then((res:any) => {
            props.Documentos();
            Swal.fire({
              position: "center",       
              icon: "success",
              title: "La venta a sido creada",
              showConfirmButton: false,
              timer: 1000
            });

        })
        .catch((err:any) => {
          console.log(err);
          props.fnCerrar(true)
          Swal.fire({
              position: "center",
              icon: "error",
              title: "Algo salio mal",
              showConfirmButton: false,
              timer: 1000
          });
        })
    },
  });

  useEffect(() => {
    GetClientes();
    GetVehiculos();
  }, []);

  const handleChangeTipoPago = (event: SelectChangeEvent<string>) => {
    formik.setFieldValue("tipoPago", event.target.value);
    
    if (event.target.value === "Credito") {
      formik.setFieldValue("plazos", 0);
      formik.setFieldValue("abonos", 0); 
    } else {
      formik.setFieldValue("abonos", obtenerPrecioVenta(formik.values.vehiculoID));
    }
  };
  
  
  const handleChangeVehiculo = (event: SelectChangeEvent<string | number>) => {
    const vehiculoID = typeof event.target.value === "string" ? parseInt(event.target.value) : event.target.value as number;
    formik.setFieldValue("vehiculoID", vehiculoID);
  
    const precioVenta = obtenerPrecioVenta(vehiculoID);
    formik.setFieldValue("precioVenta", precioVenta); 
  
    if (formik.values.tipoPago === "Credito" && formik.values.plazos !== 0) {
      const plazos = formik.values.plazos;
      formik.setFieldValue("abonos", precioVenta / plazos);
    }
  };
  

  const handleChangePlazos = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const plazos = parseInt(event.target.value);
    const precioVenta = obtenerPrecioVenta(formik.values.vehiculoID);
    
    if (formik.values.tipoPago === "Credito" && !isNaN(plazos)) {
      const abonos = Math.ceil(precioVenta / plazos);
      formik.setFieldValue("abonos", abonos);
    } else {
      formik.setFieldValue("abonos", 0);
    }
  };
  
  return (
    <Dialog fullWidth maxWidth="sm" open={props.Mostrar} onClose={props.fnCerrar}>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                
                <Grid item xs={12} style={{ backgroundColor: "#29B672", marginBottom: "1rem" }}>
                  <Typography variant="h5" style={{ color: "white", padding: "1rem" }}>
                    Datos de venta
                  </Typography>
                </Grid>

                <Grid item xs={10}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Seleccione un cliente</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="clienteID"
                      name="clienteID"
                      value={formik.values.clienteID}
                      onChange={formik.handleChange}
                      label="Seleccione un Cliente"
                    >
                      {selectClientes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={10}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Seleccione un vehiculo</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="vehiculoID"
                      name="vehiculoID"
                      value={formik.values.vehiculoID}
                      onChange={handleChangeVehiculo}
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

                <Grid item xs={8}>
                  <Typography variant="subtitle2" gutterBottom>
                    Precio de venta
                  </Typography>
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    type="number"
                    id="precioVenta"
                    name="precioVenta"
                    value={obtenerPrecioVenta(formik.values.vehiculoID)}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={10}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tipo de pago</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="tipoPago"
                      name="tipoPago"
                      value={formik.values.tipoPago}
                      onChange={handleChangeTipoPago}
                      label="Tipo de pago"
                    >
                      <MenuItem value={"Contado"}>Contado</MenuItem>
                      <MenuItem value={"Credito"}>Credito</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {formik.values.tipoPago === "Credito" && (
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      margin="dense"
                      variant="outlined"
                      type="number"
                      label="Plazos"
                      id="plazos"
                      name="plazos"
                      value={formik.values.plazos}
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleChangePlazos(e);
                      }}
                      onBlur={formik.handleBlur}
                      error={formik.touched.plazos && Boolean(formik.errors.plazos)}
                      helperText={formik.touched.plazos && formik.errors.plazos}
                    />
                  </Grid>
                )}

                {formik.values.tipoPago === "Credito" && (
                  <Grid item xs={10}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Tipo de plazo</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="periodicidad"
                        name="periodicidad"
                        onChange={formik.handleChange}
                        label="Tipo de plazo"
                      >
                        <MenuItem value={"Semanal"}>Semanal</MenuItem>
                        <MenuItem value={"Quincenal"}>Quincenal</MenuItem>
                        <MenuItem value={"Mensual"}>Mensual</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}


                <Grid item xs={8}>
                  <Typography variant="subtitle2" gutterBottom>
                    Cantidad Pago
                  </Typography>
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    type="number"
                    label="Cantidad pago"
                    id="abonos"
                    name="abonos"
                    value={formik.values.abonos}
                    onChange={(e) => {
                      formik.handleChange(e);
                      handleChangePlazos(e);
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.abonos && Boolean(formik.errors.abonos)}
                    helperText={formik.touched.abonos && formik.errors.abonos}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item container justifyContent="space-between">
                  <Grid item>
                    <Button type="submit">Venta</Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={props.fnCerrar} style={{ color: "red" }}>
                      Cancelar
                    </Button>
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

export default Form;
