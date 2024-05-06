import { MenuList } from "@mui/material";
import Listaelementos from "./Sections/ListSection";


const MainSdeBar = () => {

  return (
    <MenuList className="MenuList animate__animated animate__fadeIn" style={{ background: 'linear-gradient(to right bottom, #051b32, #003b67)', color: 'white', width: 250, maxWidth: '100%', maxHeight: '100vh', minHeight: '100vh' }}>
      <Listaelementos />
    </MenuList>
  );
}

export default MainSdeBar;  