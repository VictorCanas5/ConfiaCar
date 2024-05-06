import React, { useEffect } from "react";
import { Dialog, 
         DialogContent, 
         Grid, 
         Button, 
         Typography, 

} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useFormik } from "formik";
import * as Yup from 'yup'
import * as Funciones from '../Funciones'
import Swal from "sweetalert2";
import MUIDataTable from "mui-datatables";
import { ColumnTypeI2, optionsTypeI } from "../../../global/Interfaces/Interfaces";
import UploadForm from "./UploadForm";
import { Check, Report } from "@mui/icons-material";

function DocsForm(props: any) {
  
  const carColors = ['Blanco', 'Negro', 'Gris', 'Plata', 'Azul', 'Rojo', 'Verde', 'Marrón', 'Amarillo', 'Naranja', 'Beige', 'Dorado', 'Bronce', 'Púrpura', 'Rosado', 'Turquesa', 'Cian', 'Violeta', 'Blanco Perla', 'Negro Brillante', 'Gris Espacial', 'Rojo Rubí', 'Verde Esmeralda', 'Azul Zafiro', 'Plateado', 'Champán', 'Cobre', 'Azul Marino', 'Caqui', 'Oro', 'Carmesí', 'Amarillo Limón', 'Gris Grafito', 'Aqua', 'Granate', 'Gris Pardo', 'Rojo Cereza', 'Azul Celeste', 'Índigo', 'Coral', 'Melocotón', 'Amarillo Canario', 'Verde Oliva', 'Turmalina', 'Azul Cobalto', 'Ocre', 'Platino', 'Zafiro', 'Azul Eléctrico', 'Rosa Pastel'];

const styles = {
    root: {
      flexGrow: 1,
      zIndex: 1
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
      padding: "50px 25px",
      backgroundColor: 'black'
    }
  }
  const {  onClose } = props;
 
 
  
  interface dataInterface{
    UsuarioID : number 
    VehiculoID : number
    TipoDocID : number
    TipoDocNombre: string
    Observaciones : string
   
  }


  const [mostrar, setMostrar] = React.useState<boolean>(false)
  const [data, setData] = React.useState<dataInterface|null>(null)
  const [docs, setDocs] = React.useState<any[]>([])
  const [docs2, setDocs2] = React.useState([])

  const options: optionsTypeI = {
    filterType: "dropdown",
    responsive: "simple",
    rowsPerPage: 4,
    rowsPerPageOptions: [10, 20, 50, 100],
    scrollX: true,
    selectableRows: "none",
  };

  const fnVerDoc = (data: any) => {
    const Documento: any = docs2.find((doc: any) => doc.tipoDocID === data.rowData[0]);

    let boton;

    if (Documento) {
        console.log(Documento);
        const params: any = {
            VehiculoID: Documento.vehiculoID,
            DocumentoID: Documento.documentoID
        };

        console.log(params);

        Funciones.GetDocument(props.Jwt, params)
        .then((res: any) => {
            console.log(res.src);
            window.open(res.src, '_blank');
        })
        .catch((err: any) => {
            console.log(err);
            onClose();
            Swal.fire({
                position: "center",
                icon: "error",
                title: `Ha ocurrido un error ${err}`,
                showConfirmButton: false,
                timer: 1000
            });
        });

        // Mostrar el botón "Ver" si hay un documento correspondiente
        boton = <Button variant="contained" color="primary" onClick={() => fnVerDoc(data)}>Ver</Button>;
    } else {
        // Mostrar "Pendiente" si no hay un documento correspondiente
        boton = <Typography>Pendiente</Typography>;
    }

    return boton;
};





  const Columns: ColumnTypeI2[] = [
    {
      name: "tipofotoID",
      label: "ID",
    },
    {
        name: "nombre",
        label: "Nombre Documento",
      },
      {
        name: "vehiculoID",
        label: "Subir Documento",
        options: {
            filter: true,
            customBodyRender: (_value: any, tableMeta: { rowData: any }) => {
                const tipoDocID = tableMeta.rowData[0];
                const documento: any = docs2.find((doc: any) => doc.tipoDocID === tipoDocID);
    
                if (documento && documento.documentoID > 0) {
                    return (
                        <Button variant="contained" color="secondary" onClick={()=>{
                            setMostrar(!mostrar)
                            console.log(_value, tableMeta);
                            setData({
                                UsuarioID: 2,
                                VehiculoID: props.VehiculoID,
                                TipoDocID: tableMeta.rowData[0],
                                TipoDocNombre : tableMeta.rowData[1] ,
                                Observaciones: ''
                            })
                            
                        }} >Modificar</Button>
                    );
                } else {
                    return (
                        <Button variant="contained" color="info" onClick={()=>{
                            setMostrar(!mostrar)
                            console.log(_value, tableMeta);
                            setData({
                                UsuarioID: 2,
                                VehiculoID: props.VehiculoID,
                                TipoDocID: tableMeta.rowData[0],
                                TipoDocNombre : tableMeta.rowData[1] ,
                                Observaciones: ''
                            })
                            
                        }} >Subir</Button>
                    );
                }
              
            },
          },
      },
      {
        name: "vehiculoID",
        label: "Ver Documento",
        options: {
            filter: true,
            customBodyRender: (_value: any, tableMeta: { rowData: any }) => {
                const tipoDocID = tableMeta.rowData[0];
                const documento: any = docs2.find((doc: any) => doc.tipoDocID === tipoDocID);
    
                if (documento && documento.documentoID > 0) {
                    return (
                        <Button variant="contained" color="primary" onClick={() => fnVerDoc(tableMeta)}>Ver</Button>
                    );
                } else {
                    return (
                        <>Pendiente</>
                    );
                }
            },
        },
    },
    
      {
        name: "Status",
        label: "Status",
        options: {
            filter: true,
            customBodyRender: (_value: any, tableMeta: { rowData: any }) => {
                const tipoDocID = tableMeta.rowData[0];
                const documento: any = docs2.find((doc: any) => doc.tipoDocID === tipoDocID);
    
                if (documento && documento.documentoID > 0) {
                    return (
                        <Check color="success" />
                    );
                } else {
                    return (
                        <Report color="error"></Report>
                    );
                }
            },
          },
      },
     /*  {
        name: "vehiculoID",
        label: "Eliminar",
        options: {
            filter: true,
            customBodyRender: (_value: any, tableMeta: { rowData: any }) => {
              return (
                <Button variant="contained" color="error" onClick={()=>setMostrar(!mostrar)} >Eliminar</Button>
              );
            },
          },
      }, */

 ]


  const GetMarcas = () => {
    
    Funciones.GetTipos(props.Jwt)
      .then((res: any) => {
            console.log("esta es mi data en get tipos: ", res.data)

            
            setDocs(res.data)
        
        
      })
      .catch((err: string) => {
        
        
        console.log(err);
        
        /* Swal.fire({
          position: "center",
          icon: "error",
          title: `Error al obtener marcas <br/> ${err}`,
          showConfirmButton: false,
          timer: 2000
      }); */
      
      });
      Funciones.GetDocumentosID(props.Jwt, props.VehiculoID)
      .then((res: any) => {

            console.log("estos son mis documentos: ",res)
            setDocs2(res.data)
        
        
      })
      .catch((err: string) => {
        
        
        console.log(err);
        
        /* Swal.fire({
          position: "center",
          icon: "error",
          title: `Error al obtener marcas <br/> ${err}`,
          showConfirmButton: false,
          timer: 2000
      }); */
      
      });
  };


 
  
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
        id: props.UsuarioID,
        marca: '',
        modelo: '',
        color: '',
        anio: 0,
        celular: 0,
        rolID: 0,
        Estado: false, 
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        
        console.log("Submit:", values); 
       
      
      },
    });

    useEffect(() => {
      
      GetMarcas();


  }, [props.VehiculoID])

  
   
    
 
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
            <Grid item xs={12}>
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
                    data={docs}
                    title={"Vehiculos"}
                    options={options}
                    />
                </div>
            </Grid>
           
          
            <br />
            </Grid>

            {mostrar && (
            <UploadForm
                Mostrar={mostrar}
                onClose={()=>setMostrar(!mostrar)}
                Jwt={props.Jwt}
                data={data}
                name="file"
                imageSrc={'data:image/png;base64,' + ''}
                GetMarcas={GetMarcas}

            />
         )}
         <br />
        </Grid>
       
      </Grid>
      </form>
    </DialogContent>
  </Dialog> 
  );
}

export default DocsForm
