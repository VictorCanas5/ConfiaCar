import { ContentPaste, StarBorder, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, MenuItem, Typography } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { Link, NavigateFunction } from "react-router-dom";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StyleIcon from '@mui/icons-material/Style';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import PeopleIcon from '@mui/icons-material/People';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { AuthContext } from "../../../Auth/context";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { Shield } from "@mui/icons-material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';



type TypeSucursales = {
    // jwt: string
    setSucursalSeleccionada?: React.Dispatch<React.SetStateAction<{ id: string | null; nombre: string | null }>>;
  
}



const Listaelementos: React.FC<TypeSucursales> = ({ setSucursalSeleccionada }) => {

    /********************Context********************************** */
    const {  role, status, isMaster} = useContext(AuthContext);
    const { logout, user, Jwt, nombreSucursal } = useContext(AuthContext);
    /************************************************************* */

    const history : NavigateFunction = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [open2, setOpen2] = useState<boolean>(false);
    const [sucursalSeleccionadaLocal, setSucursalSeleccionadaLocal] = useState<{id: string | null;nombre: string | null;}>({ id: null, nombre: null });



    const handleClick = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        setOpen(!open);
    };
    const handleClick2 = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        setOpen2(!open2)
    }
    const dividerStyle = {
        background: 'white', // Set the background color to white
        height: '0.5px',
        width: '93%'
    };

    useEffect(() => {
        /* const storedSucursal = sessionStorage.getItem('sucursalSeleccionada');
        if (storedSucursal) {
          setSucursalSeleccionadaLocal(JSON.parse(storedSucursal));
        } */
      }, []);


    return (
    <>


    <List>

        <div className="propiedadesUsuarioSidebar propiedadesResponsividadUsuario">
            <AccountCircleIcon fontSize="small" style={{marginRight:'0.25rem', marginBottom:'0.35rem'}} />
            <Typography  variant="subtitle2" gutterBottom>Nombre Usuario</Typography >
        </div>


        <ListItemButton onClick={handleClick}>
            <div style={{ display: 'flex', alignItems: 'center', color:'#fff' }}>

                <FolderCopyIcon>
                    <ContentPaste fontSize="small" />
                </FolderCopyIcon>
                <ListItemText >
                    <div style={{display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
                            Catalogos
                        <IconButton onClick={handleClick}>
                            {open ? <ExpandLess style={{ color: 'white' }} /> : <ExpandMore style={{ color: 'white' }} />}
                        </IconButton>
                    </div>
                </ListItemText>
            </div>
        </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>

                <List disablePadding>
                    <Link to="vendedores" style={{ textDecoration: 'none', display: 'block', color: 'white' }}>
                        <ListItem button><ManageAccountsIcon><StarBorder /></ManageAccountsIcon>
                            <ListItemText primary="Vendedores" />
                        </ListItem>
                    </Link>

                </List>

                <Link to="clientes" style={{ textDecoration: 'none', display: 'block', color: 'white' }}>
                        <ListItem button><PeopleIcon><StarBorder /></PeopleIcon>
                            <ListItemText primary="Clientes" />
                        </ListItem>
                </Link>

                <Link to="vehiculos" style={{ textDecoration: 'none', display: 'block', color: 'white' }}>
                        <ListItem button><DirectionsCarIcon><StarBorder /></DirectionsCarIcon>
                            <ListItemText primary="Vehiculos" />
                        </ListItem>
                </Link>

                <Link to="seguros" style={{ textDecoration: 'none', display: 'block', color: 'white' }}>
                        <ListItem button><Shield />
                            <ListItemText primary="Seguros" />
                        </ListItem>
                </Link>

            </Collapse>

        <Divider />
        
        <ListItem disablePadding style={{ marginBottom: '15px', display: 'block' }} >

            <Link to="pagos" style={{ textDecoration: 'none', display: 'block', color: 'white' }}>
                <MenuItem>
                    <AttachMoneyIcon>
                        <ContentPaste fontSize="small" />
                    </AttachMoneyIcon>
                    <ListItemText>Pagos</ListItemText>
                </MenuItem>
            </Link>
        </ListItem>

        <Divider />

            <><ListItemButton onClick={handleClick2}>
                            <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>

                                <PersonSearchIcon>
                                    <ContentPaste fontSize="small" />
                                </PersonSearchIcon>                <ListItemText>
                                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        Usuarios
                                        <IconButton onClick={handleClick2}>
                                            {open2 ? <ExpandLess style={{ color: 'white' }} /> : <ExpandMore style={{ color: 'white' }} />}
                                        </IconButton>
                                    </div>
                                </ListItemText>
                            </div>
                        </ListItemButton>
                        <Collapse in={open2} timeout="auto" unmountOnExit>

                            <List disablePadding>
                                <Link to="usuarios" style={{ textDecoration: 'none', display: 'block', color: 'white' }}>
                                    <ListItem button><StyleIcon><StarBorder /></StyleIcon>
                                        <ListItemText primary="Usuarios" />
                                    </ListItem>
                                </Link>

                            </List>

                        </Collapse></>
        <Divider />
        </List>

    </>)

}

export default Listaelementos;