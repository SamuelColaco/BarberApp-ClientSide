import { useState } from "react"
import { Barbers } from "../Barbers/Barbers"
import { Header } from "../Header/Header"
import { SignIn } from "../SignIn/SignIn"

interface Barbers{
    id: string
    name: string
    role: "barber"
}

export function About(){

    const [showSignIn, setShowSignIn] = useState(false)

    return (
        <div className="text-white bg-black">
            
            {!showSignIn && <Header openSigIn={() => setShowSignIn(true)} />}

            {showSignIn && <SignIn />}

            {
            !showSignIn && 
            <div className=" flex flex-col items-center justify-center ">

                <h1 className="text-5xl pb-7 uppercase font-bold">About Us</h1>

                <div className="flex flex-col items-center justify-center bg-white">
                    <h2 className=" text-3xl uppercase font-bold text-black p-4 ">Our Barbers</h2>
                    <div className=" flex flex-wrap items-center justify-center gap-15 p-4">
                        <Barbers name="Rodrigo" />
                        <Barbers name="Jorge" />
                        <Barbers name="Dorinico" />
                        <Barbers name="Mauricio" />
                        <Barbers name="Mari" />

                    </div>
                </div>
            
            </div>}
        </div>
    )
}