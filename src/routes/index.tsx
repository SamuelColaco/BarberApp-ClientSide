import { BrowserRouter } from "react-router";
import { NoAuthRoutes } from "./NoAuthRoutes";
import { useAuth } from "../hooks/useAuth";
import { BarberRoutes } from "./BarberRoutes";
import { ClientRoutes } from "./ClientRoutes";


export function AppRoutes(){
    
    const { session } = useAuth()

    function Route(){
        switch(session?.user.role){
            case "client":
                return <ClientRoutes />
            case "barber":
                return <BarberRoutes />
            default:
                return <NoAuthRoutes />        
        }
    }
    
    return (
        <BrowserRouter>
           <Route />
        </BrowserRouter>
    )
}