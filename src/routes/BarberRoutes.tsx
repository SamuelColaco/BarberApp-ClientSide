import { Route, Routes } from "react-router";
import { DashboardBarber } from "../pages/BarberPages/DashboardBarber";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { OrderBarber } from "../components/OrderBarber/OrderBarber";
import { BarbersCheck } from "../components/BarbersCheck/BarbersCheck";
import { ServiceBarbers } from "../components/ServiceBarbers/ServiceBarbers";
import { ClientView } from "../components/ClientView/ClientView";


export function BarberRoutes(){
    return(
        <Routes>
            <Route path="/" element={<DashboardBarber />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/service" element={<ServiceBarbers />} />
                <Route path="/order" element={<OrderBarber />} />
                <Route path="/barber" element={<BarbersCheck />} />
                <Route path="/client" element={<ClientView />} />
            </Route>
        </Routes>
    )
}