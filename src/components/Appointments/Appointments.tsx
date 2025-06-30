
type Props = {
    service: string,
    barber: string,
    date: string,
    hour: string,
    status: string
}

export function Appointments({service, barber, date, hour, status}: Props){
    return (
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-4 text-gray-400 p-3 rounded-lg text-sm sm:text-base">
            <p> {service} </p>
            <p> {barber} </p>
            <p> {date} </p>
            <p> {hour} </p>
            <p className="p-2 w-27 text-center rounded-4xl capitalize text-white bg-amber-400 "> {status} </p>
        </div>
    )
}