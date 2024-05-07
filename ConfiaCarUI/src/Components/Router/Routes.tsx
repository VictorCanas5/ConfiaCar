
import React  from "react";
import { Routes ,Route } from 'react-router-dom'

import Login from "../Login/Login";

import RoutesApp from "../Main/RouteMain";
import { PrivateRoute } from "./PrivateRoute";


const Routes2 = () => {

    

    
    return(
        <>
            <Routes>
                <Route path="login" element={<Login/>} />
                <Route path="/*" element={
                    <PrivateRoute>
                        <RoutesApp/>
                    </PrivateRoute>
                }/>

            </Routes>
        </>
    );


}

export default Routes2;