import { ClientAppointmentYourDetails } from "../ClientAppointmentsYourDetails/ClientAppointmentsYourDetails";

export function ClientByYourAppointments(){
    return (
        <div>
            <h1 className="text-xl text-white p-5 sm:text-5xl">Your Appointments</h1>
            <main className="p-4">
                <ClientAppointmentYourDetails />
            </main>
        </div>
    )
}