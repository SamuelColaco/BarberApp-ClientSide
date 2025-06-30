import { AddNewAppointments } from "../AddNewAppointments/AddNewAppointments";

export function ClientAppointments(){
    return (
        <div className="flex flex-col gap-3 p-5">
            <h1 className="text-2xl text-white p-4 sm:text-5xl">New Appointments</h1>
            <AddNewAppointments />
        </div>
    )
}