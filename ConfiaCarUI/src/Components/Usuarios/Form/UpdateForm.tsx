import { Box, Button, Grow } from "@mui/material";
import { Modal, UploadProps } from "antd";
import { useEffect, useState, useRef } from "react";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from 'yup'
import * as Funciones from "../Funciones";
import StepperComponent from "../../../global/Componentes/ScriptsStepper/Steper";
import TextComponent from "../../../global/Componentes/TextComponent.tsx/TextComponent";
import CheckComponent from "../../../global/Componentes/CheckComponent.tsx/CheckComponent";
import CheckComponent2 from "../../../global/Componentes/CheckComponent.tsx/CheckComponent2";
import { AutocompleteField } from "../../../global/Componentes/AutoCompleteField/AutoComplete";
import Swal from 'sweetalert2';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type FormType = {
  Jwt:string,
  Usuarios:any,
  UsuarioID:any,
  idSocia?: number,
  Mostrar: boolean,
  fnCerrar(item: any): any,
  GetLocal: any,
  Form:any,
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  data: any[];
}

const UpdateForm = (props: FormType) => {

  const [mostrar, setMostrar] = useState(false)
  const [step, setStep] = useState(0);


  const formikRef = useRef<FormikProps<any> | null>(null);

  const fnStep = () => {
    if (step < 1) {
      setStep(step + 1);
    }
  }
  

  const fnBackStep = () => {setStep(step-1)}


  useEffect(() => {
    console.log(props.data);
    
  }, [])
  const steps = ['Datos personales', 'Datos adicionales']
  const options =  [
    { 
      value: 1, label: `COMPRADOR` 
    },
    {
      value: 2, label: `VENDEDOR` 
    }
]

  return (
    <Formik
      initialValues={props.Form}
      innerRef={(ref) => (formikRef.current = ref)}
      enableReinitialize
      validationSchema={Yup.object().shape({
        Correo: Yup.string().required("Campo obligatorio"),
        celular: Yup.number().typeError('Debe ser un número').required('Campo obligatorio').positive('Debe ser un número positivo').integer('Debe ser un número entero'),
      })}
      onSubmit={(values, { resetForm }) => {
        
      if(props.UsuarioID == 0){
        
          console.log("estos son los valores:", values)
          Funciones.InsertUsuario(props.Jwt,values)
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
              const nuevoNombre = `${values.nombre} ${values.apellidoPaterno} ${values.apellidoMaterno}`;

              return {
                  ...item, 
                  masterUser: values.Master,
                  correoElectronico: values.Correo,
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
            // props.Usuarios();
            setMostrar(true)
            Swal.fire({
              position: "center",       
              icon: "success",
              title: "el usuario a sido actualizado con exito",
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

      }}
    >
      
      {({ values, handleSubmit }) => (
        <Modal
          
          className="ModalSocia"
          // width={"fit-content"}
          open={props.Mostrar}
          onCancel={props.fnCerrar}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          footer={[

          ]}
        >
          <div>
            <strong style={{ fontSize: '2rem', margin: '1rem', color: '#c2346a' }}>
              {props.UsuarioID == 0 ? "Alta de usuario" : "Modificar usuario"}
            </strong>
          </div>
          <hr />

          <Box >
            <Form className="Form" style={{ maxWidth: '100%' }}>

              <div style={{}}>
                <StepperComponent NameStep1={steps} Step={step}  />
              </div>


              {step == 0 &&
               <Grow in={step == 0}>
                <div style={{ backgroundColor: '#f9f9f9', padding: '.7rem', borderRadius: '2rem' }}>
                  <div style={{ display: "flex", flexDirection:'column',justifyContent: 'space-between' }}>
                    <TextComponent id={"Nombre"} name={"nombre"} DefaultValue={props.Form.nombre} type={"text"}/>
                    <TextComponent id={"Apellido paterno"} name={"apellidoPaterno"} DefaultValue={undefined} type={"text"}/>
                    <TextComponent id={"Apellido materno"} name={"apellidoMaterno"} DefaultValue={undefined} type={"text"}/>
                  </div>
                </div>
                </Grow>
              }

              {step == 1 &&
                <Grow in={step == 1}>
                  <div style={{ backgroundColor: '#f9f9f9', padding: '.7rem', borderRadius: '2rem' }}>
                    <div style={{ display: "flex", flexDirection:'column',justifyContent: 'space-between' }}>
                      <TextComponent id={"Correo"} name={"Correo"} DefaultValue={undefined} type={"text"}/>
                      <TextComponent id={"Numero celular"} name={"celular"} DefaultValue={undefined} type={"text"}/>
                      <AutocompleteField
                      id={"rolID"}
                      name={"rolID"}
                      label="Rol Usuario" 
                      defaultValue={{ value: 0, nombreCompleto: "", label: "Selecciona un rol" }}
                      Data={options}
                      />
                      <div style={{display:'flex', justifyContent:'center', margin:'1rem'}}>
                          <CheckComponent2 name="Master" label="Master" values={props.Form.Master} />
                      </div>
                    </div>
                  </div>
               </Grow>
              }
               <hr />
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                        <Button disabled={step <= 0} onClick={fnBackStep}>atras</Button>
                      </div>
                      
                      <Button type="button" onClick={() => (step < 1 ? fnStep() : handleSubmit())}>
                        {step < 1 ? "Siguiente" : "Submit"}
                      </Button>

                    </div>

            </Form>
          </Box>
        </Modal>
      )}
    </Formik>

  );
}

export default UpdateForm;