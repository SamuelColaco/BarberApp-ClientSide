
type Props = {
    name: string,
    email: string
}

export function ClientDetails({ name, email }: Props){
    return (
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-gray-400 p-3 rounded-lg text-sm sm:text-base">
            <p className="truncate">{name}</p>
            <p className="truncate">{email}</p>
        </div>
    )
}