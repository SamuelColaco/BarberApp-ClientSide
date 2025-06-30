import { useEffect, useState } from "react";
import api from "../../services/api";
import { AxiosError } from "axios";
import { format,  toZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale";
import { Appointments } from "../Appointments/Appointments";
import { useAuth } from "../../hooks/useAuth";

interface Appointment {
  id: string;
  serviceName: string;
  barberName: string;
  date: string;
  hour: string;
  status: 'pending' | 'confirmed' | 'canceled';
}


export function ClientAppointmentYourDetails(){
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const auth = useAuth()


    useEffect(() => {
        async function axiosAppointment(){
            try {

                const response = await api.get(`/appointment/${auth.session?.user.id}`)

                const appointmentsData = Array.isArray(response.data.message) ? response.data.message : []

                setAppointments(appointmentsData)

            } catch (error) {
                console.log(error)
                setError("Failed in load appointments")

                if(error instanceof AxiosError){
                    return { message: error.response?.data.message }
                }

                return { message: "Dont be possible check appointments"}
            } finally{
                setIsLoading(false)
            }
        }

        axiosAppointment()
    }, [])

    function convertToBrazilTimeZone(date: string){

            const dataUtc = new Date(date)
            const timeZone = 'America/Sao_Paulo'

            const dateBrazil = toZonedTime(dataUtc, timeZone)
            
            return format(dateBrazil, 'dd/MM/yyyy', {
                timeZone,
                locale: ptBR
            })
    }

    if(isLoading){
        return (
            <div className="bg-[#273142] rounded-lg p-4 text-center text-white">
                Loading appointments
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-[#273142] rounded-lg p-4 text-center text-red-400">
                {error}
            </div>
        )
    }

    return (
        <div className="bg-[#273142] rounded-lg p-2">
            <div className="text-white text-3xl p-3">
                <h1>Deals Details</h1>
            </div>
            <div className="grid grid-cols-5 bg-[#323D4E] text-white rounded-lg p-3 ">
                <p>Service Name</p>
                <p>Barber</p>
                <p>Date</p>
                <p>Hour</p>
                <p>Status</p>
            </div>
            {appointments.length > 0 ? (
                appointments.map((appointment) => (
                    <Appointments key={appointment.id} service={appointment.serviceName} barber={appointment.barberName} date={convertToBrazilTimeZone(appointment.date)} hour={appointment.hour} status={appointment.status} />
                ))
            ) : (
                <div className="text-gray-400 p-4 text-3xl text-center">You no have Appointments</div>
            )}
        </div>
    )
}