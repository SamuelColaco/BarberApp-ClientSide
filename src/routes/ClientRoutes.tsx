import { Route, Routes } from "react-router";
import { ClientPages } from "../pages/ClientPages/ClientPages";
import { ClientAppointments } from "../components/ClientAppointments/ClientAppointments";
import { ClientByYourAppointments } from "../components/ClientByYourAppointments/ClientByYourAppointments";

export function ClientRoutes(){
    return (
        <Routes>
            <Route path="/" element={<ClientPages />}>
                <Route path="/" element={<ClientAppointments />} />
                <Route path="/user" element={<ClientByYourAppointments />} />
            </Route>
        </Routes>
    )
}