import { useContext } from "react";
import { AuthContext } from "../../Auth/context";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: any) => {
    const { logged } = useContext(AuthContext)
    return (logged)
        ? children
        : <Navigate to="/login" />
}