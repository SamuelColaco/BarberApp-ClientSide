
import { Route, Routes } from "react-router"
import { HomePage } from "../pages/HomePage"
import { ServicePage } from "../pages/ServicePage"
import { About } from "../components/About/About"
import { SignUp } from "../components/SignUp/SignUp"

export function NoAuthRoutes(){
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/service" element={<ServicePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    )
}