import {BrowserRouter as Router} from'react-router-dom';

import Routes2 from './Components/Router/Routes';
import { AuthProvider } from './Auth/context';

const App = () => {
    return(
       
            <Router>
                 <AuthProvider>
                         <Routes2/>
                </AuthProvider>
            </Router>
        
    )
}

export default App;