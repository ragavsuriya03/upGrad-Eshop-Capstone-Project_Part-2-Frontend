import { Redirect, Route } from "react-router";
import authService from "../../service/auth.service";

const ProtectedRoute = ({component: Component, path, adminOnly}) => {
   
     return (<Route path={path} render={(props) => {
            if((!adminOnly && authService.isLoggedIn()) || (adminOnly && (authService.isAdmin()))) {
                return <Component {...props}/>
         } 
         
         else {
             return <Redirect to='/login'/>
         }
        }}/>)
}

export default ProtectedRoute;