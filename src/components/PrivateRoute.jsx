import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

function PrivateRoute({children}){
    const cookies = new Cookies()
    const jwtToken = cookies.get("jwt")

    if(!jwtToken){
        return <Navigate to="/login" />;
    }

    return children
}


export default PrivateRoute