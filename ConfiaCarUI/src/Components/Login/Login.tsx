import { Alert, Box, Button, CircularProgress, Container, FormControl, InputLabel, OutlinedInput, Paper, Snackbar } from "@mui/material"
import { useContext, useState } from "react"
import '../Login/estilos.css';
import Logo from '../Login/confia.png'
import * as Funciones from "./Funciones";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/context";
import FondImagen from '../../../src/global/styles/Fondo2.png'
import { Form, Formik } from "formik";
import * as Yup from 'yup'
import './responsividad.css';

import TextComponent from "../../global/Componentes/TextComponent.tsx/TextComponent";
import { Password } from '@mui/icons-material';

interface loginI {
    user:string;
    password:string
}



const Login = () => {
    
    const { login } = useContext(AuthContext);

    const history : NavigateFunction = useNavigate();
    const [usuario, setUsuario] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [mesageError, setMessageError] = useState<string>('')
    const [stateMessageError, stateSetMesageError] = useState(false)
    const [credenciales, setCredenciales] = useState<loginI>({
        user: '',
        password: '',
    });

    const fnSignIn = (Usuario: string, Password: string) => {
        setLoading(true);
        stateSetMesageError(false)

        Funciones.GetLogin({ Usuario, Password })
        .then((res: any) => {
            /*******Se establecen valores en el context*********** */
            console.log("esta es la data: ", res.data)
            /***************************** */

            login(/* ${res.data.consulta.nombreusuario}
            , */res.data.tokenGenerado
            ,res.data.rol
            ,res.data.estatus
            ,res.data.master
            ,res.data.consulta
            ,res.data.cambioContra
            );
    /***************************** */
            setLoading(false);
            if (res.data.cambioContra === null) {
                history('/main');
                console.log(res);
                
            }
            else{ 
                history('/main');
            }

        })
            .catch((err: string) => {
                setLoading(false);
                setMessageError('Error al iniciar sesion, verifique las credenciales')
                stateSetMesageError(true);
            })

            // Funciones.GetUsers()
            // .then((res: any) => {
            //     console.log("se trajo los usuarios")
            //     setLoading(false)
            // })
            // .catch((err: string) => {
            //     console.log("no se trajo los usuarios")
            //     setLoading(false)
            // })
    }

    const fnEntrar = (e: any) : void => {
        e.preventDefault();
        fnSignIn(usuario, password)
    }
    return (
    <>
    <Formik
    initialValues={credenciales}
    enableReinitialize
    validationSchema={Yup.object().shape({
        // Definir validaciones si es necesario
        user: Yup.string().required('El nombre de usuario es obligatorio'),
        password: Yup.string().required('La contraseña es obligatoria'),
    })}
    onSubmit={(values, { resetForm }) => {
        fnSignIn(values.user,values.password)
        // Resto del código...
    }}
    >

      {({ values, handleSubmit }) => (
        <div className="bg_animate animate_animated animate_fadeIn">

            <Form    className="cont1" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '3rem' }}>

                <div className="Envolt1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', fontFamily: 'sans-serif', zIndex: '1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <img style={{ width: '6rem', height: '6rem' }} src={Logo} alt="" />
                        <h1 style={{ fontSize: '1.2rem', color:'#000', margin:'0rem' }}>DBConfiaCar</h1>
                    </div>
                        
                        <Paper  style={{padding:'2rem',borderRadius: '2rem', backgroundColor: '#fffff', width:'100%'}}>
                            <div style={{width:'100%'}}>                    
                                <TextComponent id={"Usuario"} name={"user"} DefaultValue={undefined} type={"email"}/>
                                <TextComponent id={"Contraseña"} name={"password"} DefaultValue={undefined} type={"password"}/>
                             </div> 
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                                <Button disabled={loading} type="submit" variant="contained" size="large">
                                    {!loading ?'Sign In':<CircularProgress size={24} disableShrink />}
                                </Button>
                            </div>

                        </Paper>
                            <Snackbar open={stateMessageError} autoHideDuration={6000} onClose={() => {stateSetMesageError(false)}}>
                                <Alert severity="error" sx={{ width: '100%' }}>
                                    {mesageError}
                                </Alert>
                            </Snackbar>
                </div>
                    {/* Imagen en la parte inferior de la pantalla */}
                <img style={{ width: '100%', maxWidth: '100vw', position: 'fixed', bottom: 0 }} src={FondImagen} alt="Fondo" />

                {/* </div> */}
            </Form>


        </div>
              )}
   </Formik>
    </>

    )
}

export default Login;