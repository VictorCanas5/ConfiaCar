import { types } from "../types/types";



export const AuthReducer = (state = {}, action:any) => {


   switch(action.type){
        case types.login:
            return {
        ...state,
        logged: true,
        Jwt: action.payload2,
       /*  user: action.payload, */
       /*  role: action.payload3.role, */
        status: action.payload3.status,
        isMaster: action.payload3.isMaster,
        userID: action.payload3.userID
            };
        case types.logout:
            return {
                logged:false
            };
        case types.updateJwt:
                return {
                  ...state,
                  Jwt: action.payload,
                };
        default:
            return state;
   }
}