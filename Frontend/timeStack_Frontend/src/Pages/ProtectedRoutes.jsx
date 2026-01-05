import {Navigate,Outlet} from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoutes=()=>{
    const {isAuthenticated, loading} = useAuth();
    if(loading){
        return <div className="text-center mt-20">Loading...</div>;
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
export default ProtectedRoutes;