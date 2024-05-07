import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Toolbar, IconButton, Typography, createTheme } from "@mui/material";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Listaelementos from "./Sections/ListSection";
import Logo from '../Login/confia.png'


type Anchor = 'main';
export function AppBarLabel(label: string) {

  

  const [state, setState] = React.useState({
    main: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (

    <Box
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <img className="imageSideBar" src={Logo} alt="ConfiaCar3" />
        <Typography style={{ fontWeight: '700', color: 'white' }} variant="h5" gutterBottom>
          DBConfiaCar
        </Typography>
      </div>
      <Divider />
      <div className="optionsMenu">
        <Listaelementos />
      </div>
    </Box>
  );

  const sucursalSeleccionadaRaw = sessionStorage.getItem('sucursalSeleccionada');
  const sucursalSeleccionada = sucursalSeleccionadaRaw ? JSON.parse(sucursalSeleccionadaRaw) : null;

  
  return (
    <>
      <Toolbar>
        {/* {sucursalSeleccionada && sucursalSeleccionada.id !== null && sucursalSeleccionada.nombre !== null && ( */}
          <IconButton
            onClick={toggleDrawer('main', true)}
            className="dispmenu"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        {/* )} */}
        <Drawer
          className="drawer"
          anchor={'left'}
          open={state['main']}
          onClose={toggleDrawer('main', false)}
        >
          {list('main')}
        </Drawer>
      </Toolbar>
    </>
  );
}

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

