import { InformationStatics } from "../InformationStatics/InformationStatics";

import icon from "../../assets/imgs/Icon (2).png"

import iconIconBox from "../../assets/imgs/Icon (3).png"

import iconIconStatics from "../../assets/imgs/Icon (4).png"

import iconIconPending from "../../assets/imgs/Icon (5).png"

import sales from "../../assets/imgs/Sales Details.png"
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import api from "../../services/api";

interface Users{
    id: string
    name: string
    email: string
    role: "client" | "barber"
}

interface Appointments{
    id: string
    barberName: string
    serviceName: string
    date: Date
    hour: string
    status: "pending" | "completed" | "cancelled"
}

export function Dashboard(){

    const [users, setUsers] = useState<Users[]>([])
    const [appointments, setAppointments] = useState<Appointments[]>([])

    useEffect(() => {
        async function totalUsers(){
            try {
                
                const response = await api.get("/user")
    
                setUsers(response.data.message)
    
            } catch (error) {
                console.log(error)
    
                if(error instanceof AxiosError){
                    return { message: error.response?.data.message }
                }
    
                return { message: "Don't be possible view users" }
            }
        }

        totalUsers()
    }, [])

    useEffect(() => {
        async function totalAppointments(){
            try {

                const response = await api.get("/appointment")

                setAppointments(response.data.message)
                
            } catch (error) {
                console.log(error)

                if(error instanceof AxiosError){
                    return { message: error.response?.data.message }
                }

                return { message: "Don't possible view appointments" }
            }
        }

        totalAppointments()
    }, [])

    return (
        <div>
            <h1 className="text-white text-5xl p-3 font-bold">Dashboard</h1>
            <div className="flex flex-wrap gap-10 p-3">
                <InformationStatics total="Total Users" number={String(users.length)}  image={icon} />
                <InformationStatics total="Total appointment" number={String(appointments.length)} image={iconIconBox} />
                <InformationStatics total="Total Money" number="R$20.000" image={iconIconStatics} />
                <InformationStatics total="Total pendigs" number="230" image={iconIconPending} />
            </div>

            <div className="text-center p-5 ">
                <img src={sales} alt="detalhes de vendas" className=" hidden md:block" />
            </div>
        </div>
    )
}