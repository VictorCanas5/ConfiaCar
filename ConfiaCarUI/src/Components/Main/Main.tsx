import { AppBar, Button, ThemeProvider, Stack, Box, IconButton, MenuItem, Menu, Toolbar, Tooltip, ListItemText, ListItemIcon, Typography, createTheme, ThemeOptions } from "@mui/material";
import * as Theme from "./MainTheme";
import Logo from '../Login/confia.png'
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Auth/context";
import { NavigateFunction, useNavigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import { ContentPaste } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import { blue, green } from "@mui/material/colors";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StoreIcon from '@mui/icons-material/Store';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import './Main.css';
import * as Funciones from "./Funciones";
// import {  ConfiaCar_dbo } from './../../interfaces_db/DBConfiaCar/dbo';


type TypeSucursales = {
  // jwt: string
  setSucursalSeleccionada?: React.Dispatch<React.SetStateAction<{ id: string | null; nombre: string | null }>>;

}


const Main: React.FC<TypeSucursales> = ({ setSucursalSeleccionada }) => {

  const { logout, user, Jwt, role, status, isMaster} = useContext(AuthContext);

  const username = JSON.parse(sessionStorage.getItem("user")!);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const history : NavigateFunction = useNavigate();
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const handleClose = () : void => {
    setAnchorEl(null);
  };

  const handleContinue = () : void => {
 
    window.location.reload();
  };


  const OpenMenu = () : void => { setOpenMenu(true) };
  const closeMenu = () : void=> { setOpenMenu(false) };
  const fnLogout = () : void => { history('/login'); logout() };

  const theme : ThemeOptions | undefined = createTheme({
    palette: {
      primary: {
        main: '#353b48'
      },
    },
  });


  useEffect(() => {
    console.log("este es mi nombre de usuario: ", username.userID.nombreusuario)
  }, []);

  const styles = {
    position: "static",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    background: "linear-gradient(to right, #ff9900, #ff66cc)" // Ejemplo de degradado naranja a rosa
  };
  return (
    <>

      <Box >


        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <ThemeProvider theme={theme}>

            <AppBar position="static" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", background: 'linear-gradient(to left, #000000, #051b35)' }} /* color="primary" */>
              <div className="propiedadesContenedorLogoMain">
                <img style={{ marginLeft: '1rem', width: '3rem', height: '3rem' }} src={Logo} alt="" />
                <Typography className="ResponsividadTituloMain" style={{ fontWeight: '700', color: 'white' }} variant="h5" gutterBottom>
                  ConfiaCar
                </Typography>
                {Theme.AppBarLabel('DBConfiaCar')}

              </div>
              <Toolbar >
              
        
                <Menu
                  className="propiedadesModalSucursalesFlotante"
                  style={{width:'20rem'}}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  PaperProps={{
                    style: {
                      backgroundColor: 'rgba(255, 255, 255, 0.6)', 
                    },
                  }}
                >
                

                    <hr className="anchuraModalFlotanteHr" />

                  <MenuItem className="" style={{justifyContent:'flex-end'}}>
                    <Button style={{backgroundColor:'#0168C7', borderRadius:'20px'}} variant="contained" onClick={handleContinue}>Desvincular</Button>
                  </MenuItem>
                </Menu>


                <div className="propiedadesSucursal propiedadesResponsividadUsuario">
                  <AccountCircleIcon fontSize="small" style={{marginRight:'0.25rem', marginBottom:'0.35rem'}} />
                  <Typography  variant="subtitle2" gutterBottom>{username.userID.nombreusuario}</Typography >
                </div>

                <div style={{ margin: '1rem', display: 'flex' }}>

                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Configuraciones">
                      <IconButton
                        size="large"
                        aria-label="Notificaciones"
                        color="inherit"
                        aria-haspopup="true"
                        onClick={OpenMenu}
                      >
                        <SettingsIcon />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(openMenu)}
                      onClose={closeMenu}

                    >


                      <MenuItem onClick={fnLogout}>
                        <ListItemIcon>
                          <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                          Cerrar sesion
                        </ListItemText>
                      </MenuItem>

                    </Menu>
                  </Box>
                </div> 
                
              </Toolbar>
            </AppBar>
          </ThemeProvider>
        </Stack>

      </Box>
      
    </>

  );
}

export default Main;