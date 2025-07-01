import { useActionState, useEffect, useState } from "react"
import api from "../../services/api"
import { AxiosError } from "axios"
import { BarberDetails } from "../BarbersDetails/BarbesDetails"
import { ServiceButton } from "../ServiceButton/ServiceButton"
import { AddNewBarber } from "../AddNewBarber/AddNewBarber"
import { z } from "zod"
import { ZodError } from "zod/v4"
import { Input } from "../Input/Input"


interface Barbers{
    id: string
    name: string
    email: string
    passwordHash: string
    role: 'barber'
}

export function BarbersCheck(){

    const [barbers, setBarbers] = useState<Barbers[]>([])

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [isLoaded, setIsLoaded] = useState(true)

    const [state, formAction, isLoading] = useActionState(onBarber, null)

    const barberSchema = z.object({
    name: z.string().min(1, { message: "Need to be a name"}),
    email: z.string().email({message: "Need to be a valid email"}),
    role: z.string(),
    password: z.string().min(6, {message:"Need min 6 caracteres to be accepted"}),
    confirmPassword: z.string().min(6, {message: "Need min 6 caracteres to be accepted"})
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords need to be equal",
    path: ["confirmPassword"],
})

     async function onBarber(_: any, formData: FormData){
        
        try {

            const dataBarber = barberSchema.parse({
                name: formData.get("name"),
                email: formData.get("email"),
                role: "barber",
                password: formData.get("password"),
                confirmPassword: formData.get("confirmPassword")
            })
            
            await api.post("/user", dataBarber)

            
        } catch (error) {
            console.log(error)

            if(error instanceof ZodError){
                return { message: error.issues[0].message}
            }

            if(error instanceof AxiosError){
                return { message: error.response?.data.message }
            }

            return { message: "Don't be possible create other service" }
        }
    }


    useEffect(() => {
        async function axiosBarber(){
            try {
                const response = await api.get("/user")

                const barber = Array.isArray(response.data.message) ? response.data.message : []

                const filterBarbers = barber.filter((barber: Barbers) => barber.role === "barber")
                setBarbers(filterBarbers)

            } catch (error) {
                console.log(error)

                if(error instanceof AxiosError ){
                    return { message: error.response?.data.message } 
                }

                return { message: "Don't possible get all barbers" }
            }
            finally{
                setIsLoaded(false)
            }
        }

        axiosBarber()

    }, [])

      if(isLoaded){
        return (
            <div className="bg-[#273142] rounded-lg p-4 text-center text-white">
                Loading Barbers
            </div>
        )
    }

     return (
            <div>
                
                <div className="flex items-center justify-between">
                <h1 className="text-5xl text-white p-4 font-bold">Barbers</h1>
                <ServiceButton onClick={() => setIsModalOpen(true)}>Add</ServiceButton>
                </div>
                <AddNewBarber isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <form action={formAction} className="flex flex-col gap-3">
                        <h3 className="text-3xl p-3 text-black">Create Barber</h3>
            
                        <Input type="text" name="name" legend="Name" required placeholder="Name" />
            
                        <Input type="email" name="email" legend="Email" required placeholder="Type your email" />

                        <Input type="password" name="password" legend="Password" required placeholder="Password" />

                        <Input type="password" name="confirmPassword" legend="Confirm Password" required placeholder="Password" />
            
                        {state && <p className="text-sm text-red-600 text-center my-4 font-bold"> {state.message} </p>}
            
                        <button type="submit" disabled={isLoading} className="w-full bg-black text-white p-4 rounded-lg hover:scale-105 transition ease-linear cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Criar</button>
            
                        </form>   
                </AddNewBarber>
                <div className="bg-[#273142] rounded-lg p-5">
                    <div className="text-white text-3xl p-3">
                        <h2>Barbers Details</h2>
                    </div>
                    <div className="grid grid-cols-4 bg-[#323D4E] text-white rounded-lg p-3">
                        <p>Name</p>
                        <p>Email</p>
                        <p>Role</p>
                    </div>
                    {barbers.length > 0 ? (
                        barbers.map((barber) => (
                            <BarberDetails key={barber.id} name={barber.name} email={barber.email} role={barber.role} id={barber.id} />
                        ))
                            ) : (
                                <div className="text-gray-400 p-4 text-3xl text-center">No barbers found</div>
                        )}
                </div>

            </div>
        )
}