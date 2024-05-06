import React, { useEffect } from "react";
import { Dialog, 
         DialogContent, 
         Grid, 
         Divider, 
         Button, 
         Typography, 
         styled,
         TextField
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { useFormik } from "formik";
import * as Yup from 'yup'
import * as Funciones from '../Funciones'
import Swal from "sweetalert2";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

function UploadForm(props: any) {
  

const styles = {
    root: {
      flexGrow: 1,
      zIndex: 2
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
      padding: 30,
      alignItems: 'center'
    },
    secondaryContainer: {
      padding: "50px 25px",
      backgroundColor: 'black'
    }
  }
  const {  onClose } = props;


  const defaultImgSrc = "/noimage.png"
  const imgValues = {
    imageName: '',
    imageSrc: defaultImgSrc,
    imageFile: null
}


 
  const [docs, setDocs] = React.useState<any[]>([])
  const [values, setValues] = React.useState(imgValues)
  const hiddenFileInput = React.useRef<HTMLInputElement>(null)

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const GetMarcas = () => {
    
    Funciones.GetTipos(props.Jwt)
      .then((res: any) => {

            console.log(res.data);
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
     
  };

  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files:any) => { 
    
    const formdata = new FormData()
    formdata.append('UsuarioID', props.data.UsuarioID)
    formdata.append('VehiculoID', props.data.VehiculoID)
    formdata.append('TipoDocID', props.data.TipoDocID)
    formdata.append('NombreDocumento', files[0].file.name)
    formdata.append('Observaciones', props.data.Observaciones)
    formdata.append('doc', files[0].file)
    Funciones.InsertDocument(props.Jwt, formdata )
    .then((res:any) => {
        props.GetMarcas()
        onClose()    
        Swal.fire({
            position: "center",
            icon: "success",
            title: `Documento para ${props.data.TipoDocNombre} subido correctamente`,
            showConfirmButton: false,
            timer: 2000
        });

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
    console.log(props, files);
    

}



  


  
    console.log(props);
    
 
  return (
    <Dialog
    style={styles.root}
    fullWidth
    maxWidth="sm"
    open={props.Mostrar}
    onClose={() => onClose("wireModal")}
  >
    <DialogContent style={styles.padding}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container direction="row" style={styles.mainHeader}>
            <Grid item xs={8}>
              <Typography style={styles.primaryColor} variant="h5">
                Subir documento {props.data.TipoDocNombre}
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
                        <Dropzone
                        /* getUploadParams={getUploadParams}
                        onChangeStatus={handleChangeStatus} */
                        onSubmit={handleSubmit}
                        submitButtonContent="Subir Documento"
                        inputContent="Arrastra y suelta un archivo o haz clic para seleccionar"
                        maxFiles={1}
                        accept="image/*,audio/*,video/*"
                        styles={{
                            dropzone: { minHeight: 200, maxHeight: 250 },
                            dropzoneActive: { borderColor: 'green' },
                            submitButton : {background: '#002a4c'},
                            inputLabel: {color:'#002a4c',  paddingLeft: '5%'}
                          }}
                        />
                   
                </div>
                
            </Grid>
                    
          
            <br />
            </Grid>
        </Grid>
       
      </Grid>
    </DialogContent>
  </Dialog> 
  );
}

export default UploadForm
