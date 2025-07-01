import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { format, toZonedTime } from "date-fns-tz"
import { ptBR } from "date-fns/locale"
import api from "../../services/api";

interface Appointment {
  id: string;
  serviceName: string;
  barberName: string;
  date: string;
  hour: string;
  status: 'pending' | 'confirmed' | 'canceled';
}

export function AppointmentDetails(){

    const [appointments, setAppointments] = useState<Appointment[]>([])

    const [isLoad, setIsLoad] = useState(true)

    useEffect(() => {
        async function axiosAppointment(){
            try {

                const response = await api.get("/appointment")

                const appointmentData = Array.isArray(response.data.message) ? response.data.message : []
                
                setAppointments(appointmentData)

            } catch (error) {
                console.log(error)

                if(error instanceof AxiosError){
                    return { message: error.response?.data.message }
                }

                return { message: "Dont be possible check appointments"}
            }  
            finally{
                setIsLoad(false)
            }
        }

        axiosAppointment()
    }, [])

    
    if(isLoad){
        return (
            <div className="bg-[#273142] rounded-lg p-4 text-center text-white">
                Loading appointments
            </div>
        )
    }

    function convertToBrazilTimeZone(date: string){

            const dataUtc = new Date(date)
            const timeZone = 'America/Sao_Paulo'

            const dateBrazil = toZonedTime(dataUtc, timeZone)
            
            return format(dateBrazil, 'dd/MM/yyyy', {
                timeZone,
                locale: ptBR
            })
    }

    return (
        <div className="bg-[#273142] rounded-lg p-2 sm:p-4">
        <div className="text-white text-xl sm:text-2xl md:text-3xl p-3">
            <h1>Deals Details</h1>
        </div>
    
    
    <div className="hidden sm:grid grid-cols-5 bg-[#323D4E] text-white rounded-lg p-3 gap-2">
        <p>Service Name</p>
        <p>Barber</p>
        <p>Date</p>
        <p>Hour</p>
        <p>Status</p>
    </div>

    {appointments.length > 0 ? (
        <div className="py-3 space-y-2 ">
            {appointments.map((appointment) => (
                <div 
                    key={appointment.id}
                    className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-gray-400 p-3 rounded-lg bg-[#323D4E]/80 hover:bg-[#323D4E] transition-colors"
                >
                    
                    <div className="sm:col-span-1">
                        <p className="sm:hidden text-xs text-gray-300 mb-1">Service</p>
                        <p className="truncate">{appointment.serviceName}</p>
                    </div>
                    
                   
                    <div className="sm:col-span-1">
                        <p className="sm:hidden text-xs text-gray-300 mb-1">Barber</p>
                        <p className="truncate">{appointment.barberName}</p>
                    </div>
                    
                    
                    <div className="sm:col-span-1">
                        <p className="sm:hidden text-xs text-gray-300 mb-1">Date</p>
                        <p className="truncate">{convertToBrazilTimeZone(appointment.date)}</p>
                    </div>
                    
                    
                    <div className="sm:col-span-1">
                        <p className="sm:hidden text-xs text-gray-300 mb-1">Hour</p>
                        <p className="truncate">{appointment.hour}</p>
                    </div>
                    
                    
                    <div className="sm:col-span-1">
                        <p className="sm:hidden text-xs text-gray-300 mb-1">Status</p>
                        <p className="p-2 w-full sm:w-27 text-center rounded-full capitalize text-white bg-amber-400 truncate">
                            {appointment.status}
                        </p>
                    </div>
                </div>
            ))}
        </div>
        ) : (
            <div className="text-gray-400 p-4 text-xl sm:text-2xl text-center">
                No Appointments found
            </div>
        )}
    </div>
    )
}