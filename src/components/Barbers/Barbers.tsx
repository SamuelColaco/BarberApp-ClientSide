import { useState } from "react";
import { AppointmentButton } from "../AppointmentButton/AppointmentButton";

import image from "../../assets/imgs/img.png"
import { useNavigate } from "react-router";

type Props = {
    name: string
}

export function Barbers( { name }: Props){

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    function service(){
        try {
            setIsLoading(true)

            navigate("/service")
            
        } catch (error) {
            console.log(error)
        } finally{
            setIsLoading(false)
        }
    }
    return (
        <div className="w-64 h-80 flex flex-col items-center justify-center gap-3 border border-amber-300 ">
            <img src={image} alt="logo de barbeiro" />
            <div className=" w-full py-3 bg-black flex flex-col items-center justify-center gap-1.5">
                <p> {name} </p>
                <AppointmentButton isLoading={isLoading} onClick={service} >Services</AppointmentButton>
            </div>
        </div>
    )
}