import { AppointmentDetails } from "../AppointmentDetails/AppointmentDetails";

export function OrderBarber(){
    return(
        <div>
            <h1 className="text-5xl text-white p-5 font-bold">Orders</h1>
            <main className="p-4">
                <AppointmentDetails />
            </main>
        </div>
    )
}