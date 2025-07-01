import { useActionState, useEffect, useState } from "react"


import { AxiosError } from "axios"
import api from "../../services/api"
import { ServiceDetails } from "../ServiceDetails/ServiceDetails"
import { ServiceButton } from "../ServiceButton/ServiceButton"
import { AddNewService } from "../AddNewService/AddNewService"
import { Input } from "../Input/Input"
import { z } from "zod"
import { ZodError } from "zod/v4"
import { useAuth } from "../../hooks/useAuth"


interface Service{
    id: string
    name: string
    price: number
}

export function ServiceBarbers(){

    const [services, setServices] = useState<Service[]>([])
    
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [isLoad, setIsLoad] = useState(false)

    const serviceSchema = z.object({
        name: z.string().trim().min(1, { message: "Need min 1 caracter"}),
        price: z.string().transform((val) => {
            const value = val.replace(/R\$\s*|\./g, "").replace(",", ".")

            return parseInt(value)
        }).pipe(z.number().positive({message: "Number need be positive"}))
    })

    const [state, formAction, isLoading ] = useActionState(onService, null)

    const auth = useAuth()

    async function onService(_: any, formData: FormData){
        
        try {

            setIsLoad(true)

            const data = serviceSchema.parse({
                name: formData.get("title"),
                price: formData.get("price")
            })


            await api.post(`/service/${auth.session?.user.id}`, data)

            
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
        finally{
            setIsLoad(false)
        }
    }


    useEffect(() => {
        async function axiosServices(){
            try {

                const response = await api.get("/service")

                const serviceData = Array.isArray(response.data.message) ? response.data.message : []

                setServices(serviceData)
                
            } catch (error) {
                console.log(error)

                if(error instanceof AxiosError){
                    return { message: error.response?.data.message}
                }

                return { message: "Don't possible list services" }
            }
        }

        axiosServices()
    }, [])

    if(isLoad){
        return (
            <div className="bg-[#273142] rounded-lg p-4 text-center text-white">
                Loading appointments
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-5xl text-white p-5 font-bold">Services</h1>
                <ServiceButton onClick={() => setIsModalOpen(true)}>Add</ServiceButton>
            </div>

            <AddNewService isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
            <form action={formAction} className="flex flex-col gap-3">
                <h3 className="text-3xl p-3 text-black">Create Service</h3>

                <Input type="text" name="title" legend="Title" required placeholder="Name" />

                <Input type="number" name="price" legend="Price" required placeholder="R$ 0,00" /> 

                {state && <p className="text-sm text-red-600 text-center my-4 font-bold"> {state.message} </p>}

                <button type="submit" disabled={isLoading} className="w-full bg-black text-white p-4 rounded-lg hover:scale-105 transition ease-linear cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" >Salvar</button>

            </form>   
            </AddNewService>
            
            <div className="bg-[#273142] rounded-lg p-5">
                <div className="text-white text-3xl p-3">
                    <h2>Services Details</h2>
                </div>
                <div className="grid grid-cols-3 bg-[#323D4E] text-white rounded-lg p-3 ">
                    <p>Name</p>
                    <p>Price</p>
                </div>
                 {services.length > 0 ? (
                    services.map((service) => (
                        <ServiceDetails key={service.id} name={service.name} price={service.price} id={service.id} />
                    ))
                        ) : (
                            <div className="text-gray-400 p-4 text-3xl text-center">No services found</div>
                    )}
            </div>  
        </div>
    )
}