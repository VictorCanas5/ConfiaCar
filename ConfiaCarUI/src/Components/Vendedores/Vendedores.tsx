import { Paper, TableContainer, IconButton, Fab, CircularProgress, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import * as Funciones from "./Funciones";
import { EditFilled } from "@ant-design/icons";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import '../../global/styles/GlobalStyles.css'

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { ColumnTypeI, optionsI, optionsTypeI } from "../../global/Interfaces/Interfaces";


type TypeGestores = {
  jwt: string
};


const Vendedores = (props: TypeGestores) => {

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [mostrar, setMostrar] = useState<boolean>(false);

  const [openSpeedDial, setOpenSpeedDial] = useState<boolean>(false);

  const desplegarSpeedDial = (e: any) :void => {
    setOpenSpeedDial(!openSpeedDial);
  };
  const handleOpen = () : void => setOpen(true);
  const handleClose = () : void => setOpen(false);


  useEffect(() => {
    // Funciones();
  }, []);


 
  return (
    <Paper className="animate__animated animate__fadeInRight" style={{ width: '100%', height: '100%' }}>
      <TableContainer style={{ width: '100%', height: '90%' }}>

        {!loading &&
          <div style={{ backgroundColor: 'rgb(241 241 241)', paddingBottom: '1rem', paddingTop: '1rem', margin: '1.5rem', borderRadius: '1rem' }}>
            <div style={{ fontSize: '2rem', margin: '1rem', fontFamily: 'sans-serif' }}>
              <strong style={{ fontSize: '2rem', margin: '1rem', fontFamily: 'sans-serif' }}>Vendedores</strong>
            </div>

              <div style={{ margin: '2rem', display: 'flex', justifyContent: 'space-between', marginTop: '-4%' }}>
                <div style={{ display: 'flex' }}>
                </div>
                <div>
                

                    <SpeedDial
                        FabProps={{ style: { backgroundColor: '#353b48' } }}
                        title="Gestores"
                        onClick={desplegarSpeedDial}
                        // open={openSpeedDial}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        open={open}
                        direction="left"
                        ariaLabel="Gestores"
                        sx={{ bottom: '16', right: '16' }}
                        icon={<SpeedDialIcon  />}
                    >


                      <SpeedDialAction
                        aria-disabled
                        icon={<PersonAddIcon color="primary" />}
                        tooltipTitle='Agregar Gestor'
                        aria-expanded={false}
                        onClick={() => setMostrar(true)} 
                      />


                    </SpeedDial>
                </div>
            </div>


          </div>
        } 


        {loading &&
          <Stack >
            <Skeleton className="skeleton1"
              variant="rounded"
              animation="wave"
              height={210}
            />

            <Skeleton className="skeleton2"
              variant="rounded"
              animation="wave"
              height={550}
            />
          </Stack>

        }


      </TableContainer>
    </Paper>
  )



}

export default Vendedores;   