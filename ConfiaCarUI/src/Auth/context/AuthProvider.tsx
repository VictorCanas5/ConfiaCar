import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { AuthReducer } from "./AuthReducer";
import { types } from "../types/types";
const init = () => {
  const user = JSON.parse(sessionStorage.getItem("user")!);
  const Jwt = JSON.parse(sessionStorage.getItem("Jwt")!);
  

  return {
    logged: !!user,
    // user: user,
    userID: user ? user.userID : 0,
    Jwt: Jwt,
    role: user ? user.role : "",
    status: user ? user.status : "",
    isMaster: user ? user.isMaster : false,
   
  };
};

export const AuthProvider = ({ children }: any) => {
  const [authState, dispatch] = useReducer(AuthReducer, {}, init);

  const login = (/* name = "", */ jwt = "", role = "", status = "", isMaster = false,  userID = 0 ) => {
    const user = { /* name, */ role, status, isMaster, userID };
    // const Jwt = { jwt };

    const action = {
      type: types.login,
      payload: user,
      payload2: jwt,
      payload3: { role, status, isMaster,  userID  },
    }

    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("Jwt", JSON.stringify(jwt));

    dispatch(action);
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("Jwt");
    

    const action = { type: types.logout };

    dispatch(action);
  };

  
  const updateJwt = (newJwt: any) => {
    const action = {
      type: types.updateJwt,
      payload: newJwt,
    };
  }



  return (
    <AuthContext.Provider value={{ ...authState, login, logout, updateJwt }}>
      {children}
    </AuthContext.Provider>
  );
};
