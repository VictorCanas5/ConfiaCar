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
import Swal from 'sweetalert2';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

type FormType = {
  Jwt:string,
  Talleres:any,
  TallerID:number,
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
  }, [])
  const steps = ['Datos Taller', 'Datos adicionales']


  return (
    <Formik
      initialValues={props.Form}
      innerRef={(ref) => (formikRef.current = ref)}
      enableReinitialize
      validationSchema={Yup.object().shape({

      })}
      onSubmit={(values, { resetForm }) => {
        
      if(props.TallerID == 0){
        
          console.log("estos son los valores:", values)
          Funciones.InsertTaller(props.Jwt,values)
          .then((res:any) => {
              props.Talleres();
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
                title: "Algo salio mal",
                showConfirmButton: false,
                timer: 1000
            });
          })
          console.log("se esta creando un usuario")
      }
      else{


        const newDataUsuarios = props.data.map((item: any) => {
          if (item.tallerID === props.TallerID) {
              const nuevoNombre = `${values.nombre} ${values.apellidoPaterno} ${values.apellidoMaterno}`;

              return {
                  ...item,
                  masterUser: values.Master,
                  correoElectronico: values.Correo,
                  telefono: values.celular,
                  nombreCompleto: nuevoNombre, 
              };
          }
          return item;
        });

      // props.setData(newDataUsuarios);


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
              {props.TallerID == 0 ? "Alta Taller" : "Modificar Taller"}
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
                    <TextComponent id={"Direccion"} name={"direccion"} DefaultValue={undefined} type={"text"}/>
                    <TextComponent id={"Telefono"} name={"telefono"} DefaultValue={undefined} type={"text"}/>
                  </div>
                </div>
                </Grow>
              }

              {step == 1 &&
                <Grow in={step == 1}>
                  <div style={{ backgroundColor: '#f9f9f9', padding: '.7rem', borderRadius: '2rem' }}>
                    <div style={{ display: "flex", flexDirection:'column',justifyContent: 'space-between' }}>
                      <TextComponent id={"Contacto"} name={"contacto"} DefaultValue={undefined} type={"text"}/>

                      <label htmlFor="horarioApertura" style={{ marginTop: '1rem' }}>Hora de apertura:</label>
                      <TimePicker 
                        id="horarioApertura" 
                        name="horarioApertura" 
                        defaultValue={dayjs()} 
                        format="HH:mm" 
                        placeholder="Selecciona hora de apertura" 
                      />

                      <label htmlFor="horarioCierre" style={{ marginTop: '1rem' }}>Hora de cierre:</label>
                      <TimePicker 
                        id="horarioCierre" 
                        name="horarioCierre" 
                        defaultValue={dayjs()} 
                        format="HH:mm" 
                        placeholder="Selecciona hora de cierre" 
                      />
                      
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