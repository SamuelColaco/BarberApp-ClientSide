import { AxiosError } from "axios"
import { useActionState, useEffect, useState } from "react"
import api from "../../services/api"
import { Input } from "../Input/Input"
import { z } from "zod"
import { ZodError } from "zod/v4"
import { useAuth } from "../../hooks/useAuth"

interface Service{
    id: string
    barberId: string
    name: string
    price: number
}

export function AddNewAppointments(){

    const [service, setService] = useState<Service[]>([])

    const [ state, formAction, isLoading] = useActionState(onAppointments, null)

    const appointmentSchema = z.object({
            dateTime: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid Date"}),
            hour: z.string().regex(/^\d{2}:\d{2}$/, "Hour invalid")
    })

    const auth = useAuth()

    async function onAppointments(_: any, formData: FormData){

        try {
            
            const serviceId = formData.get("service")

            const serviceView = service.find((service) => service.id === serviceId)

            const barberId = serviceView?.barberId
            
            const data = appointmentSchema.parse({
                dateTime: formData.get("data"),
                hour: formData.get("hour")
            })

            await api.post(`/appointment/${barberId}/${auth.session?.user.id}/${serviceId}`, data)

            
        } catch (error) {
            console.log(error)
            
            if(error instanceof ZodError){
                return { message: error.issues[0].message }
            }

            if(error instanceof AxiosError){
                return { message: error.response?.data.message }
            }

            return { message: "Don't possible appointments " }


        }
    }

    useEffect(() => {
        async function axiosService(){
            try {

                const response = await api.get("/service")

                const serviceData = Array.isArray(response.data.message) ? response.data.message : []

                setService(serviceData)

            } catch (error) {
                console.log(error)

                if(error instanceof AxiosError){
                    return { message: error.response?.data.message }
                }

                return { message: "Don't possible check services" }
            }
        }

        axiosService()
    }, [])
    return(
        <div className="flex flex-col items-center justify-center p-4">
  <div className="flex flex-col gap-6 md:gap-10 bg-[#273142] rounded-lg p-5 md:p-7 w-full max-w-md lg:max-w-xl">
    <div className="flex flex-col gap-1 md:gap-2">
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-white">Information</h2>
      <p className="text-xs text-gray-300">Choose your appointments</p>
    </div>

    <form action={formAction} className="flex flex-col gap-3 md:gap-4 text-gray-400 focus-within:text-blue-500">
      <fieldset>
        <legend className="uppercase text-xs sm:text-sm mb-1 md:mb-2 text-inherit">
          Service
        </legend>
        <select
          name="service"
          id="service"
          required
          className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-sm sm:text-base"
        >
          <option value="" hidden>Choose your service</option>
          {service.length > 0 ? (
            service.map((service) => (
              <option 
                key={service.id} 
                value={service.id}
                className="p-1 sm:p-2 hover:bg-blue-100 text-sm sm:text-base"
              >
                {service.name}
              </option>
            ))
          ) : (
            <option disabled className="text-gray-400 text-sm sm:text-base">
              No services available
            </option>
          )}
        </select>
      </fieldset>

      <Input 
        type="date" 
        name="data" 
        legend="Date" 
        placeholder="Date" 
        required 
      />

      <fieldset>
        <legend className="uppercase text-xs sm:text-sm mb-1 md:mb-2 text-inherit">
          Hour
        </legend>
        <select
          name="hour"
          id="hour"
          required
          className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm text-sm sm:text-base"
        >
          <option value="" hidden>Choose your hour</option>
          <option value="15:00">15:00</option>
          <option value="18:00">18:00</option>
          <option value="05:00">05:00</option>
          <option value="08:00">08:00</option>
        </select>
      </fieldset>

      {state && <p className="text-xs sm:text-sm text-red-600 text-center my-2 sm:my-4 font-bold"> {state.message} </p>}

      <button 
        type="submit" 
        disabled={isLoading} 
        className="w-full bg-black text-white p-3 sm:p-4 rounded-lg hover:scale-105 transition ease-linear cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
      >
        Agendar
      </button>
    </form>
  </div>
</div>
    )
}